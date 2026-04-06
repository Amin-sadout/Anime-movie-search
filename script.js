const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const resultList = document.getElementById('resultList')
const message = document.getElementById('message')

const movies = [ 
    {
    title: 'Demon slayer: Infinity Castle',
    movieLength: '1 hours',
    poster: "https://img.youtube.com/vi/x7uLutVRBfI/maxresdefault.jpg"
},
   {
    title: 'One piece random movie',
    movieLength: '3 hours',
    poster: "https://static.beebom.com/wp-content/uploads/2023/02/chopper-kingdom.jpg?quality=75&strip=all"
},
   {
    title: 'Naruto The Last',
    movieLength: '2 hours',
    poster: "https://wallpapercave.com/wp/wp3632477.jpg"
},
];

const renderMovies = (moviesToRender) => {
     resultList.innerHTML = '';

     for (let i = 0; i < moviesToRender.length; i++) {
        const li = document.createElement('li')
        const title = document.createElement('p')
        const length = document.createElement('p')
        const posterImg = document.createElement('img')
        length.textContent = moviesToRender[i].movieLength;
        title.textContent = moviesToRender[i].title;
        posterImg.src = moviesToRender[i].poster
        posterImg.alt = moviesToRender[i].title
        li.appendChild(posterImg)
        li.appendChild(title);
        li.appendChild(length)
        resultList.appendChild(li);
    }
     

}

searchBtn.addEventListener('click', () => { // useless for now but i'll keep it in case i'll need to use it somehow
   handleSearch();
});

searchInput.addEventListener('input', () => {
    handleSearch();
});

const handleSearch = () => {
 const searchText = searchInput.value.toLowerCase().trim();

 const filteredMovies = movies.filter((movie) => {
        return movie.title.toLowerCase().startsWith(searchText);
    });

    if (filteredMovies.length === 0) {
        message.textContent = 'no movies found'
       renderMovies([]); // this will render an empty array therefor if there is nothing, we show nothing instead of the last shown movie/movies
        return;
    }

    message.textContent = '';
    renderMovies(filteredMovies);
};

renderMovies(movies);