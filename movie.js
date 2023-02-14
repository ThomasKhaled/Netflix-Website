const img = document.querySelector('.movie-img');
const title = document.querySelector('.movie-title');
const votecircle = document.querySelector('.circular');
const voteVal = document.querySelector('.vote-val');
const trailer = document.querySelector('.trailer');
const overview = document.querySelector('.overview-info');
const date = document.querySelector('.date');
const movies = JSON.parse(localStorage.getItem('movies'));
const id = JSON.parse(localStorage.getItem('id'));
const type = JSON.parse(localStorage.getItem('type'));



async function getTrailer(id,movie_type) {
    let tvShows_Query;
    console.log(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=3b89d7481e728beb40b173ed35ef7a1b&language=en-US`);
    if (movie_type == 'TV Shows')
        tvShows_Query = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=3b89d7481e728beb40b173ed35ef7a1b&language=en-US`;
    else 
        tvShows_Query = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3b89d7481e728beb40b173ed35ef7a1b&language=en-US`;  
    let data = await fetch(tvShows_Query);
    let response = await data.json();
    return response;
}


for (let i = 0; i < movies.length; i++) {
    if (movies[i].id == id) {
        img.src = `${movies[i].poster_img}`;
        title.innerHTML = `${movies[i].name}`;
        date.innerHTML = `${movies[i].release_date}`
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
            playTrailer();
        if(movies[i].overview.length == 0){
            overview.innerHTML = 'No Overview Available'; 
        }else
            overview.innerHTML = `${movies[i].overview}`;
        
    }
}

function playTrailer(){
    let trailerLink = getTrailer(id,type);
        trailerLink.then((link)=>{
            if(link.results.length == 0){
                trailer.innerHTML = 'Sorry, No trailer Available!';
                trailer.style.color = 'white'
                trailer.style.fontSize = '1.5rem'
                trailer.style.marginLeft = '1.5rem'
            }
            for(let i=0; i<link.results.length; i++){
                if(link.results[i].type == 'Trailer'){
                    trailer.innerHTML = `<iframe allow="autoplay"
                    frameborder="0" 
                    allowfullscreen="true"
                    src="https://www.youtube.com/embed/${link.results[i].key}?autoplay=0&mute=0&controls=1&loop=1&playlist=${link.results[i].key}&showinfo=0&origin=https://OurWebsiteDomain"
                    title="Netflix " height="890" data-ytbridge="vidSurrogate2" style="width: 100%;"></iframe>`;
                    break;
                }
            }
            
        });
}