
function handleNavBarDropdown() {
    let dropDownMenu = document.querySelector('.browse');
    let HomeItem = document.querySelector('#home');
    let TVItem = document.querySelector('#tv');
    let MoviesItem = document.querySelector('#movie');
    let NewItem = document.querySelector('#new');
    dropDownMenu.addEventListener('click', () => {
        dropDownMenu.classList.toggle('ac');
    });
    HomeItem.classList.add('current');
    HomeItem.classList.add('disabled');
    HomeItem.addEventListener('click', () => {
        HomeItem.classList.add('current');
        HomeItem.classList.add('disabled');
        TVItem.classList.remove('current');
        TVItem.classList.remove('disabled');
        MoviesItem.classList.remove('current');
        MoviesItem.classList.remove('disabled');
        NewItem.classList.remove('current');
        NewItem.classList.remove('disabled');
        const overlay = document.querySelector('.overlay').classList.add('active-popup');
    });
    TVItem.addEventListener('click', () => {
        HomeItem.classList.remove('current');
        HomeItem.classList.remove('disabled');
        TVItem.classList.add('current');
        TVItem.classList.add('disabled');
        MoviesItem.classList.remove('current');
        MoviesItem.classList.remove('disabled');
        NewItem.classList.remove('current');
        NewItem.classList.remove('disabled');
        scrollAmountPopupMovie = 0;
        show_hidePopup();
        movies = [];
        showMovies(sliders_popup,'TV Shows',contentPopup);
        const headerDiv = document.querySelector('.sliding-popup .header-div');
        headerDiv.remove();
    });
    MoviesItem.addEventListener('click', () => {
        HomeItem.classList.remove('current');
        HomeItem.classList.remove('disabled');
        TVItem.classList.remove('current');
        TVItem.classList.remove('disabled');
        MoviesItem.classList.add('current');
        MoviesItem.classList.add('disabled');
        NewItem.classList.remove('current');
        NewItem.classList.remove('disabled');
        scrollAmountPopupMovie = 0;
        show_hidePopup();
        showMovies(sliders_popup,'Movies',contentPopup);
        const headerDiv = document.querySelector('.sliding-popup .header-div');
        headerDiv.remove();
    });
    NewItem.addEventListener('click', () => {
        HomeItem.classList.remove('current');
        HomeItem.classList.remove('disabled');
        TVItem.classList.remove('current');
        TVItem.classList.remove('disabled');
        MoviesItem.classList.remove('current');
        MoviesItem.classList.remove('disabled');
        NewItem.classList.add('current');
        NewItem.classList.add('disabled');
        scrollAmountPopupMovie = 0;
        show_hidePopup();
        showMovies(sliders_popup,'New & popular',contentPopup);
        const headerDiv = document.querySelector('.sliding-popup .header-div');
        headerDiv.remove();
    });
}
handleNavBarDropdown();

class Movie {
    constructor(id, name, language, overview, vote_avg, poster_img, release_date){
        this.id = id;
        this.name = name;
        this.language = language;
        this.overview = overview;
        this.vote_avg = vote_avg;
        this.poster_img = poster_img;
        this.release_date = release_date;
    }
}

window.onload = ()=>{
    let mainVideo = document.querySelector('.main-video');
    let muted = 1;
    mainVideo.innerHTML = `<iframe allow="autoplay"
     frameborder="0" 
     allowfullscreen="true"
     src="https://www.youtube.com/embed/uLtkt8BonwM?autoplay=1&mute=${muted}&controls=1&loop=1&playlist=uLtkt8BonwM&showinfo=0&origin=https://OurWebsiteDomain"
     title="Netflix " height="890" data-ytbridge="vidSurrogate2" style="width: 100%; position:absolute; left:0; top:-60px;" ></iframe>` 
};


async function getTvShows(movie_type){
    let tvShows_Query;
    if(movie_type == 'TV Shows')
        tvShows_Query = 'https://api.themoviedb.org/3/tv/popular?api_key=3b89d7481e728beb40b173ed35ef7a1b&language=en-US&page=1';
    else if (movie_type == 'Trending Now') 
        tvShows_Query = `https://api.themoviedb.org/3/trending/all/day?api_key=3b89d7481e728beb40b173ed35ef7a1b`;  
    else if (movie_type == 'New & popular')
        tvShows_Query = `https://api.themoviedb.org/3/movie/popular?api_key=3b89d7481e728beb40b173ed35ef7a1b&language=en-US&page=1`;    
    else
        tvShows_Query = `https://api.themoviedb.org/3/movie/now_playing?api_key=3b89d7481e728beb40b173ed35ef7a1b&language=en-US&page=1`;     
    let data = await fetch(tvShows_Query);
    let response = await data.json();
    return response;
}

let scrollAmount = 0;
let slidingAmount = 1000;
let scrollAmountTrending = 0;
let slidingAmountTrending = 1000;
let scrollAmountPopupMovie = 0;
let slidingAmountPopupMovie = 600;

const sliderButton = document.querySelectorAll('.slider-button');
const sliders = document.querySelector('.carousel-box');
const sliders_trending = document.querySelector('.carousel-trending');
const sliders_popup = document.querySelector('.sliding-popup .carousel-trending');
const content = document.querySelector('.sliding-content');
const contentTrending = document.querySelector('.carousel-trending .sliding-content');
const contentPopup = document.querySelector('.sliding-popup .sliding-content');



window.sliderScrollLeftTVShows = function(){
    content.scrollTo({
        behavior: 'smooth',
        top: 0,
        left: (scrollAmount -= slidingAmount)
    });

    if(scrollAmount < 0){
        scrollAmount = 0;
    }
}

window.sliderScrollRightTVShows = function(){
    if(scrollAmount <= content.scrollWidth - content.clientWidth){
        content.scrollTo({
            left: scrollAmount += slidingAmount,
            behavior: 'smooth',
            top: 0,
            
        });
    }
}
window. sliderScrollLeftTrending = function(){
    contentTrending.scrollTo({
        behavior: 'smooth',
        top: 0,
        left: (scrollAmountTrending -= slidingAmountTrending)
    });

    if(scrollAmountTrending < 0){
        scrollAmountTrending = 0;
    }
}

window.sliderScrollRightTrending = function(){
    if(scrollAmountTrending <= contentTrending.scrollWidth - contentTrending.clientWidth){
        contentTrending.scrollTo({
            left: scrollAmountTrending += slidingAmountTrending,
            behavior: 'smooth',
            top: 0,
            
        });
    }
}

window.sliderScrollLeftPopupMovie = function(){
    contentPopup.scrollTo({
        behavior: 'smooth',
        top: 0,
        left: (scrollAmountPopupMovie -= slidingAmountPopupMovie)
    });

    if(scrollAmountPopupMovie < 0){
        scrollAmountPopupMovie = 0;
    }
}

window.sliderScrollRightPopupMovie = function(){
    if(scrollAmountPopupMovie <= contentPopup.scrollWidth - contentPopup.clientWidth){
        contentPopup.scrollTo({
            left: scrollAmountPopupMovie += slidingAmountPopupMovie,
            behavior: 'smooth',
            top: 0,
            
        });
    }
}

let movies = [];
function showMovies(contentBox,type,node){
    node.innerHTML = '';
    let data2 = getTvShows(type);
    data2.then((data)=>{
        let headerDiv = document.createElement('div');
        headerDiv.className = 'header-div';
        let headerElement = document.createElement('h2');
        headerDiv.appendChild(headerElement);
        let headerText = document.createTextNode(type);
        contentBox.insertBefore(headerDiv, node);
        for(let i=0; i<data.results.length; i++){
            movies.push(new Movie(data.results[i].id,
                                  data.results[i].original_name??data.results[i].title,
                                  data.results[i].original_language,
                                  data.results[i].overview,
                                  data.results[i].vote_average,
                                  `https://image.tmdb.org/t/p/w220_and_h330_face${data.results[i].poster_path}`,
                                  data.results[i].release_date??data.results[i].first_air_date));
            const movieDev = document.createElement('div');
            movieDev.className  = `img-${i+1} ${type}`; 
            
            let imgElement = document.createElement('img');
            headerElement.appendChild(headerText);
            imgElement.src = `https://image.tmdb.org/t/p/w220_and_h330_face${data.results[i].poster_path}`;
            movieDev.addEventListener('click',()=>{
                localStorage.setItem('id',JSON.stringify(data.results[i].id));
                localStorage.setItem('type',JSON.stringify(type));
                window.open('/movie_info.html');
            });
            let votecircle = document.createElement('div');
            votecircle.className = 'circular';
            let voteVal = document.createElement('div');
            voteVal.className = 'vote-val';
            let progressValue = 0;
            let progressEnd = `${(movies[i].vote_avg*10).toFixed(0)}`;
            let speed = 10;
            let progress = setInterval(()=>{
                if(progressValue == progressEnd){
                    clearInterval(progress);
                }
                voteVal.innerHTML = `${progressValue}%`;
                progressValue++;
                if(progressEnd > 60){
                    votecircle.style.background = `conic-gradient(
                        #20c774 ${progressValue * 3.6}deg,
                        #183726 ${progressValue * 3.6}deg
                    )`;
                }else {
                    votecircle.style.background = `conic-gradient(
                        #d2d531 ${progressValue * 3.6}deg,
                        #423d0f ${progressValue * 3.6}deg
                    )`;
                }
                
            },speed);

            const rDate = document.createElement('span');
            if(data.results[i].release_date != undefined){
                rDate.innerHTML = `${data.results[i].release_date}`;
            }else if(data.results[i].first_air_date != ''){
                rDate.innerHTML = data.results[i].first_air_date;
            }else {
                rDate.innerHTML = 'Unknown Date';
            }
           
            rDate.className = 'release-date';
            


            if(data.results[i].release_date != undefined){
            }
            movieDev.appendChild(rDate);
            movieDev.appendChild(imgElement);
            movieDev.appendChild(votecircle);
            votecircle.appendChild(voteVal);
            node.appendChild(movieDev);             
        }
        localStorage.setItem('movies',JSON.stringify(movies));

    });          
}
showMovies(sliders,'TV Shows',content);
showMovies(sliders_trending,'Trending Now',contentTrending);


const closePopup = document.querySelector('.close-btn');
function show_hidePopup(){
    const overlay = document.querySelector('.overlay');
    if(!overlay.classList.contains('active-popup')){
        overlay.classList.add('active-popup');
    }
    overlay.classList.toggle('active-popup');
    closePopup.addEventListener('click',()=>{
        const overlay = document.querySelector('.overlay').classList.add('active-popup');
    });
}










