document.addEventListener('DOMContentLoaded', () => {
    let modalSate = {};
    
    // Функция для переключения меню бургера
    const toggleBurgerMenu = () => {
        const header = document.querySelector('.header');
        const body = document.querySelector('body');

        header.classList.toggle('active');
        body.classList.toggle('lock');
    };

    // Функция для добавления класса .scrolled при прокрутке
    const handleScroll = () => {
        const header = document.querySelector("header");
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    // Функция для проверки, является ли устройство сенсорным
    const isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    };

    // Функция для добавления/удаления класса .hover при касании
    const handleTouchHover = (selector) => {
        const cardsItems = document.querySelectorAll(selector);

        if (isTouchDevice()) {
            cardsItems.forEach((item) => {
                item.addEventListener('click', () => {
                    item.classList.toggle('hover');
                });
            });
        }
    };

    // Функция для добавления класса .show и настройки translateY для .circle__subtext при наведении
    const handleCircleSubtext = () => {
        const circleItems = document.querySelectorAll('.circle__item');

        circleItems.forEach((circleItem) => {
            if (isTouchDevice()) {
                circleItem.addEventListener('click', () => {
                    const subtext = circleItem.closest('.circle__content').querySelector('.circle__subtext');

                    if (subtext) {
                        const isTopSubtext = subtext.classList.contains('circle__subtext_top');
                        isTopSubtext ? subtext.classList.toggle('show_top') : subtext.classList.toggle('show_bottom');
                    }
                });
            } else {
                circleItem.addEventListener('mouseover', () => {
                    const subtext = circleItem.closest('.circle__content').querySelector('.circle__subtext');

                    if (subtext) {
                        const isTopSubtext = subtext.classList.contains('circle__subtext_top');
                        isTopSubtext ? subtext.classList.add('show_top') : subtext.classList.add('show_bottom');
                    }
                });

                circleItem.addEventListener('mouseout', () => {
                    const subtext = circleItem.closest('.circle__content').querySelector('.circle__subtext');

                    if (subtext) {
                        subtext.classList.remove('show_top', 'show_bottom');
                    }
                });
            }
        });
    };

    // Функция для проверки ширины экрана и изменения классов элементов
    const changeDirectionSubText = (selector, remove, add) => {
        const screenWidth = window.innerWidth;
        const circleSubText = document.querySelector(selector);

        if (screenWidth < 1200) {
            circleSubText.classList.remove(remove);
            circleSubText.classList.add(add);
        } else {
            circleSubText.classList.remove(add);
            circleSubText.classList.add(remove);
        }
    };

    // Вызываем функцию при загрузке страницы и при изменении размера окна
    window.addEventListener('load', () => {
        changeDirectionSubText('.circle__content:nth-child(2) > .circle__subtext', 'circle__subtext_bottom', 'circle__subtext_top');
        changeDirectionSubText('.circle__content:nth-child(3) > .circle__subtext', 'circle__subtext_top', 'circle__subtext_bottom');
    });

    // Функция для открытия модального окна
    const openPopup = () => {
        const popup = document.querySelector('.popup');
        const popupBody = document.querySelector('.popup__body');
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Добавляем блокировку скролла страницы
        popupBody.classList.remove('popup-fade-out');
        popupBody.classList.add('popup-fade-in');
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
    };

    // Функция для закрытия модального окна
    const closePopup = () => {
        const popup = document.querySelector('.popup');
        const popupBody = document.querySelector('.popup__body');
        popupBody.classList.remove('popup-fade-in');
        popupBody.classList.add('popup-fade-out');

        setTimeout(() => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.marginRight = '0px' // Восстанавливаем скролл страницы
        }, 300);
    };

    // Функция для инициализации модального окна
    const initializePopup = () => {
        const openPopupButtons = document.querySelectorAll('.btn-contact');
        const closePopupButton = document.querySelector('.popup__close');
        const popup = document.querySelector('.popup');
        const popupBody = document.querySelector('.popup__body');

        // Открываем модальное окно при клике на кнопку
        openPopupButtons.forEach((button) => {
            button.addEventListener('click', openPopup);
        });

        // Закрываем модальное окно при клике на кнопку закрытия
        closePopupButton.addEventListener('click', closePopup);

        // Закрываем модальное окно при клике вне него
        popup.addEventListener('click', (event) => {
            if (event.target === popup || event.target === popupBody) {
                closePopup();
            }
        });

        // Отключаем закрытие модального окна при клике внутри него
        popupBody.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    };

    // Инициализируем модальное окно
    initializePopup();

    const smoothScrollToAnchors = () => {
        const anchors = document.querySelectorAll('a[href*="#"]');
      
        anchors.forEach(anchor => {
          anchor.addEventListener('click', (e) => {
            e.preventDefault();
      
            // Закрыть меню бургера, если оно открыто
            const header = document.querySelector('.header');
            if (header.classList.contains('active')) {
              toggleBurgerMenu();
            }
      
            const blockID = anchor.getAttribute('href').substr(1);
      
            document.getElementById(blockID).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          });
        });
      };
    

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflowY = 'scroll'
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    const forms = (state) => {
        const form = document.querySelectorAll('form'),
              inputs = document.querySelectorAll('input'),
              textarea = document.querySelectorAll('textarea');

        const message = {
            loading: 'Loading...',
            success: 'Thank you! We will contact you soon',
            failure: 'Something went wrong...'
        };
    
        const postData = async (url, data) => {
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
    
            return await res.text();
        };
    
        const clearInputs = () => {
            inputs.forEach(item => {
                let atribute = item.getAttribute('type');
                
                if (atribute !== 'submit') {
                    item.value = '';
                }
            });

            textarea.forEach(item => {
                item.value = '';
            });
        };
    
        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);
    
                const formData = new FormData(item);
                if (item.getAttribute('data-calc') === "end") {
                    for (let key in state) {
                        formData.append(key, state[key]);
                    }
                }
    
                postData('server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
        });
    };


    // Вызываем функции
    document.querySelector('.header__burger').addEventListener('click', toggleBurgerMenu);
    window.addEventListener("scroll", handleScroll);
    handleTouchHover('.cards__item');
    handleTouchHover('.circle__item');
    handleCircleSubtext();
    smoothScrollToAnchors();
    forms(modalSate);

     // Функция для добавления класса "anim-active" при скролле
  function animateOnScroll() {
    const elements = document.querySelectorAll('.anim-left, .anim-right, .anim-down, .anim-show');
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      if (elementPosition.top < screenHeight) {
        element.classList.add('anim-active');
      }
    });

    // Удалите обработчик события прокрутки после того, как все элементы анимированы
    if (document.querySelectorAll('.anim-left.anim-active, .anim-right.anim-active, .anim-down.anim-active, .anim-show.anim-active').length === elements.length) {
      window.removeEventListener('scroll', animateOnScroll);
    }
  }

  // Добавление класса "anim-active" для элементов, которые видимы при загрузке страницы
  window.addEventListener('load', () => {
    const elementsOnLoad = document.querySelectorAll('.anim-load');
    elementsOnLoad.forEach((element) => {
      element.classList.add('anim-active');
    });

    // Скрыть прелоадер сразу после загрузки страницы
    const preloader = document.getElementById('page-preloader');
    if (preloader) {
      
    setTimeout(() => {
        preloader.classList.add('done');
    }, 2000);

      // Анимировать элементы с классом "anim-after-preload" после скрытия прелоадера
    setTimeout(() => {
        const elementsAfterPreload = document.querySelectorAll('.anim-after-preload');
        elementsAfterPreload.forEach((element) => {
          element.classList.add('anim-active');
        });
    },2000);

      // Добавить обработчик события прокрутки только после скрытия прелоадера
      window.addEventListener('scroll', animateOnScroll);
    }
  });
});