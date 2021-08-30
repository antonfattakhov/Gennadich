// Youtube API

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var players = [];

function onYouTubeIframeAPIReady() {
    players[0] = new YT.Player('player1', {
        playerVars: { 'autoplay': 0, 'controls': 0 },
    });
    players[1] = new YT.Player('player2', {
        playerVars: { 'autoplay': 0, 'controls': 0 },
    });
    players[2] = new YT.Player('player3', {
        playerVars: { 'autoplay': 0, 'controls': 0 },
    });
}



setTimeout(() => {
    console.log('ready');
    players[0].cueVideoById({
        'videoId': 'ev9HbCnTd-4',
        'startSeconds': 252, 
        'suggestedQuality': 'large'
    });
    players[1].cueVideoById({
        'videoId': 'AVIWCY-aub8',
        'startSeconds': 278, 
        'suggestedQuality': 'large'
    });
    players[2].cueVideoById({
        'videoId': 'uIh5qXkgYHA',
        'startSeconds': 1065, 
        'suggestedQuality': 'large'
    });
}, 3000);    


// Плавный скролл в документе main.js


// Стартовое открытие страницы с учетом фильтра по ссылкам + Перемещение по странице к определенному месту

let trainingArr = document.querySelectorAll('.topic-training');
let matchesArr = document.querySelectorAll('.topic-match');

let data = localStorage.getItem("a");

if (data === "latinos" || data === "sportmaster") {

    trainingArr.forEach(function(element, index, arr) {
        element.style.display = 'none';
    });
    matchesArr.forEach(function(element, index, arr) {
        element.style.display = 'block';
    });

    scrollTo(data);
    localStorage.clear();

} else if (data === "guys") {

    matchesArr.forEach(function(element, index, arr) {
        element.style.display = 'none';
    });
    trainingArr.forEach(function(element, index, arr) {
        element.style.display = 'block';
    });

    scrollTo(data);
    localStorage.clear();

} else {

    matchesArr.forEach(function(element, index, arr) {
        element.style.display = 'none';
    });
    trainingArr.forEach(function(element, index, arr) {
        element.style.display = 'block';
    });
    
}

// Индикация пункта меню

(function () {

    let navArr = document.querySelectorAll('.nav__link');

    navArr[4].classList.add('nav__link_active');

}());

// Фильтр Тренировки-Игры

(function () {

    const training = document.querySelector('.button-train-js');
    const matches = document.querySelector('.button-matches-js');
    
    training.addEventListener('click', showTraining);
    matches.addEventListener('click', showMatches);

    if (trainingArr[0].style.display === 'block') {
        training.classList.add('top-nav__button-active');
    } else {
        matches.classList.add('top-nav__button-active');
    }

    function showTraining () {

        training.classList.add('top-nav__button-active');
        matches.classList.remove('top-nav__button-active');

        trainingArr.forEach(function (element, index, arr) {
            element.style.display = 'block';
        })
        matchesArr.forEach(function (element, index, arr) {
            element.style.display = 'none';
        });

            videotraining.pause();

    }

    function showMatches () {

        training.classList.remove('top-nav__button-active');
        matches.classList.add('top-nav__button-active');

        trainingArr.forEach(function (element, index, arr) {
            element.style.display = 'none';
        });
        matchesArr.forEach(function (element, index, arr) {
            element.style.display = 'block';
        });

        videotraining.pause();

    }

}());


// Управление локальным видео

const arrowtraining = document.querySelector('.video-post__arrow');
const videotraining = document.querySelector('.video-post__item');

videotraining.addEventListener('click', () => {
    videotraining.nextElementSibling.classList.remove('video-post__arrow');
    videotraining.setAttribute('controls', '');
})



videotraining.addEventListener('pause', () => {
    videotraining.nextElementSibling.classList.add('video-post__arrow');
})



videotraining.addEventListener('play', () => {
    videotraining.nextElementSibling.classList.remove('video-post__arrow');
})


arrowtraining.addEventListener('click', (event) => {
    arrowtraining.classList.remove('video-post__arrow');
    arrowtraining.previousElementSibling.play();
})


// Управление видео с Ютуба

const videoPostersMatches = document.querySelectorAll('.video-post__wrap_matches');
const videomatches = document.querySelectorAll('.video-post__frame-window');

videoPostersMatches.forEach(function (element, index, arr) {
    element.addEventListener('click', () => {
        videomatches[index].style.display = 'flex';
        players[index].playVideo();
        
        videomatches[index].addEventListener('click', () => {
            videomatches[index].style.display = 'none';
            players[index].stopVideo();
        });
    })
});
