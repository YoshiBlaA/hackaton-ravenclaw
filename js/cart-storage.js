(function attachCartStorage(global) {
  const STORAGE_KEY = 'ravenclaw-cart';

  function slugify(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function parsePrice(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    const cleaned = String(value || '')
      .replace(/galeones?/gi, '')
      .replace(/\$/g, '')
      .replace(/,/g, '')
      .replace(/[^0-9.]/g, '')
      .trim();

    const parsed = Number.parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function toCartItem(rawItem) {
    const source = rawItem.source || 'store';
    const name = rawItem.name || rawItem.title || 'Producto';
    const image = rawItem.image || 'https://via.placeholder.com/140';
    const price = parsePrice(rawItem.price ?? rawItem.amount);
    const quantity = Math.max(1, Number.parseInt(rawItem.quantity, 10) || 1);
    const normalizedId = rawItem.id || `${source}-${slugify(name)}`;

    return {
      id: normalizedId,
      source,
      name,
      price,
      image,
      quantity
    };
  }

  function getItems() {
    try {
      const stored = global.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map(toCartItem);
    } catch (error) {
      console.warn('No se pudo leer el carrito guardado:', error);
      return [];
    }
  }

  function saveItems(items) {
    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items;
  }

  function addItem(rawItem) {
    const item = toCartItem(rawItem);
    const items = getItems();
    const existingItem = items.find((entry) => entry.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }

    return saveItems(items);
  }

  function updateQuantity(id, nextQuantity) {
    const items = getItems();
    const item = items.find((entry) => entry.id === id);

    if (!item) {
      return items;
    }

    item.quantity = nextQuantity;

    return saveItems(items.filter((entry) => entry.quantity > 0));
  }

  function removeItem(id) {
    return saveItems(getItems().filter((item) => item.id !== id));
  }

  function clear() {
    global.localStorage.removeItem(STORAGE_KEY);
  }

  global.RavenclawCart = {
    STORAGE_KEY,
    addItem,
    clear,
    getItems,
    parsePrice,
    removeItem,
    toCartItem,
    updateQuantity
  };
}(window));