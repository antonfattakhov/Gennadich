// Скрытие стрелки видео

const arrows = document.querySelectorAll('.video-post__arrow');
const videos = document.querySelectorAll('.video-post__item');


videos.forEach(function(element, index, arr) {
    element.addEventListener('click', () => {
    element.nextElementSibling.classList.remove('video-post__arrow');
    element.setAttribute('controls', '');
    })
});

videos.forEach(function(element, index, arr) {
    element.addEventListener('pause', () => {
    element.nextElementSibling.classList.add('video-post__arrow');
    })
});

videos.forEach(function(element, index, arr) {
    element.addEventListener('play', () => {
    element.nextElementSibling.classList.remove('video-post__arrow');
    })
});

arrows.forEach(function(element, index, arr) {
    element.addEventListener('click', () => {
    element.classList.remove('video-post__arrow');
    element.previousElementSibling.play();
    })
});


// Фильтр Тренировки-Игры

(function () {

    const training = document.querySelector('.button-train-js');
    const matches = document.querySelector('.button-matches-js');

    let trainingArr = document.querySelectorAll('.topic-training');
    let matchesArr = document.querySelectorAll('.topic-match');

    matchesArr.forEach(function(element, index, arr) {
        element.style.display = 'none';
    });

    function showTraining () {

        training.classList.add('top-nav__button-active');
        matches.classList.remove('top-nav__button-active');

        trainingArr.forEach(function (element, index, arr) {
            element.style.display = 'block';
        })
        matchesArr.forEach(function (element, index, arr) {
            element.style.display = 'none';
        });

        videos.forEach(function(element, index, arr) {
            element.pause();
        });

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

        videos.forEach(function(element, index, arr) {
            element.pause();
        });
        
    }

    training.addEventListener('click', showTraining);
    matches.addEventListener('click', showMatches);

}());