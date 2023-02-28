const select = document.getElementById("genres")
const title = document.getElementById("title")
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const slides = document.getElementById("slides")
const slidesWeek = document.getElementById("slides-week")
const btnRight = document.getElementById("plus")
const btnLeft = document.getElementById("minus")
const btnRightWeek = document.getElementById("plus-week")
const btnLeftWeek = document.getElementById("minus-week")
const trending = document.getElementById("trending")
const navTitle = document.getElementById("nav-title")
const nav = document.getElementById("nav")
const mybutton = document.getElementById("up");




// change today's trending films info then click button
fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=4465e3d8612846e034e164849da737a0").then(response=>response.json()).then(data=>getDatas(data))

const getDatas =(data)=>{
  let number = 0

 showFilms()

  btnLeft.addEventListener('click', () =>{
  
      number++;
      if(number> data.results.length - 1){
          number = 0;
      }
    showFilms()
  
  })
  btnRight.addEventListener('click', () =>{
     number--;
  
     if(number < 0){
      number = data.results.length -1;
     }
  
  showFilms()
  
  })
  function showFilms(){
    slides.innerHTML=`<div class="trending-card" >
    <div class="trending-box">
    <img src="${IMGPATH}${data.results[number].backdrop_path}" class="trending-img" >
   <div class="trending-info">
   <p class="trending-description">${data.results[number].overview}</p>
   </div>
    </div>
    <div class="trending-card-text" >
    ${data.results[number].name?`<h3 class="trending-card-title">${data.results[number].name}</h3>` : `<h3 class="trending-card-title">${data.results[number].title}</h3>`}
    <span class="trending-card-vote"><i class="fa-solid fa-star"></i>${data.results[number].vote_average}</span>
    </div>
    </div>
    `
}
}
// change today's trending films info then click button end

// change this week trending films info then click button
fetch("https://api.themoviedb.org/3/trending/all/week?api_key=4465e3d8612846e034e164849da737a0").then(response=>response.json()).then(data=>getDatass(data))

const getDatass =(data)=>{
  let number = 0

 showFilms()

  btnLeftWeek.addEventListener('click', () =>{
  
      number++;
      if(number> data.results.length - 1){
          number = 0;
      }
    showFilms()
  
  })
  btnRightWeek.addEventListener('click', () =>{
     number--;
  
     if(number < 0){
      number = data.results.length -1;
     }
  
  showFilms()
  
  })
  function showFilms(){
    slidesWeek.innerHTML=`<div class="trending-card" >
    <div class="trending-box">
    <img src="${IMGPATH}${data.results[number].backdrop_path}" class="trending-img" >
   <div class="trending-info">
   <p class="trending-description">${data.results[number].overview}</p>
   </div>
    </div>
    <div class="trending-card-text" >
    ${data.results[number].name?`<h3 class="trending-card-title">${data.results[number].name}</h3>` : `<h3 class="trending-card-title">${data.results[number].title}</h3>`}
    <span class="trending-card-vote"><i class="fa-solid fa-star"></i>${data.results[number].vote_average}</span>
    </div>
    </div>`
}
}
// change this week trending films info then click button end

// show random movies 

fetch("https://api.themoviedb.org/3/discover/movie?api_key=4465e3d8612846e034e164849da737a0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate").then(response=>response.json()).then(data=>getsData(data))

const getsData = (data)=>{
 
  title.innerHTML = "";
  data.results.forEach(element => {
  
    title.innerHTML += `  
    <div class="card" >
    <div class="box">
    <img src="${IMGPATH}${element.backdrop_path}" class="img" >
   <div class="info">
   <p class="description">${element.overview}</p>
   </div>
    </div>
    <h3 class="card-title">${element.title}</h3>
    
    
    <div class="card-text" >
    <p>People vote: ${element.vote_count}</p>
    <span class="vote"><i class="fa-solid fa-star"></i>${element.vote_average}</span>
    </div>
    <p class="data">Realese date: ${element.release_date}</p>
    </div>
    `

  });

}
// show random movies end

// get movies genres 

fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=4465e3d8612846e034e164849da737a0&language=en-US").then(response =>response.json()).then(data => getData(data))

const getData = (data)=>{
   let html="";

   for (i = 0; i < data.genres.length; i++) {
    html += `
    <option value="${data.genres[i].id}">${data.genres[i].name}</option>`
  }
  select.innerHTML = `<option value="select">GENRES</option> ${html}`;


}
//  show movies by genres then button is click

select.addEventListener("click",(e)=>{
    
 
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4465e3d8612846e034e164849da737a0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${e.target.value}&with_watch_monetization_types=flatrate`).then(response => response.json()).then(data => getData(data))
  
  const getData = (data)=>{
   
    title.innerHTML = "";
    data.results.forEach(element => {
    
      title.innerHTML += `  
      <div class="card" >
      <div class="box">
      ${element.backdrop_path ? `<img src="${IMGPATH}${element.backdrop_path}" class="img" >` : ""}
     <div class="info">
     <p class="description">${element.overview}</p>
     </div>
      </div>
      <h3 class="card-title">${element.title}</h3>
      
      <div class="card-text" >
      <p>People vote: ${element.vote_count}</p>
      <span class="vote"><i class="fa-solid fa-star"></i>${element.vote_average}</span>
      </div>
      <p class="data">Realese date ${element.release_date}</p>
      </div>
      `
  
    });
  
  }
  trending.classList.add("none")
  
    })

    navTitle.addEventListener("click",()=>{
      trending.classList.remove("none")
    })



// When the user scrolls down 20px from the top of the document, show the button to top
window.addEventListener("scroll",()=>{
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
})

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click",()=>{
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
})
