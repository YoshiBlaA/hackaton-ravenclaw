const API_HECHIZOS = window.API_HECHIZOS;
const API_POCIONES = window.API_POCIONES;
const API_PERSONAJES = window.API_PERSONAJES;

async function getSpells() {
    try {
        const response = await fetch(API_HECHIZOS);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.warn('No se pudieron cargar los hechizos:', error);
    }
}

async function getPotions() {
    try {
        const response = await fetch(API_POCIONES);
        const data = await response.json();
        console.log(data.data);
    } catch (error) {
        console.warn('No se pudieron cargar las pociones:', error);
    }
}

async function getCharacters() {
    try {
        const response = await fetch(API_PERSONAJES);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.warn('No se pudieron cargar los personajes:', error);
    }
}

getSpells();
getPotions();
getCharacters();

const { storeData = { categories: [], products: {} }, hogwartsStore } = window;
const ProductCardComponent = window.ProductCard;
const { categories, products } = storeData;

const categoryPicker = document.getElementById('categoryPicker');
const storeApp = document.getElementById('storeApp');

function renderCategory(category, items) {
    const categoryButton = document.createElement('button');
    categoryButton.type = 'button';
    categoryButton.className = 'btn rounded-pill px-3 py-2 category-picker__button';
    categoryButton.textContent = category.title;
    categoryButton.addEventListener('click', () => {
        document.getElementById(`category-${category.id}`).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        document.querySelectorAll('.category-picker__button').forEach((button) => {
            button.classList.toggle('is-active', button === categoryButton);
        });
    });

    categoryPicker.appendChild(categoryButton);

    const section = document.createElement('section');
    section.id = `category-${category.id}`;
    section.className = 'store-category mb-4';

    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'd-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-3';
    sectionHeader.innerHTML = `
    <div>
      <p class="store-category__eyebrow mb-2">${category.accent}</p>
      <h2 class="h3 mb-0 store-category__title">${category.title}</h2>
    </div>
    <div class="d-flex gap-2" aria-label="Controles del carrusel">
      <button type="button" class="btn btn-sm rounded-circle carousel-button prev" data-bs-target="#${category.id}-carousel" data-bs-slide="prev" aria-label="Anterior">&#8249;</button>
      <button type="button" class="btn btn-sm rounded-circle carousel-button next" data-bs-target="#${category.id}-carousel" data-bs-slide="next" aria-label="Siguiente">&#8250;</button>
    </div>
  `;

    const carousel = document.createElement('div');
    carousel.id = `${category.id}-carousel`;
    carousel.className = 'carousel slide';
    carousel.setAttribute('data-bs-ride', 'carousel');

    const inner = document.createElement('div');
    inner.className = 'carousel-inner';

    const chunkSize = 3;
    for (let index = 0; index < items.length; index += chunkSize) {
        const slide = document.createElement('div');
        slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;

        const row = document.createElement('div');
        row.className = 'row g-4 justify-content-center';

        items.slice(index, index + chunkSize).forEach((item) => {
            row.appendChild(
                ProductCardComponent({
                    title: item.title,
                    text: item.description,
                    image: item.image,
                    amount: item.amount,
                    cartItem: {
                        source: `store-${category.id}`,
                        name: item.title,
                        image: item.image,
                        price: item.amount
                    }
                })
            );
        });

        slide.appendChild(row);
        inner.appendChild(slide);
    }

    carousel.appendChild(inner);

    section.appendChild(sectionHeader);
    section.appendChild(carousel);
    storeApp.appendChild(section);
}

async function buildStore() {
    let potionCatalog = products.pociones;

    if (hogwartsStore && typeof hogwartsStore.fetchPotionCatalog === 'function') {
        try {
            const apiPotions = await hogwartsStore.fetchPotionCatalog();
            if (Array.isArray(apiPotions) && apiPotions.length) {
                potionCatalog = apiPotions.map((item) => hogwartsStore.normalizePotion(item));
            }
        } catch (error) {
            console.warn('No se pudo cargar el catálogo remoto de pociones:', error);
        }
    }

    const catalogMap = {
        ...products,
        pociones: potionCatalog
    };

    categories.forEach((category) => {
        renderCategory(category, catalogMap[category.id] || []);
    });

    if (categoryPicker.firstElementChild) {
        categoryPicker.firstElementChild.classList.add('is-active');
    }

    // Ir a la categoría indicada en la URL (ej. store.html#category-pociones)
    const target = location.hash.slice(1);
    if (target) {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });

            const categoryId = target.replace('category-', '');
            const titulo = categories.find(c => c.id === categoryId)?.title;
            document.querySelectorAll('.category-picker__button').forEach(btn => {
                btn.classList.toggle('is-active', btn.textContent === titulo);
            });
        }
    }
}

buildStore();

