// Initial Values
//const API_KEY = `b1d122016fc20ff386b17264a09040ff`;
//const IMAGE_URL = `https://image.tmdb.org/t/p/w500`;
const API_KEY = `k_v5z44hzw`;
const IMAGE_URL = `https://imdb-api.com/images/original/`;

const url = `https://api.themoviedb.org/3/search/tv?api_key=b1d122016fc20ff386b17264a09040ff`;

function generateUrl(path) {
  //SearchSeries/k_v5z44hzw/lost 2004
  const url = `https://imdb-api.com/en/API/${path}/k_v5z44hzw/`;
  return url;
}
// function generateIMDB(path) {
//     const url = `https://imdb-api.com/en/API/MostPopularTVs/k_v5z44hzw`
//     return url
// }

function requestSearis(url, onComplete, onError) {
  fetch(url)
    .then(res => res.json())
    .then(onComplete)
    .catch(onError);
}

function video() {
  const path = `YouTubeTrailer`;
  const url = generateUrl(path);
  return url;
}

function searchShow(value) {
  const path = `SearchSeries`;
  const url = generateUrl(path) + value;
  console.log(url);
  requestSearis(url, renderSearchShows, handleError);
}

function getPopularShow() {
  const path = `MostPopularTVs`;
  const url = generateUrl(path);
  console.log(`Url:`, url);
  const render = renderShows.bind({ title: 'Popular' });
  requestSearis(url, render, handleError);
}
function getWatchingShow(listID) {
  const path = `IMDbList`;
  const url = generateUrl(path) + listID;
  console.log(`Url:`, url);
  const render = renderShows.bind({ title: 'Watching' });
  requestSearis(url, render, handleError);
}

/* function getTopRatedShow() {
    const path = `tv/top_rated`
    const url = generateUrl(path)
    console.log(`Url:`, url);
    const render = renderShows.bind({ title: "Top Rated" })
    requestSearis(url, render, handleError)
} */
