const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultList = document.getElementById('resultList');
const message = document.getElementById('message');
const sortBtn = document.getElementById('sortBtn');
const clearBtn = document.getElementById('clearBtn');

let moviesToRender = [];
let isDescending = true;

const renderMovies = (searchedMovies) => {
  resultList.innerHTML = ``;

  for (let i = 0; i <searchedMovies.length; i++) {
    const li = document.createElement(`li`);
    const title = document.createElement(`p`);
    const length = document.createElement(`p`);
    const posterImg = document.createElement(`img`);
    const score = document.createElement(`p`);
    const link = document.createElement('a');
    link.classList.add('link')
    link.href = searchedMovies[i].url;
    link.textContent = 'View details';
    link.target = '_blank'; // to open our link into a new page instead of the main one we're in
    posterImg.src = searchedMovies[i].poster
    length.textContent = searchedMovies[i].movieLength;
    title.textContent = searchedMovies[i].title;
    posterImg.alt = searchedMovies[i].title;
    score.textContent = `Score: ${searchedMovies[i].score}`;

    li.appendChild(posterImg);
    li.appendChild(link);
    li.appendChild(score);
    li.appendChild(title);
    li.appendChild(length);
    resultList.appendChild(li);
  }
};

clearBtn.addEventListener('click', () => {
searchInput.value = ''
message.textContent = ''
moviesToRender = []
renderMovies(moviesToRender)
sortBtn.textContent = 'Sort By Score'
isDescending = true;
})

const resetSearchButton = () => {
  searchBtn.disabled = false;
  searchBtn.textContent = 'Search';
};

const stateRest = () => {
sortBtn.textContent = 'Sort By Score';
  isDescending = true;
}

const searchMovies = async () => {
  const searchText = searchInput.value.toLowerCase().trim();
  const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchText)}&type=movie&limit=25`

  if (searchText === ``) {
    message.textContent = ``;
    moviesToRender = [];
  renderMovies(moviesToRender);
    return;
  }

 searchBtn.disabled = true;
searchBtn.textContent = 'Searching...';
stateRest();
try {
  const response = await fetch(url);
if (!response.ok) {
   throw new Error(`Request failed: ${response.status}`) }

  const data = await response.json(); 
  console.log(response)
  console.log(data) 

 const searchedMovies = data.data.map((anime) => {
  return {
    title: anime.title || `Unknown title` ,
    movieLength: anime.duration || `Unknown length`,
    poster: anime.images.jpg.image_url,
    score: anime.score || 0,
    url: anime.url
  };
});

if (searchedMovies.length === 0) {
  message.textContent = `No movies found`;
  moviesToRender = [];
  renderMovies(moviesToRender);
  return;
}

   moviesToRender = searchedMovies;
  renderMovies(moviesToRender);
  if (moviesToRender.length === 1) {
    message.textContent = `1 Movie found`
  }
  else {
    message.textContent = `${searchedMovies.length} movies found`
    message.style.color = 'black'
  }
  return;

}

  catch (error) {
    console.log(error);
    message.style.color = 'red'
  message.textContent = `Error: ${error.message}`;
  moviesToRender = [];
  renderMovies(moviesToRender);
  return;
  } finally {
  resetSearchButton();
}


};


searchBtn.addEventListener('click', () => {
  searchMovies();
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchMovies();
  }
});

sortBtn.addEventListener('click', () => {
  if (moviesToRender.length === 0) {
  message.textContent = 'Search for movies first';
  return;
}
  moviesToRender.sort((a, b) => {
    if (isDescending === true) {
      sortBtn.textContent = 'Sort by lowest score';
      return b.score - a.score;
    } else {
      sortBtn.textContent = 'Sort by highest score';
      return a.score - b.score;
    }
  });

  isDescending = !isDescending;
  renderMovies(moviesToRender);
});


