const API_KEY ='api_key=396d28f161348db1aae0c399905061e5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+ API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovie(API_URL);

function getMovie(url){
fetch(url).then(res => res.json()).then(data =>{
    console.log(data.results)
    showMovies(data.results);
})
}

function showMovies(data){

    main.innerHTML = "";

    data.forEach(movie =>{
        const {title , poster_path,vote_average  , overview} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML =  ` <div class="movie">
        <img src="${IMG_URL+poster_path}" alt="${title}">
      
        <div class="movie-info">

            <h3>${title}</h3>
            <span class="${getColour(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview} 
        </div>`

        main.appendChild(movieEL);
        
    })
}

function getColour(vote){
    if(vote>= 8){
        return 'green'
    }else if(vote>=5){

        return "orange"
    }else{
       return "red" 
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovie(searchURL+'&query='+searchTerm)
    }else{
        getMovie(API_URL);
    }

})