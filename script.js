class Movie {
    constructor(title, year, genre, rating) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.rating = rating;
    }

    toString() {
        return `${this.title} (${this.year}), ${this.genre}, ★${this.rating.toFixed(1)}`;
    }
}

class MovieCollection {
    constructor() {
        this.movies = {};
        this.collections = {};
    }

    addMovie(movie) {
        if (this.movies[movie.title]) {
            throw new Error(`Фильм "${movie.title}" уже существует`);
        }
        this.movies[movie.title] = movie;
        this.updateMovieSelect();
        this.displayAllMovies();
    }

    removeMovie(title) {
        if (!this.movies[title]) {
            throw new Error(`Фильм "${title}" не найден`);
        }

        // Удаляем из всех коллекций
        for (const collectionName in this.collections) {
            this.collections[collectionName] = this.collections[collectionName].filter(
                movie => movie.title !== title
            );
        }

        delete this.movies[title];
        this.updateMovieSelect();
        this.displayAllMovies();
    }

    createCollection(name) {
        if (this.collections[name]) {
            throw new Error(`Коллекция "${name}" уже существует`);
        }
        this.collections[name] = [];
        this.updateCollectionSelect();
        this.displayCollections();
    }

    addToCollection(collectionName, movieTitle) {
        if (!this.collections[collectionName]) {
            throw new Error(`Коллекция "${collectionName}" не найдена`);
        }
        if (!this.movies[movieTitle]) {
            throw new Error(`Фильм "${movieTitle}" не найден`);
        }

        const movie = this.movies[movieTitle];
        if (this.collections[collectionName].some(m => m.title === movieTitle)) {
            throw new Error(`Фильм уже в коллекции "${collectionName}"`);
        }

        this.collections[collectionName].push(movie);
        this.displayCollections();
    }

    removeFromCollection(collectionName, movieTitle) {
        if (!this.collections[collectionName]) {
            throw new Error(`Коллекция "${collectionName}" не найдена`);
        }
        if (!this.movies[movieTitle]) {
            throw new Error(`Фильм "${movieTitle}" не найден`);
        }

        this.collections[collectionName] = this.collections[collectionName].filter(
            movie => movie.title !== movieTitle
        );
        this.displayCollections();
    }

    searchByTitle(title) {
        return this.movies[title] || null;
    }

    searchByGenre(genre) {
        return Object.values(this.movies).filter(
            movie => movie.genre.toLowerCase() === genre.toLowerCase()
        );
    }

    searchByYear(year) {
        return Object.values(this.movies).filter(movie => movie.year === year);
    }

    updateMovieSelect() {
        const select = document.getElementById('movieSelect');
        select.innerHTML = '';
        Object.values(this.movies).forEach(movie => {
            const option = document.createElement('option');
            option.value = movie.title;
            option.textContent = movie.title;
            select.appendChild(option);
        });
    }

    updateCollectionSelect() {
        const select = document.getElementById('collectionSelect');
        select.innerHTML = '';
        Object.keys(this.collections).forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
    }

    displayAllMovies() {
        const list = document.getElementById('allMovies');
        list.innerHTML = '';
        Object.values(this.movies).forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie.toString();
            list.appendChild(li);
        });
    }

    displayCollections() {
        const container = document.getElementById('collections');
        container.innerHTML = '';
        for (const [name, movies] of Object.entries(this.collections)) {
            const div = document.createElement('div');
            div.className = 'collection';
            
            const h3 = document.createElement('h3');
            h3.textContent = name;
            div.appendChild(h3);

            const ul = document.createElement('ul');
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.toString();
                ul.appendChild(li);
            });
            div.appendChild(ul);

            container.appendChild(div);
        }
    }
}

// Создаем экземпляр коллекции
const cinema = new MovieCollection();

// Добавляем несколько тестовых фильмов
cinema.addMovie(new Movie("Начало", 2010, "Фантастика", 8.8));
cinema.addMovie(new Movie("Побег из Шоушенка", 1994, "Драма", 9.3));
cinema.addMovie(new Movie("Темный рыцарь", 2008, "Боевик", 9.0));

// Создаем тестовые коллекции
cinema.createCollection("Фильмы Нолана");
cinema.createCollection("Лучшие фильмы");

// Добавляем фильмы в коллекции
cinema.addToCollection("Фильмы Нолана", "Начало");
cinema.addToCollection("Фильмы Нолана", "Темный рыцарь");
cinema.addToCollection("Лучшие фильмы", "Побег из Шоушенка");
cinema.addToCollection("Лучшие фильмы", "Темный рыцарь");

// Функции для работы с интерфейсом
function addMovie() {
    const title = document.getElementById('title').value;
    const year = parseInt(document.getElementById('year').value);
    const genre = document.getElementById('genre').value;
    const rating = parseFloat(document.getElementById('rating').value);

    try {
        cinema.addMovie(new Movie(title, year, genre, rating));
        // Очищаем поля ввода
        document.getElementById('title').value = '';
        document.getElementById('year').value = '';
        document.getElementById('genre').value = '';
        document.getElementById('rating').value = '';
    } catch (error) {
        alert(error.message);
    }
}

function createCollection() {
    const name = document.getElementById('collectionName').value;
    try {
        cinema.createCollection(name);
        document.getElementById('collectionName').value = '';
    } catch (error) {
        alert(error.message);
    }
}

function addToCollection() {
    const collectionName = document.getElementById('collectionSelect').value;
    const movieTitle = document.getElementById('movieSelect').value;
    try {
        cinema.addToCollection(collectionName, movieTitle);
    } catch (error) {
        alert(error.message);
    }
}

function removeFromCollection() {
    const collectionName = document.getElementById('collectionSelect').value;
    const movieTitle = document.getElementById('movieSelect').value;
    try {
        cinema.removeFromCollection(collectionName, movieTitle);
    } catch (error) {
        alert(error.message);
    }
}

function searchMovies() {
    const type = document.getElementById('searchType').value;
    const value = document.getElementById('searchValue').value;
    let results = [];

    switch (type) {
        case 'title':
            const movie = cinema.searchByTitle(value);
            if (movie) results = [movie];
            break;
        case 'genre':
            results = cinema.searchByGenre(value);
            break;
        case 'year':
            results = cinema.searchByYear(parseInt(value));
            break;
    }

    const list = document.getElementById('searchResults');
    list.innerHTML = '';
    results.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.toString();
        list.appendChild(li);
    });
}