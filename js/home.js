// Анимация раскрытия карточек

(function() {
    const buttons = document.querySelectorAll('.main-button__container');

    let minipostContainers = Array.from(document.querySelectorAll('.main-section__mini-post-container')).map(function(element, index, arr) {return Array.from(element.querySelectorAll('.main-mini-post'))});
    console.log(minipostContainers);
    let filterContainers = [];
    // console.log(minipostArr);


    const breakpoint = window.matchMedia("(max-width: 550px)");

    // Определяет, сколько карточек показывать во время загрузки страницы
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

    // let arr1 = minipostContainers[0].filter(function (element, index, array) {
    //             return element.classList.contains('display-none') === true;
    //             });
    // let arr2 = minipostContainers[1].filter(function (element, index, array) {
    //     return element.classList.contains('display-none') === true;
    //     });
    console.log(filterContainers);
    breakpoint.addEventListener('change', () => {
        // Перезагрузка страницы, чтобы раскрытие карточек было адекватным
        location.reload();
    });

    
    let counter = 0;
    let indexOfFilterArr = 0;
    let maxHeight;

    function showMore (arr, event) {

    // Переменные-счетчики для раскрытия карточек по 2 или по 3 штуки
        
        let filterArr = arr;
        // filterArr = arr;
        let filterArr2;

        console.log(counter);

        // Проверка на окончание количества карточек
        if (counter < filterArr.length) {

            // Определяем какая ширина страницы
            if (breakpoint.matches) {
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
                    // Оба СетТаймаута для того, чтобы можно было расширять текст во время проверки. Более это ни к чему.
                    setTimeout(() => {
                        for (j = indexOfFilterArr - 2; j < counter; j++) {
                            filterArr[j].style.height = 'auto'; 
                        }
                    }, 500)
                }
                indexOfFilterArr += 2;
                if (counter === filterArr.length) {
                    event.target.innerHTML = 'Актуальное - Скрыть';
                }
                console.log(counter);
            } else {
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
                        // console.log(element.firstElementChild.offsetHeight);
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
                    // Оба СетТаймаута для того, чтобы можно было расширять текст во время проверки. Более это ни к чему.
                    setTimeout(() => {
                        for (j = indexOfFilterArr - 3; j < counter; j++) {
                            filterArr[j].style.height = 'auto';
                        }
                    }, 500)
                }
                indexOfFilterArr += 3;
                if (counter === filterArr.length) {
                    event.target.innerHTML = 'Актуальное - Скрыть';
                }
                console.log(counter);
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
                }, 0);
            });
            counter = 0;
            indexOfFilterArr = 0;
            event.target.innerHTML = 'Актуальное - Смотреть больше';
        }
    }

    let showforButton1 = showMore;
    let showforButton2 = showMore;
    let showforButton3 = showMore;

    buttons[0].addEventListener('click', (event) => {showforButton1(filterContainers[0], event)});
    buttons[1].addEventListener('click', (event) => {showforButton2(filterContainers[1], event)});
    buttons[2].addEventListener('click', (event) => {showforButton3(filterContainers[2], event)});
}());







// Анимация раскрытия карточек. Версия для одного комплекта

// (function() {
//     const buttons = document.querySelectorAll('.main-button__container');
//     let minipostArr = Array.from(document.querySelectorAll('.main-mini-post'));
//     let filterArr;
//     let filterArr2;

//     const breakpoint = window.matchMedia("(max-width: 550px)");

//     // Определяет, сколько карточек показывать во время загрузки страницы
//     if (breakpoint.matches) {
//         for (let i = 0; i < 2; i++) {
//             minipostArr[i].classList.remove('display-none');
//         }
//     } else {
//         for (let i = 0; i < 3; i++) {
//             minipostArr[i].classList.remove('display-none');
//         }
//     }

//     filterArr = minipostArr.filter(function (element, index, array) {
//         return element.classList.contains('display-none') === true;
//     });

//     breakpoint.addEventListener('change', () => {
//         // Перезагрузка страницы, чтобы раскрытие карточек было адекватным
//         location.reload();
//     });

//     // Переменные-счетчики для раскрытия карточек по 2 или по 3 штуки
//     let counter = 0;
//     let indexOfFilterArr = 0;
//     let maxHeight;


//     function showMore () {

//         // Проверка на окончание количества карточек
//         if (counter < filterArr.length) {

//             // Определяем какая ширина страницы
//             if (breakpoint.matches) {
//                 counter += 2;

//                 // Фильтруем массив 2ой раз для сравнения высот только появляющихся карточек
//                 filterArr2 = filterArr.filter(function(element, index, arr) {
//                     if (indexOfFilterArr <= index && index < counter) {
//                         console.log(element.firstElementChild.offsetHeight);
//                     return element; 
//                     }  
//                 })
//                 // Определяем наибольшую высоту, на которую раскроются карточки
//                 maxHeight = filterArr2.reduce(function (acc, element) {
//                     if (acc < element.firstElementChild.offsetHeight) {
//                         acc = element.firstElementChild.offsetHeight;
//                     }
//                     return acc;
//                 }, 0)

//                 // Раскрытие карточек
//                 for (i = indexOfFilterArr; i < counter; i++) {
//                     filterArr[i].style.height = maxHeight + 'px';
//                     filterArr[i].style.border = 2 + 'px';
//                     filterArr[i].style.marginBottom = 25 + 'px';
//                     filterArr[i].style.pointerEvents = 'unset';
//                     filterArr[i].firstElementChild.style.height = 100 + '%';
//                     console.log(filterArr[i]);
//                     // Оба СетТаймаута для того, чтобы можно было расширять текст во время проверки. Более это ни к чему.
//                     setTimeout(() => {
//                         for (j = indexOfFilterArr - 2; j < counter; j++) {
//                             filterArr[j].style.height = 'auto'; 
//                         }
//                     }, 500)
//                 }
//                 indexOfFilterArr += 2;
//                 if (counter === filterArr.length) {
//                     button.innerHTML = 'Актуальное - Скрыть';
//                 }
//             } else {
//                 counter += 3;

//                 // Фильтруем массив 2ой раз для сравнения высот только появляющихся карточек
//                 filterArr2 = filterArr.filter(function(element, index, arr) {
//                     if (indexOfFilterArr <= index && index < counter) {
//                         console.log(element.firstElementChild.offsetHeight);
//                     return element; 
//                     }  
//                 })
//                 maxHeight = filterArr2.reduce(function (acc, element) {
//                     if (acc < element.firstElementChild.offsetHeight) {
//                         acc = element.firstElementChild.offsetHeight;
//                         // console.log(element.firstElementChild.offsetHeight);
//                     }
//                     return acc;
//                 }, 0)

//                 for (i = indexOfFilterArr; i < counter; i++) {
//                     filterArr[i].style.height = maxHeight + 'px';
//                     filterArr[i].style.border = 2 + 'px';
//                     filterArr[i].style.marginBottom = 25 + 'px';
//                     filterArr[i].style.pointerEvents = 'unset';
//                     filterArr[i].firstElementChild.style.height = 100 + '%';
//                     console.log(filterArr[i]);
//                     // Оба СетТаймаута для того, чтобы можно было расширять текст во время проверки. Более это ни к чему.
//                     setTimeout(() => {
//                         for (j = indexOfFilterArr - 3; j < counter; j++) {
//                             filterArr[j].style.height = 'auto';
//                         }
//                     }, 500)
//                 }
//                 indexOfFilterArr += 3;
//                 if (counter === filterArr.length) {
//                     button.innerHTML = 'Актуальное - Скрыть';
//                 }
//             }
//         }
//         // Закрытие всех открытых карточек
//         else {
//             filterArr.forEach(function (element, index, array) {
//                 element.style.height = maxHeight + 'px';
//                 setTimeout(() => {
//                     element.style.height = 0 + 'px';
//                     element.style.border = 0;
//                     element.style.marginBottom = 0;
//                     element.style.pointerEvents = 'none';
//                     element.firstElementChild.style.height = 'unset'; 
//                 }, 0);
//             });
//             counter = 0;
//             indexOfFilterArr = 0;
//             button.innerHTML = 'Актуальное - Смотреть больше';
//         }
//     }

//     buttons.forEach(function(element, index, arr) {element.addEventListener('click', showMore)});
// }());