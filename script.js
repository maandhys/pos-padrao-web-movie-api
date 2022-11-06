const APIKEY = 'a2aea042d07705076656601a262f346a';
const ENDPOINT = 'https://api.themoviedb.org/3/search/tv?';
const IMGENDPOINT = 'https://image.tmdb.org/t/p/w500';
const LATESTENDPOINT = 'https://api.themoviedb.org/3/tv/latest?api_key='
const TRENDINGENDPOINT = 'https://api.themoviedb.org/3/trending/tv/day?api_key='


const search = document.getElementById('bntSearch');
search.addEventListener('click', () => {
  var searchBox = document.querySelector("#searchBox");
  var query = searchBox.value;
  fetch(`${ENDPOINT}api_key=${APIKEY}&language=pt-BR&page=1&include_adult=false&query=${query}`)
    .then(res => res.json())
    .then(data => {
      let str = `
         <div class="container">
            <div class="row">`
      for (i = 0; i < data.results.length; i++) {
        let tvShow = data.results[i];
        if (tvShow.poster_path) {
          str += `
          <div class="col-md-4 col-sm-6" style="text-align: center;">
              <img src="${IMGENDPOINT}${tvShow.poster_path}" class="card-img-top"  style="min-width: 100px">
              <h5>${tvShow.name}</h5>
              <div class="row" style= "justify-content: center;">
                <i class="bi bi-globe" style="color:steelblue"></i>&nbsp;
                <p id="idioma">${tvShow.original_language}</p> &nbsp;&nbsp;&nbsp;
                <i class="bi bi-star-fill" style="color:#f44336;"></i>&nbsp;
                <p id="vote_average">${tvShow.vote_average}</p>&nbsp;&nbsp;&nbsp;
                <a onClick=saveID(${tvShow.id}) href="tvshow.html"> <i class="bi bi-plus-square"></i> </a>
              </div>
          </div>`
        }
      }
      str += '</div></div>';
      document.getElementById('clientSearch').innerHTML = str
    })
    .catch(err => console.log(`Error: ${err.message}`))
})

function trending() {
  fetch(`${TRENDINGENDPOINT}${APIKEY}`)
    .then(res => res.json())
    .then(data => {
      let str = `
      <div class="container">
        <div class="row">`
      for (i = 0; i < data.results.length; i++) {
        let tvShow = data.results[i];
        str += `
          <div class="col-md-4 col-sm-6" style="text-align: center;">
              <img src="${IMGENDPOINT}${tvShow.poster_path}" class="card-img-top"  style="min-width: 100px">
              <h5>${tvShow.name}</h5>
              <div class="row" style= "justify-content: center;">
                <i class="bi bi-globe" style="color:steelblue"></i>&nbsp;
                <p id="idioma">${tvShow.original_language}</p> &nbsp;&nbsp;&nbsp;
                <i class="bi bi-star-fill" style="color:#f44336;"></i>&nbsp;
                <p id="vote_average">${tvShow.vote_average}</p>&nbsp;&nbsp;&nbsp;
                <a onClick=saveID(${tvShow.id}) href="tvshow.html"> <i class="bi bi-plus-square"></i> </a>
              </div>
          </div>`
      }
      str += '</div></div>';
      document.getElementById('destaque').innerHTML = str
      review();
    })
    .catch(err => console.log(`Error: ${err.message}`))
  
}

function saveID(id) {
  localStorage.setItem('tvShowID', id);
}

function limparTela(id) {
  var x = document.getElementById(id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Não utilizei pq o retorno não estava bom
function latest() {
  fetch(`${LATESTENDPOINT}${APIKEY}&language=pt-BR`)
    .then(res => res.json())
    .then(data => {
      let count = 6;
      let str = ` 
          <div class="row ">`;
      let tvShow = data;
      str += ` 
            <div id= "latest"class="col-md-2 col-sm-6" >
                <div class="card-body-latest">
                  <h5 class="card-title-latest">${tvShow.name}</h5><br>
                  <a class="bnt-latest" onClick=saveID(${tvShow.id}) href="tvshow.html"> Mais informacões</a>
                </div>

                <div class="row" style= "justify-content: center;">
                  <i class="bi bi-hourglass-split" style="color:steelblue"></i>&nbsp;
                  <p id="">Primeiro Episodio:${tvShow.first_air_date[0]}</p> &nbsp;&nbsp;&nbsp;
                  <i class="bi bi-star-fill" style="color:#f44336;"></i>&nbsp;
                  <a href="${tvShow.homepage}">Homepage:${tvShow.homepage}</a>
                  <p id="vote_average">${tvShow.vote_average}</p>&nbsp;&nbsp;&nbsp;
                </div>
                <div class="row" id="details">
                  <div class="col-sm">
                    <i class="bi bi-globe" style="color:steelblue"></i>
                    <p id="idioma">${tvShow.vote_average}</p>
                
                  <div class="col-sm">
                    <i class="bi bi-pen-fill" style="color:#607d8b"></i>
                    <p id="type">${tvShow.type}</p>
                  </div>
                  <div class="col-sm">
                    <i class="bi bi-bricks" style="color:#217d33"></i>
                    <p id="status">${tvShow.status}</p>
                  </div>
                </div>
                <a onClick=saveID(${tvShow.id}) href="tvshow.html"> <i class="bi bi-plus-square"></i> </a>
              </div>`
      document.getElementById('sobre').innerHTML = str
    })
    .catch(err => console.log(`Error: ${err.message}`))
}

