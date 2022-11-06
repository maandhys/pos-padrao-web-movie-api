const TVSHOWAPIKEY = 'a2aea042d07705076656601a262f346a';
const TVIMGENDPOINT = 'https://image.tmdb.org/t/p/w500';
const TVDETAILSENDPOINT = 'https://api.themoviedb.org/3/tv/';

function tvShowDetails() {
  const id = localStorage.getItem('tvShowID');
  fetch(`${TVDETAILSENDPOINT}${id}?api_key=${TVSHOWAPIKEY}`)
    .then(res => res.json())
    .then(data => {
      var tvShow = data;
      document.getElementById('title').innerHTML = tvShow.name;
      document.getElementById('overview').innerHTML = tvShow.overview;
      const homepage = `<a href="${tvShow.homepage}">${tvShow.homepage}</a>`;
      document.getElementById('homepage').innerHTML = homepage;
      document.getElementById('from').innerHTML = tvShow.networks[0].name;
      document.getElementById('creator1').innerHTML = tvShow.created_by[0].name;
      if (tvShow.created_by.length > 1) {
        document.getElementById('creator1').innerHTML += " | " + tvShow.created_by[1].name;
      }
      document.getElementById('start').innerHTML = tvShow.first_air_date;
      document.getElementById('end').innerHTML = tvShow.last_air_date;
      document.getElementById('seasons').innerHTML = tvShow.number_of_seasons;
      document.getElementById('episodes').innerHTML = tvShow.number_of_episodes;
      document.getElementById('idioma').innerHTML = tvShow.original_language;
      document.getElementById('status').innerHTML = tvShow.status;
      document.getElementById('vote_average').innerHTML = tvShow.vote_average;
      document.getElementById('type').innerHTML = tvShow.type;
      
      const src = `<img src="${TVIMGENDPOINT}${tvShow.backdrop_path}" class="card-img-top"  style="min-width: 100px">`;
      document.getElementById('backdrop').innerHTML += src;
    })
}
