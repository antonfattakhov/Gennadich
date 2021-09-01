// Динамический адаптив

class DynamicAdapt {
    constructor(type) {
      this.type = type;
    }
  
    init() {
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = [...document.querySelectorAll('[data-da]')];
  
      // наполнение оbjects объктами
      this.nodes.forEach((node) => {
        const data = node.dataset.da.trim();
        const dataArray = data.split(',');
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
      });
  
      this.arraySort(this.оbjects);
  
      // массив уникальных медиа-запросов
      this.mediaQueries = this.оbjects
        .map(({
          breakpoint
        }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
        .filter((item, index, self) => self.indexOf(item) === index);
  
      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      this.mediaQueries.forEach((media) => {
        const mediaSplit = media.split(',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];
  
        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = this.оbjects.filter(
          ({
            breakpoint
          }) => breakpoint === mediaBreakpoint
        );
        matchMedia.addEventListener('change', () => {
          this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      });
    }
  
    // Основная функция
    mediaHandler(matchMedia, оbjects) {
      if (matchMedia.matches) {
        оbjects.forEach((оbject) => {
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        });
      } else {
        оbjects.forEach(
          ({ parent, element, index }) => {
            if (element.classList.contains(this.daClassname)) {
              this.moveBack(parent, element, index);
            }
          }
        );
      }
    }
  
    // Функция перемещения
    moveTo(place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
        destination.append(element);
        return;
      }
      if (place === 'first') {
        destination.prepend(element);
        return;
      }
      destination.children[place].before(element);
    }
  
    // Функция возврата
    moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].before(element);
      } else {
        parent.append(element);
      }
    }
  
    // Функция получения индекса внутри родителя
    indexInParent(parent, element) {
      return [...parent.children].indexOf(element);
    }
  
    // Функция сортировки массива по breakpoint и place 
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    arraySort(arr) {
      if (this.type === 'min') {
        arr.sort((a, b) => {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }
            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }
            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }
            return a.place - b.place;
          }
          return a.breakpoint - b.breakpoint;
        });
      } else {
        arr.sort((a, b) => {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }
            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }
            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }
            return b.place - a.place;
          }
          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    }
  }

  const da = new DynamicAdapt("max");  
da.init();


// Бургер

let header = document.querySelector('.header');

(function () {
    
    const burger = document.querySelector('.burger-js');
    const menu = document.querySelector('.header__menu');
    // const menuCloseItem = document.querySelector('.header__nav__close');
    const menuLinks = document.querySelectorAll('.nav__link');
    
    function burgerClick () {
        menu.classList.toggle('header__menu_active');
        burger.classList.toggle('header__burger_active');
        if (burger.classList.contains('header__burger_active')) {
            hideScroll();
        } else {
            showScroll();
        }  
    };
   
    burger.addEventListener('click', burgerClick);
}());

// Анимация Inner-list - выпадающей шторки

(function () {
    let posX, posY;
    let hoverObject;
    const menuLinks = document.querySelectorAll('.nav__link');
    const innerList = document.querySelector('.header__inner-list');
    
    function innerListOpen (element) {
        
        if (innerList.classList.contains('header__inner-list-active') != true) {
            innerList.classList.add('header__inner-list-active');
            innerList.addEventListener('mouseleave', innerListClose);

            hoverObject = element.getBoundingClientRect();
            
            document.addEventListener('mousemove', mouseMove);
      } 
    }

    function mouseMove (event) {
        posX = event.clientX;
        posY = event.clientY;
        
        if (hoverObject.top - 2 > posY || hoverObject.left - 2 > posX || hoverObject.right < posX) {
            innerListClose();
        } else if (hoverObject.bottom < posY) {
            document.removeEventListener('mousemove', mouseMove);
        }
    }
    function innerListClose () {
        innerList.classList.remove('header__inner-list-active');
        innerList.removeEventListener('mouseleave', innerListClose);
        document.removeEventListener('mousemove', mouseMove);
    } 
    
    menuLinks.forEach((element, index, array) => {
      element.addEventListener('mouseover', function () {
        innerListOpen(element);
      });
    });
}());


// Создание скролла в Inner-list при малой высоте экрана

(function innerListHeight() {
    const innerList = document.querySelector('.header__inner-list');
    const breakpoint = window.matchMedia("(max-height: 600px)");

    if (breakpoint.matches === true) {
        innerList.style.height = `${window.innerHeight * 2 / 3}px`;
    }

    breakpoint.addEventListener('change', () => {
        if (breakpoint.matches) {
            innerList.style.height = `${window.innerHeight * 2 / 3}px`;
        } else {
            innerList.style.height = `auto`;
        }
    });
}());

// Отправка некоторых данных при переходе по ссылкам

(function () {
    const videoLinkLatinos = document.querySelector('.column-list__link_latinos-js');
    const videoLinkSportmaster = document.querySelector('.column-list__link_sportmaster-js');
    const videoLinkGuys = document.querySelector('.column-list__link_guys-js');
    const videoLinkWay = document.querySelector('.column-list__link_way-js');
    const videoLinkPhotos = document.querySelector('.column-list__link_photos-js');

    videoLinkLatinos.onclick = function () {
        localStorage.setItem("a", "latinos");
    };

    videoLinkSportmaster.onclick = function () {
        localStorage.setItem("a", "sportmaster");
    };

    videoLinkGuys.onclick = function () {
        localStorage.setItem("a", "guys");
    };

    videoLinkWay.onclick = function () {
        localStorage.setItem("a", "way");
    };

    videoLinkPhotos.onclick = function () {
        localStorage.setItem("a", "photos");
    };
}());


// Открытие окна Логин

const login = document.querySelector('.site-options__item_registr');
const formLogin = document.querySelector('.login');
const form = document.querySelector('.login__wrapper');

form.onclick = function (event) {
    event.stopPropagation();
}

login.addEventListener('click', () => {
    formLogin.classList.add('login_active');
    hideScroll();

    
    formLogin.addEventListener('click', () => {
        formLogin.classList.remove('login_active');
        showScroll();
    });

    
});

// Скрытие/Показ скролла

function hideScroll () {
    
    const getScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    header.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.overflowY = 'hidden';
    document.body.addEventListener('touchmove', hideforIOS, { passive: false });
    window.addEventListener('keydown', pressEsc);
} 

function hideforIOS (event) {
    event.preventDefault();
}

function showScroll (event) {

    header.style.paddingRight = '';
    document.body.style.paddingRight = '';
    document.body.style.overflowY = 'visible';
    document.body.removeEventListener('touchmove', hideforIOS);
    window.removeEventListener('keydown', pressEsc);
}

function pressEsc (event) {
        if (event.keyCode == 27) {
            formLogin.classList.remove('login_active');
            showScroll();
        }
};


// Валидация формы

(function () {

    let regName = /^[a-zA-Z0-9]+$/;

    const submitBtn = document.querySelector('.form__button');

    submitBtn.addEventListener('click', submit);

    function submit (event) {
        let field1 = document.querySelector('#user-name');
        let field2 = document.querySelector('#user-password');
        let form = document.querySelector('.form');
        event.preventDefault();

        const userName = field1.value;
        const userPhone = field2.value;
        
        sendData(checkName(regName, userName), checkPhone(regName, userPhone));

        function checkName (regName, userName) {
            if (!regName.test(userName)) {
                field1.style.backgroundColor = 'rgba(236, 53, 53, 0.4)';
                field1.value = '';
                field1.placeholder = 'Используй цифры или латиницу';
                return false;
            } else {
                return true;
            }
        }
        function checkPhone (regName, userPhone) {
            if (!regName.test(userPhone)) {
                field2.style.backgroundColor = 'rgba(236, 53, 53, 0.4)';
                field2.placeholder = 'Используй цифры или латиницу';
                return false;
            } else {
                return true;
            }
        }
        function wait() {
            return new Promise(resolve => setTimeout(resolve, 3000));
        }
        async function sendData (a, b) {
            if (a && b) {
                // Отправка формы
                document.querySelector('.login__sending').style.display = 'block';
                await wait();
                document.querySelector('.login__sending').style.display = 'none';
                formLogin.classList.remove('login_active');
                showScroll();

                form.reset();              
                
                field1.style.backgroundColor = 'white';
                field2.style.backgroundColor = 'white';
            } else {
                // Возникла ошибка
            }
        }
    }
}());

// Поиск на странице

(function () {
    const searchIcon = document.querySelector('.site-options__item_search .site-options__button');
    const searchForm = document.querySelector('.site-options__input');
    let numberOfClicks = 0;
    let regInput;
    let regObj = new RegExp(regInput, 'i');
    let counter = 0;
    let doubleCounter;
    let foundElements = [];
    
    searchIcon.addEventListener('click', () => {
        searchForm.classList.add('site-options__input_active');
        searchForm.addEventListener('focus', () => {window.addEventListener('keydown', pressEnter)});
        numberOfClicks += 1;
        if (numberOfClicks > 1) {
            searchText();
        }
    
        function pressEnter (event) {
            if (event.keyCode == 13) {
                searchText();
            }
        };
    });
    
    function searchText () {
    
        const textItems = document.querySelectorAll('main h2, main h3, main h4, main p, main figcaption');
        let searchClosePopup = document.querySelector('.search-popup_close');
        let searchChoosePopup = document.querySelector('.search-popup_choose');
        let searchCloseBtn, searchChooseBtn;
        let a = 0;
    
        if (searchForm.value == '') {
            return false;
        }
        regInput = searchForm.value;
    
        regObj = new RegExp(regInput, 'i');
    
        doubleCounter = counter;
    
        textItems.forEach(function(element, index, arr) {
    
            if (element.innerHTML.search(regObj) != -1 && element.dataset.hide != 'yes') {
                foundElements.push(element);
                counter += 1;
            }
            
        });
    
        if (counter == doubleCounter) {
            // Вывести сообщение, что ничего не найдено
            searchClosePopup.classList.add('search-popup_active');
            searchCloseBtn = searchClosePopup.querySelector('.search-popup__button_close');
            searchCloseBtn.addEventListener('click', CloseSearch);
        } else {
            
            // Новый перебор по найденным совпадениям
            searchCloseBtn = searchChoosePopup.querySelector('.search-popup__button_close');
            searchChooseBtn = searchChoosePopup.querySelector('.search-popup__button_goahead');
            searchCloseBtn.addEventListener('click', CloseSearch);
            searchChooseBtn.addEventListener('click', ContinueSearch);
    
            ContinueSearch();
        }
    
        function ContinueSearch () {
            let textColor = '';
            // Проверка на первый и последующие вызовы
            if (a === 0) {
                searchChoosePopup.classList.add('search-popup_active');
                scrollTo(foundElements[a]);
                textColor = foundElements[a].style.color;
                foundElements[a].style.color = '#F00000';
                a += 1;
            } else if (a > 0 && a < foundElements.length) {
                foundElements[a - 1].style.color = textColor;
                scrollTo(foundElements[a]);
                textColor = foundElements[a].style.color;
                foundElements[a].style.color = '#F00000';
                a += 1;
            } else {
                foundElements[a - 1].style.color = textColor;
                textColor = '';
                a = 0;
                CloseSearch();
            }
        }
    
        function CloseSearch () {  
            if (counter != doubleCounter) {
                searchChooseBtn.removeEventListener('click', ContinueSearch);
                searchChoosePopup.classList.remove('search-popup_active');
                a = 0;
            } else {
                searchClosePopup.classList.remove('search-popup_active');    
            }
            searchCloseBtn.removeEventListener('click', CloseSearch);
            foundElements.splice(0, foundElements.length);
            counter = 0;
            doubleCounter = 0;
            searchForm.value = '';       
        }
    }
}());


// Плавный скролл

const smoothScroll = function (targetEl, duration) {
    let target;
    if (typeof targetEl === "object") {
        target = targetEl;
    } else {
        target = document.getElementById(targetEl);
    }
    
    let targetPosition = target.getBoundingClientRect().top - document.querySelector('.header').clientHeight - 12;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function(t,b,c,d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = function(currentTime){
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0,run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);

};

const scrollTo = function (data) {
    const currentTarget = data;
    smoothScroll(currentTarget, 1000);
};
