function ProductCard({ title, text, image, amount, buttonText = 'Comprar' }) {
    const wrapper = document.createElement('div');
    wrapper.className = 'col-12 col-md-4';

    const article = document.createElement('article');
    article.className = 'card h-100 border-0 shadow-sm product-card';

    article.innerHTML = `
    <div class="overflow-hidden rounded-top">
      <img src="${image}" alt="${title}" class="card-img-top product-card__image" loading="lazy">
    </div>
    <div class="card-body d-flex flex-column">
      <h3 class="card-title h5 mb-3 product-card__title">${title}</h3>
      <p class="card-text mb-3">${text}</p>
      <div class="mt-auto d-flex justify-content-between align-items-center gap-2">
        <span class="fw-bold product-card__amount">${amount}</span>
        <button type="button" class="btn btn-sm rounded-pill px-3 fw-semibold product-card__button">${buttonText}</button>
      </div>
    </div>
  `;

    const button = article.querySelector('.product-card__button');

    const createSparkBurst = (buttonEl) => {
        const burst = document.createElement('span');
        burst.className = 'spell-burst';

        for (let i = 0; i < 12; i += 1) {
            const spark = document.createElement('span');
            spark.className = 'spell-spark';
            spark.style.setProperty('--dx', `${(Math.random() * 130 - 65).toFixed(2)}px`);
            spark.style.setProperty('--dy', `${(Math.random() * 110 - 55).toFixed(2)}px`);
            spark.style.setProperty('--rotation', `${(Math.random() * 180 - 90).toFixed(2)}deg`);
            spark.style.setProperty('--spark-color', i % 2 === 0 ? '#946A2D' : '#5D5D5D');
            burst.appendChild(spark);
        }

        buttonEl.appendChild(burst);
        window.setTimeout(() => burst.remove(), 700);
    };

    const showAddToast = () => {
        const toast = document.createElement('div');
        toast.className = 'magic-toast';
        toast.textContent = `${title} añadido a tu cesta`;

        document.body.appendChild(toast);
        window.setTimeout(() => {
            toast.classList.add('is-visible');
        }, 10);
        window.setTimeout(() => {
            toast.classList.remove('is-visible');
            window.setTimeout(() => toast.remove(), 300);
        }, 1400);
    };

    button.addEventListener('click', () => {
        button.classList.remove('sparkling');
        void button.offsetWidth;
        button.classList.add('sparkling');
        createSparkBurst(button);
        showAddToast();
    });

    wrapper.appendChild(article);
    return wrapper;
}
