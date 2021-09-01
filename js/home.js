// Стартовый экран

(function () {
    document.addEventListener("DOMContentLoaded", () => setTimeout(startScreen, 4000));
    hideScroll();

    const screen = document.querySelector('.start-screen');

    screen.addEventListener('click', (event) => {
        event.stopPropagation();
        screen.style.display = 'none';
        startScreen();
    });

    function startScreen () {
        screen.classList.add('start-screen_active');
        showScroll();
    }
}());


// Анимация раскрытия карточек

(function() {
    const buttons = document.querySelectorAll('.main-button__container');

    let minipostContainers = Array.from(document.querySelectorAll('.main-section__mini-post-container')).map(function(element, index, arr) {return Array.from(element.querySelectorAll('.main-mini-post'))});
    let filterContainers = [];

    // Определяет, сколько карточек показывать во время загрузки страницы
    const breakpoint = window.matchMedia("(max-width: 550px)");
    
    if (breakpoint.matches) {
        minipostContainers.forEach(function (element, index, arr) {
            for (let i = 0; i < 2; i++) {
                element[i].classList.remove('display-none');
                }
        })
    }    
    else {
        minipostContainers.forEach(function (element, index, arr) {
            for (let i = 0; i < 3; i++) {
                element[i].classList.remove('display-none');
                }
        })
    }

    minipostContainers.forEach(function (element, index, arr) {

       filterContainers[index] = element.filter(function (element, index, array) {
            return element.classList.contains('display-none') === true;
        })

    })

    breakpoint.addEventListener('change', () => {
        // Перезагрузка страницы, чтобы раскрытие карточек было адекватным(только для проверок при resize)
        location.reload();
    });

    
    let counter = 0;
    let indexOfFilterArr = 0;
    let maxHeight;

    function showMore (arr, event) {

        // Переменные-счетчики для раскрытия карточек по 2 или по 3 штуки
        let filterArr = arr;
        let filterArr2;

        // Проверка на окончание количества карточек
        if (counter < filterArr.length) {

            // Определяем какая ширина страницы
            if (breakpoint.matches) {
                
                // Работаем с карточками по 2 штуки
                counter += 2;

                // Фильтруем массив 2ой раз для сравнения высот только появляющихся карточек
                filterArr2 = filterArr.filter(function(element, index, arr) {
                    if (indexOfFilterArr <= index && index < counter) {
                        console.log(element.firstElementChild.offsetHeight);
                    return element; 
                    }  
                })
                // Определяем наибольшую высоту, на которую раскроются карточки
                maxHeight = filterArr2.reduce(function (acc, element) {
                    if (acc < element.firstElementChild.offsetHeight) {
                        acc = element.firstElementChild.offsetHeight;
                    }
                    return acc;
                }, 0)

                // Раскрытие карточек
                for (i = indexOfFilterArr; i < counter; i++) {
                    filterArr[i].style.height = maxHeight + 'px';
                    filterArr[i].style.border = 2 + 'px';
                    filterArr[i].style.marginBottom = 25 + 'px';
                    filterArr[i].style.pointerEvents = 'unset';
                    filterArr[i].firstElementChild.style.height = 100 + '%';
                    console.log(filterArr[i]);

                    // Изменяем значение атрибута data, который влияет на поиск по странице
                    filterArr[i].querySelectorAll('h2, h3, h4, p, figcaption').forEach(function(element) {element.dataset.hide = 'no'});

                    // Оба СетТаймаута для того, чтобы можно было расширять текст во время проверки. Более это ни к чему.
                    setTimeout(() => {
                        for (j = indexOfFilterArr - 2; j < counter; j++) {
                            filterArr[j].style.height = 'auto'; 
                        }
                    }, 500)
                }
                indexOfFilterArr += 2;
                if (counter === filterArr.length) {
                    if (event.target.tagName == 'SPAN') {
                        event.target.innerHTML = 'Скрыть';
                    } else {
                        event.target.firstElementChild.innerHTML = 'Скрыть';
                    }  
                }
                console.log(counter);
            } else {
                
                // Работаем с карточками по 3 штуки
                counter += 3;

                // Фильтруем массив 2ой раз для сравнения высот только появляющихся карточек
                filterArr2 = filterArr.filter(function(element, index, arr) {
                    if (indexOfFilterArr <= index && index < counter) {
                        console.log(element.firstElementChild.offsetHeight);
                    return element; 
                    }  
                })
                maxHeight = filterArr2.reduce(function (acc, element) {
                    if (acc < element.firstElementChild.offsetHeight) {
                        acc = element.firstElementChild.offsetHeight;
                    }
                    return acc;
                }, 0)

                for (i = indexOfFilterArr; i < counter; i++) {
                    filterArr[i].style.height = maxHeight + 'px';
                    filterArr[i].style.border = 2 + 'px';
                    filterArr[i].style.marginBottom = 25 + 'px';
                    filterArr[i].style.pointerEvents = 'unset';
                    filterArr[i].firstElementChild.style.height = 100 + '%';
                    console.log(filterArr[i]);

                    // Изменяем значение атрибута data, который влияет на поиск по странице
                    filterArr[i].querySelectorAll('h2, h3, h4, p, figcaption').forEach(function(element) {element.dataset.hide = 'no'});

                    // Оба СетТаймаута для того, чтобы можно было расширять текст во время проверки. Более это ни к чему.
                    setTimeout(() => {
                        for (j = indexOfFilterArr - 3; j < counter; j++) {
                            filterArr[j].style.height = 'auto';
                        }
                    }, 500)
                }
                indexOfFilterArr += 3;
                if (counter === filterArr.length) {
                    if (event.target.tagName == 'SPAN') {
                        event.target.innerHTML = 'Скрыть';
                    } else {
                        event.target.firstElementChild.innerHTML = 'Скрыть';
                    } 
                }
            }
        }
        
        // Закрытие всех открытых карточек
        else {
            filterArr.forEach(function (element, index, array) {
                element.style.height = maxHeight + 'px';
                setTimeout(() => {
                    element.style.height = 0 + 'px';
                    element.style.border = 0;
                    element.style.marginBottom = 0;
                    element.style.pointerEvents = 'none';
                    element.firstElementChild.style.height = 'unset';

                    // Изменяем значение атрибута data, который влияет на поиск по странице
                    element.querySelectorAll('h2, h3, h4, p, figcaption').forEach(function(element) {element.dataset.hide = 'yes'});
                    
                }, 0);
            });
            counter = 0;
            indexOfFilterArr = 0;
            // event.target.innerHTML = 'Актуальное - Смотреть больше';
            if (event.target.tagName == 'SPAN') {
                event.target.innerHTML = 'Смотреть больше';
            } else {
                event.target.firstElementChild.innerHTML = 'Смотреть больше';
            }
        }
    }

    let showforButton1 = showMore;
    let showforButton2 = showMore;
    let showforButton3 = showMore;

    buttons[0].addEventListener('click', (event) => {showforButton1(filterContainers[0], event)});
    buttons[1].addEventListener('click', (event) => {showforButton2(filterContainers[1], event)});
    buttons[2].addEventListener('click', (event) => {showforButton3(filterContainers[2], event)});
}());


// Отправка некоторых данных при переходе по ссылкам

(function () {
    const videoPostLatinos = document.querySelector('.main-post__link_latinos-js');
    const videoPostSportmaster = document.querySelectorAll('.main-mini-post__link_sportmaster-js');
    const videoPostGuys = document.querySelectorAll('.main-mini-post__link_guys-js');

    videoPostLatinos.onclick = function () {
        localStorage.setItem("a", "latinos");
    };

    videoPostSportmaster.forEach(function(element, index, arr) {
        element.onclick = function () {localStorage.setItem("a", "sportmaster");}
    });

    videoPostGuys.forEach(function(element, index, arr) {
        element.onclick = function () {localStorage.setItem("a", "guys");}
    });
}());
