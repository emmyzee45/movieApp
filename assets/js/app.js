
var buttonElement = document.querySelector("#search");
var inputElement = document.querySelector("#inputValue");
var movieSearchable = document.querySelector("#movies-searchable")
var moviesContainer = document.querySelector("#movies-container")


function movieSection(movies){
    return movies.map((movie) => {
       if(movie.poster_path){
        return `
        <img src=${image_url + movie.poster_path} data-movie-id=${movie.id}>`;

       }    
    })
}

function createMovieContainer(movies, title=''){
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "movie");
    const movieTemplate = `
    <h2>${title}</h2>
    <section clas="section">
        ${movieSection(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>`
    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data){
    movieSearchable.innerHTML = '';
    var movies = data.results;
    var movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
}

function renderMovies(data){
    var movies = data.results;
    var movieBlock = createMovieContainer(movies, this.title);
    console.log(movieBlock)
    // moviesContainer.appendChild(movieBlock);
    moviesContainer.appendChild(movieBlock);
}


function handleError(error){
    console.log(error);
}

buttonElement.onclick = function(event){
    event.preventDefault();
    var value = inputElement.value;
    searchMovie(value);

    inputElement.value = '';
    // console.log("Value", value);
}

function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src =   `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    return iframe;
}

function createVideoTemplate(data, content){
    // TODO
    // display videos
    content.innerHTML = '<p id="content-close">X</p>';
    const videos = data.results;
            const length = videos.length > 4 ? 4 : videos.length;
            const iframeContainer = document.createElement("div");

            for(let i = 0; i < length; i++){
                const video = videos[i];
                const iframe = createIframe(video);
                iframeContainer.appendChild(iframe);
                content.appendChild(iframeContainer);
            }
}

//Event Delegation
document.onclick = function(event){
    console.log(event)
    const target = event.target;
    if(target.tagName.toLowerCase() === 'img'){
        const movieId = target.dataset.movieId;
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        var path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        // fetch movies
        fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate(data, content))
        .catch((error) => {
            console.log(error);
        })
    }
    if(target.id === 'content-close'){
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}

getUpcomingMovies();

getTopRatedMovies();

getPopularMovies();