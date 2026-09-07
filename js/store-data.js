// Catalogo de categorías y productos de la tienda
window.storeData = {
    categories: [
        {
            id: 'hechizos',
            title: 'Hechizos',
            subtitle: 'Encantamientos para combate y utilidad',
            accent: 'Artes mágicas'
        },
        {
            id: 'pociones',
            title: 'Pociones',
            subtitle: 'Preparaciones para la práctica diaria',
            accent: 'Elixires'
        },
        {
            id: 'varitas',
            title: 'Varitas',
            subtitle: 'Modelos y núcleos para magos y brujas',
            accent: 'Artesanos de Ollivander'
        }
    ],
    products: {
        hechizos: [
            {
                title: 'Evanesco',
                description: 'Desaparece objetos.',
                image: 'assets/Evanez.jpg',
                amount: '2,500 galeones'
            },
            {
                title: 'Accio',
                description: 'Atrae cualquier objeto hacia tu mano.',
                image: 'assets/Accio.jpg',
                amount: '4,000 galeones'
            },
            {
                title: 'Avada Kedavra',
                description: 'El maleficio prohibido, conocido por su enorme peligrosidad.',
                image: 'assets/Avada1.jpg',
                amount: '500,000,000 galeones'
            }
        ],
        pociones: [
            {
                title: 'Felix Felicis',
                description: 'Hace que el bebedor tenga suerte durante un periodo breve, con resultados casi mágicos.',
                image: 'https://static.wikia.nocookie.net/harrypotter/images/8/84/Felix_Felicis_Phial_HBP.png',
                amount: '65 galeones'
            },
            {
                title: 'Polyjuice Potion',
                description: 'Un brebaje que transforma la apariencia del bebedor durante horas, ideal para contención y camuflaje.',
                image: 'https://static.wikia.nocookie.net/harrypotter/images/1/1b/B2C12M2_Polyjuice_Potion_ready.jpg',
                amount: '58 galeones'
            },
            {
                title: 'Amortentia',
                description: 'Una poción fascinante con un olor irresistible, famosa por despertar recuerdos y emociones intensas.',
                image: 'https://static.wikia.nocookie.net/harrypotter/images/4/4f/B6C9M1_cropped_Amortentia.png',
                amount: '72 galeones'
            }
        ],
        varitas: [
            {
                title: 'Varita de Michael Corner',
                description: 'Núcleo: Cuerno de unicornio. Madera: Manzano. Largo: no especificado.',
                image: 'assets/varita1.jpg',
                amount: '32 galeones'
            },
            {
                title: 'Varita de Filius Flitwick',
                description: 'Núcleo: Pluma de Fénix. Madera: no especificada. Largo: no especificado.',
                image: 'assets/varita2.jpg',
                amount: '32 galeones'
            },
            {
                title: 'Varita de Zacharias Smith',
                description: 'Núcleo: no especificado. Madera: Sauce. Largo: no especificado.',
                image: 'assets/varita3.jpg',
                amount: '32 galeones'
            }
        ]
    },
    api: {
        baseUrl: 'https://hogwarts-api.com/api'
    }
};

// Traer informaación de la API de Hogwarts si está disponible para poblar el catálogo de pociones, de lo contrario usar los datos locales
window.hogwartsStore = {
    // Función para estimar el precio de una poción en galeones según su dificultad o nombre
    estimateGalleonPrice(item) {
        const difficulty = (item.difficulty || '').toLowerCase();

        if (difficulty.includes('advanced')) return '84 galeones';
        if (difficulty.includes('moderate') || difficulty.includes('ordinary')) return '68 galeones';
        if (difficulty.includes('beginner')) return '46 galeones';

        const source = item.name || item.title || item.slug || 'potion';
        const hash = Array.from(source).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const value = 40 + (hash % 51);
        return `${value} galeones`;
    },

    // Función para analizar la respuesta de la API y devolver un array de pociones
    parseListResponse(data) {
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.results)) return data.results;
        if (Array.isArray(data.data)) return data.data;
        return [];
    },

    // Función para buscar pociones por término de búsqueda
    async fetchPotionsBySearch(searchTerm) {
        try {
            const url = `${window.storeData.api.baseUrl}/potions${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const payload = await response.json();
            return this.parseListResponse(payload);
        } catch (error) {
            console.warn(`No data found for "${searchTerm || 'all'}":`, error);
            return [];
        }
    },

    // Función para obtener el catálogo completo de pociones
    async fetchPotionCatalog() {
        return this.fetchPotionsBySearch('');
    },

    // Función para normalizar los datos de una poción obtenida de la API
    normalizePotion(item) {
        const title = item.name || item.title || 'Poción desconocida';
        const description = item.effect || item.characteristics || 'Brebaje clásico del catálogo de Hogwarts.';
        const image = item.image || item.images || 'https://static.wikia.nocookie.net/harrypotter/images/8/84/Felix_Felicis_Phial_HBP.png';
        const amount = item.price || item.amount || this.estimateGalleonPrice(item);

        return {
            title,
            description,
            image,
            amount
        };
    }
};
