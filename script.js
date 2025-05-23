const appDiv = document.getElementById('app');

// Пример функции для добавления фильма
function addFilm(filmName) {
    const filmList = document.createElement('ul');
    filmList.innerHTML = `<li>${filmName}</li>`;
    appDiv.appendChild(filmList);
}

// Добавляем тестовый фильм
addFilm('Фильм 1');