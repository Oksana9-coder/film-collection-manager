// Объект для хранения фильмов
const films = {};

// Элементы DOM
const addForm = document.getElementById('add-form');
const removeForm = document.getElementById('remove-form');
const searchInput = document.getElementById('search-input');
const filmList = document.getElementById('film-list');
const searchResults = document.getElementById('search-results');

// Функция отображения фильмов
function renderFilms() {
    filmList.innerHTML = '';
    for (const title in films) {
        const li = document.createElement('li');
        li.textContent = title;
        filmList.appendChild(li);
    }
}

// Обработка добавления фильма
addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('film-title');
    const title = input.value.trim();

    if (title && !films[title]) {
        films[title] = true; // Добавляем в словарь
        renderFilms();
        input.value = '';
    }
});

// Обработка удаления фильма
removeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('film-title-remove');
    const title = input.value.trim();

    if (title && films[title]) {
        delete films[title]; // Удаляем из словаря
        renderFilms();
        input.value = '';
    }
});

// Обработка поиска фильмов
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    searchResults.innerHTML = '';

    for (const title in films) {
        if (title.toLowerCase().includes(query)) {
            const li = document.createElement('li');
            li.textContent = title;
            searchResults.appendChild(li);
        }
    }
});