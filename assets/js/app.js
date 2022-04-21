// Selecting elements from the DOM
const showsSearchable = document.querySelector(`#shows-searchable`);
const showsTop = document.querySelector(`#shows-top`);
const upload = document.querySelector(`#uploadconform`);
const files = document.querySelector(`#uploadfile`);
const search = document.querySelector(`.search`);
const btn = document.querySelector(`.btn`);
const input = document.querySelector(`.input`);
const close = document.querySelector(`.close`);

/* 
const uploadconfirm = document
  .getElementById('uploadconform')
  .addEventListener(`click`, () => {
    Papa.parse(document.getElementById('uploadfile').files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
        complete: function (results) {
        console.log(results.data);
        let count = 0;
        tvShows = results.data
          .map(elem => elem.Watching)
          .filter(elem => elem != '')
          .toString()
          .replaceAll(` `, `%20`)
          .split(`,`);

        console.log(`tvShows`, tvShows);
        tvShows.forEach(elem => console.log(elem));

        tvShows.forEach(element => {
          const path = `search/tv`;
          const url = generateUrl(path) + `&query=` + element;
          console.log(`url:`, url);

          // fetch movie video

          fetch(url)
            .then(res => res.json())
            .then(data => renderImportShows(data, count))
            .catch(error => {
              console.log(`Error:`, error);
            });
        });
      },
    });
  });
 */
function handleError(error) {
  console.log(`Error`, error);
}

function showSection(shows) {
  const section = document.createElement(`section`);
  section.classList = `section`;

  shows.map(show => {
    /*     const { title, image, imDbRating, plot, imDbRatingVotes } = show;
        console.log(`Title`, title);
        if (imDbRatingVotes > 50) {
          const movieEl = document.createElement(`div`);
          movieEl.classList.add(`movie`);
          movieEl.innerHTML = `
      <img
        src="${image}"
        alt="${title}"
        voteCount= "${imDbRatingVotes}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(imDbRating)}">${imDbRating}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${plot}
      </div>
    </div>`;
          section.appendChild(movieEl);
        }
      }); */
    if (show.image) {
      const { title, image, imDbRating, plot, imDbRatingVotes, id } = show;

      const showEl = document.createElement(`div`);
      showEl.classList.add(`showElem`);

      const img = document.createElement(`img`);
      img.src = image;
      img.setAttribute(`data-show-id`, id);
      const imgInfo = document.createElement(`div`);
      imgInfo.setAttribute(`class`, `info`);
      const showInfo = document.createElement(`h2`);
      showInfo.innerHTML = title;

      const rating = document.createElement(`span`);
      rating.setAttribute(`class`, `${getClassByRate(imDbRating)}`);
      rating.innerHTML = `${imDbRating}`;

      imgInfo.appendChild(showInfo);
      imgInfo.appendChild(rating);
      showEl.appendChild(img);
      showEl.appendChild(imgInfo);
      section.appendChild(showEl);
      /*       section.appendChild(img);
      section.appendChild(imgInfo); */
    }
  });
  return section;
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return `green`;
  } else if (vote >= 5) {
    return `orange`;
  } else return `red`;
}

function createShowsContainer(shows, title = '') {
  const showElem = document.createElement(`div`);
  showElem.setAttribute(`class`, `shows`);

  const header = document.createElement(`h2`);
  header.innerHTML = title;

  const section = showSection(shows);

  const content = document.createElement(`content`);
  content.classList = `content`;

  const contentClose = `<p id="content-close">X</p>`;

  content.innerHTML = contentClose;

  showElem.appendChild(header);
  showElem.appendChild(section);
  showElem.appendChild(content);
  return showElem;
}

function renderSearchShows(data) {
  // data.resoults []
  showsSearchable.innerHTML = ``;
  const shows = data.results;
  console.log(`shows`, shows);
  const showBlock = createShowsContainer(shows);
  showsSearchable.appendChild(showBlock);

  console.log(`Data:`, showsSearchable);
}

function renderShows(data) {
  // data.resoults []

  let shows = [];
  shows = data.items;
  console.log(`Shows`, shows);
  const showBlock = createShowsContainer(shows, this.title);
  showsTop.appendChild(showBlock);
  console.log(showsTop);
  console.log(`Data:`, data);
}

btn.addEventListener(`click`, e => {
  e.preventDefault();
  search.classList.toggle(`active`);
  input.focus();

  const value = input.value;
  if (value != ``) searchShow(value);
  console.log(`value`, value);
  input.value = ``;
});
close.addEventListener(`click`, e => {
  e.preventDefault();
  search.classList.remove(`active`);
});

function createIframe(data) {
  //https://www.imdb.com/video/imdb/vi4265067289/imdb/embed
  const iframe = document.createElement(`iframe`);
  /*   iframe.src = `https://www.imdb.com/video/imdb/${data.videoId}/imdb/embed`; */
  iframe.src = `https://www.youtube.com/embed/${data.videoId}`;
  console.log(`iframe.src`, iframe.src);
  iframe.width = 400;
  iframe.height = 220;
  iframe.margin = 2;
  iframe.allowFullscreen = true;

  return iframe;
}

function createVideoContent(data, content) {
  // TO DO
  // display movies videos
  content.innerHTML = `<p id="content-close" style="color:white">X</p>`;
  console.log(`Videos`, data);
  const videos = data;
  const Trailer = data.id;
  console.log(`Trailer`, Trailer);
  console.log(`Video results: `, data.videoId);
  //const length = videos.length > 4 ? 4 : videos.length
  const iframeContainer = document.createElement(`div`);

  //for (let i = 0; i <= length; i++) {
  //const video = videos[i]
  //const iframe = createIframe(video)
  const iframe = createIframe(videos);
  iframeContainer.appendChild(iframe);
  content.appendChild(iframeContainer);
  // }
}

// Event Delegation
document.onclick = function (event) {
  const target = event.target;
  if (target.tagName.toLowerCase() === `img`) {
    //for (let i = 0; i <= event.target.results; i++) { }
    console.log(`love`);
    console.log(`Event`, event);
    const showID = event.target.dataset.showId;
    // console.log(`showID`, showID);
    // const showTrailer = `<video id="movie" src="${newUrl}" height="600px" width="1300px" controls autoplay > </video>`

    const section = event.target.parentElement; // section
    const content = section.nextElementSibling; // content
    content.classList.add(`content-display`);

    const path = `YouTubeTrailer`;
    const url = generateUrl(path);
    const newUrl = url + showID;
    console.log(`newUrl:`, newUrl);

    // fetch movie video
    fetch(newUrl)
      .then(res => res.json())
      .then(data => createVideoContent(data, content))
      .catch(error => {
        console.log(`Error:`, error);
      });
  }
  if (target.id === `content-close`) {
    const content = target.parentElement;
    content.classList.remove(`content-display`);
  }
};
searchShow(`Vox%20Machina`);
getWatchingShow(`ls560571232`);
//getPopularShow();
//getTopRatedShow()
