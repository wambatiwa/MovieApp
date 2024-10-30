let page = 1
let API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=817ef840985ad2eb4181ea4715913787&page=${page}`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=817ef840985ad2eb4181ea4715913787&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const button = document.getElementById('loadMore')

const myMovies = []



getMovies(API_URL)



async function getMovies(url) {
    const res = await fetch(url)
    const json = await res.json()
    const data = json.results
    myMovies.push(...data) // spread operator cause i will be adding more movies with the loadmore button
    console.log(myMovies);
    
    showMovies(myMovies);
}

function showMovies(movies) {
    main.innerHTML = movies.reduce((html,movie) => html +`
    <div class="movie">
    <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" class="movie">
    <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
    </div>
    <div class="overview">
        <h3>Overview</h3>
       ${movie.overview}
    </div>
    </div>
`,'' )
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    }
    else if(vote >= 5) {
        return 'orange'
    }
    else {
        return ''
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    }
    else {
        window.location.reload()
    }
})

button.addEventListener('click', (e) => {
    page++
    API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=817ef840985ad2eb4181ea4715913787&page=${page}`
    getMovies(API_URL)
})