// Функция применения фильтров
function applyFilters() {
    console.log('Применяем фильтры...');
    
    // Получаем значение поиска
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    // Получаем выбранный диапазон цен
    const priceRadio = document.querySelector('input[name="price"]:checked');
    const priceValue = priceRadio ? priceRadio.value : 'all';
    
    // Получаем выбранные жанры
    const genreCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedGenres = Array.from(genreCheckboxes).map(cb => cb.value);
    
    // Получаем все карточки
    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;
    
    // Проверяем каждую карточку
    cards.forEach(card => {
        const gameName = card.dataset.name.toLowerCase();
        const gamePrice = parseInt(card.dataset.price);
        const gameGenres = card.dataset.genres ? card.dataset.genres.split(',') : [];
        
        // 1. Проверка поиска
        let matchesSearch = true;
        if (searchValue) {
            matchesSearch = gameName.includes(searchValue);
        }
        
        // 2. Проверка цены
        let matchesPrice = true;
        if (priceValue !== 'all') {
            const [min, max] = priceValue.split('-').map(Number);
            matchesPrice = gamePrice >= min && gamePrice <= max;
        }
        
        // 3. Проверка жанров
        let matchesGenre = true;
        if (selectedGenres.length > 0) {
            matchesGenre = selectedGenres.some(genre => 
                gameGenres.includes(genre)
            );
        }
        
        // Если карточка проходит все фильтры
        if (matchesSearch && matchesPrice && matchesGenre) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Показываем или скрываем сообщение "Нет результатов"
    const noResults = document.getElementById('noResults');
    const cardContainer = document.querySelector('.card-container');
    
    if (visibleCount === 0) {
        if (noResults) noResults.classList.add('show');
        if (cardContainer) cardContainer.style.display = 'none';
    } else {
        if (noResults) noResults.classList.remove('show');
        if (cardContainer) cardContainer.style.display = 'flex';
    }
    
    console.log('Найдено игр:', visibleCount);
    
    // ЗАКРЫВАЕМ МЕНЮ ПОСЛЕ ПРИМЕНЕНИЯ ФИЛЬТРОВ
    closeFilterMenu();
}

// Функция сброса фильтров
function resetFilters() {
    console.log('Сбрасываем фильтры');
    
    // Сбрасываем поле поиска
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Сбрасываем радиокнопки цены
    const priceAll = document.querySelector('input[name="price"][value="all"]');
    if (priceAll) {
        priceAll.checked = true;
    }
    
    // Сбрасываем чекбоксы жанров
    const genreCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    genreCheckboxes.forEach(cb => {
        cb.checked = false;
    });
    
    // Показываем все карточки
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('hidden');
    });
    
    // Скрываем сообщение "Нет результатов" и показываем контейнер
    const noResults = document.getElementById('noResults');
    const cardContainer = document.querySelector('.card-container');
    
    if (noResults) noResults.classList.remove('show');
    if (cardContainer) cardContainer.style.display = 'flex';
    
    // Закрываем меню после сброса
    closeFilterMenu();
}

// Функция закрытия меню фильтров
function closeFilterMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.checked = false;
    }
}

// Функция для блока "О нас"
function toggleAboutText() {
    const aboutContent = document.getElementById('aboutContent');
    const button = document.querySelector('.read-more-btn');
    
    if (aboutContent.classList.contains('expanded')) {
        aboutContent.classList.remove('expanded');
        button.textContent = 'Читать дальше';
    } else {
        aboutContent.classList.add('expanded');
        button.textContent = 'Свернуть';
    }
}

// Функция проверки размера экрана
function checkScreenSize() {
    const button = document.querySelector('.read-more-btn');
    const aboutContent = document.getElementById('aboutContent');
    
    if (window.innerWidth >= 768) {
        // На больших экранах всегда показываем полный текст
        if (button) button.style.display = 'none';
        if (aboutContent) aboutContent.classList.add('expanded');
    } else {
        // На мобильных показываем кнопку
        if (button) button.style.display = 'block';
        if (aboutContent) aboutContent.classList.remove('expanded');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // Проверяем размер экрана
    checkScreenSize();
    
    // Применяем фильтры при загрузке (показываем все карточки)
    setTimeout(applyFilters, 100);
});

// Проверяем при изменении размера окна
window.addEventListener('resize', checkScreenSize);

// Экспорт функций для использования в HTML
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;
window.closeFilterMenu = closeFilterMenu;
window.toggleAboutText = toggleAboutText;