var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},n=e.parcelRequirefa48;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return r[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){t[e]=r},e.parcelRequirefa48=n);var i=n("knVcn"),a=n("hGVxz");const d=document.querySelector(".header-search-bar__input"),o=document.querySelector(".header-search-bar__button"),l=document.querySelector(".header-search-bar__warning"),s=document.querySelector(".cards-wrapper"),c=document.querySelector(".load-more");document.querySelector(".load-more-trending");let u=1;l.style.visibility="hidden";const v=async()=>{try{const e="https://api.themoviedb.org/3/search/movie",r=(await a.default.get(`${e}?api_key=dbea77d3eb5b3622b027f73f6a5032fe&query=${d.value}&page=${u}&language=en-US`)).data.results;return await(0,i.getGenres)(),r}catch(e){console.error(e)}},p=e=>(console.log("movies",e),e.map((e=>{const r=e.genre_ids.slice(0,3).map((e=>i.genreList[e])).join(", ");return`<div id="card" class="card"><img class="card__poster" src='https://image.tmdb.org/t/p/w500\n${e.poster_path}' alt='Poster of ${e.title} movie' data-id="${e.id}"></a>\n    <div class="card__info">\n      <div class="card__quick-info">\n        <div class="card__movie-title">${e.title}</div>\n        <div class="card__movie-genre">${r}</div>\n        <div class="card__movie-release">${e.release_date.slice(0,4)}</div>\n      </div>\n      <div class="card__movie-rating">${Math.round(10*e.vote_average)/10}</div>\n    </div>\n  </div>`})).join(""));o.addEventListener("click",(e=>{e.preventDefault(),u=1;document.querySelector(".load-more-trending").hidden=!0,document.querySelector(".load-more").hidden=!1;v().then((e=>{0===e.length?(s.innerHTML="",d.value="",l.style.visibility="visible"):(l.style.visibility="hidden",s.innerHTML=p(e))}))})),d.addEventListener("keypress",(e=>{"Enter"===e.key&&(e.preventDefault(),o.click())})),c.addEventListener("click",(e=>{u+=1,v().then((e=>{u+=1,s.insertAdjacentHTML("beforeend",p(e))}))}));
//# sourceMappingURL=index.5dbf7a80.js.map
