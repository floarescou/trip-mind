"use strict";

window.onload = function () {

    // * NodeList.prototype.forEach() polyfill
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }
//=====     скролл к блокам страницы при нажатии на пункты меню
    const menuBtns = document.querySelectorAll('.menu__link');
    const blocksArray = [document.querySelector('.tours'), document.querySelector('.reviews')];

    for (let i = 0; i < menuBtns.length; i++) {
        if (i === 2) {
            continue;
        }
        menuBtns[i].addEventListener('click', function () {
            blocksArray[i].scrollIntoView({block: "center", behavior: "smooth"});
        });
    }


//=====     изменение даты на актуальную в блоке иконки видео-отчета и модальном окне
    let date = new Date;
    let currentYear = document.querySelectorAll('.current-year');

    currentYear.forEach((element) => {
        element.innerText = String(date.getFullYear() - 1) + '-' + String(date.getFullYear())
    });


//=====     открытие и закрытие модальных окон.
    const classicModalBackground = document.querySelectorAll(".classic-modal-bg");
    const classicModalClose = document.querySelectorAll(".classic-modal-close");
    const classicModalBtns = document.querySelectorAll(".classic-modal");
    const player = VK.VideoPlayer(document.querySelector('iframe'));
    player.mute();

    for (let i = 0; i < classicModalBtns.length; i++) {
        classicModalBtns[i].addEventListener('click', function () {
            classicModalBackground[i].classList.remove('none');
        });

        classicModalClose[i].addEventListener("click", function () {
            if (i === 2 || i === 1) {
                player.mute();
            }
            classicModalBackground[i].classList.add('none');
        });


        if (i === 2) {
            classicModalBackground[i].addEventListener('click', function () {
                classicModalBackground[i].classList.add('none');
            });
        }

    }

    //=====     модальное окно согласия на обработку персональных данных
    const personalModalBackground = document.querySelector(".modal-personalData-bg");
    const personalModalClose = document.querySelector(".modal-personalData-close");
    const personalModalBtns = document.querySelectorAll(".personalData-btn");

    for (let i = 0; i < personalModalBtns.length; i++) {
        personalModalBtns[i].addEventListener('click', function () {
            personalModalBackground.classList.remove('none');
        });

        personalModalClose.addEventListener("click", function () {
            personalModalBackground.classList.add('none');
        });

    }

//=====     модальное окно для главного отзыва
    const reviewModalBackground = document.querySelector(".review-modal-bg");
    const reviewModalClose = document.querySelector(".review-modal-close");
    const reviewModalBtn = document.querySelector(".reviews__block-image");

    reviewModalBtn.addEventListener('click', function () {
        reviewModalBackground.classList.remove('none');
    });

    reviewModalClose.addEventListener("click", function () {
        reviewModalBackground.classList.add('none');
    });


//=====     маска для инпута телефона в форме
    $(".input-phone").mask("+7(999)999-99-99");

//=====     валидация формы
    const formSubmit = document.querySelector('.form-btn');
    const inputName = document.querySelectorAll('.input-name');

    inputName.forEach((item) => {
        item.onkeydown = (event) => {
            let num = parseInt(event.key);
            if (!isNaN(num) || event.key === ',' || event.key === '.' || event.key === '/' || event.key === ';') {
                return false;
            }
        };
    });

    const formBtns = document.querySelectorAll('.form-btn');
    const inputPhone = document.querySelectorAll('.input-phone');
    const modalSuccess = document.querySelector('.success-modal-bg');
    const modalSuccessClose = document.querySelector('.success-modal-close');
    const form = document.querySelectorAll('.form__body');

    for (let i = 0; i < formBtns.length; i++) {
        formBtns[i].addEventListener('click', function () {
            if (!inputName[i].value || inputName[i].value.length < 2) {
                inputName[i].style.borderColor = 'var(--accent-color)';
                return false;
            }
            if (inputPhone[i].value === '' || inputPhone[i].value === '+7(___)___-__-__') {
                inputPhone[i].style.borderColor = 'var(--accent-color)';
                return false;
            }
            else {
                inputPhone[i].style.borderColor = '#CED8DF';
                inputName[i].style.borderColor = '#CED8DF';
                modalSuccess.classList.remove('none');
                form[i].reset();
            }
        })
    }
    modalSuccessClose.addEventListener("click", function () {
        modalSuccess.classList.add('none');
    });


    //  появление/исчезновение сайдбара на мобильной/планшет версии при нажатии на кнопку бургер меню
    const sidebarToggleBtn = document.querySelector('.menu-icon-wrapper');
    const menuIcon = document.querySelector('.menu-icon');
    const menuAdaptive = document.querySelector('.menu-adaptive-list');
    const toggleMenu = document.querySelector('.toggle-menu');

    sidebarToggleBtn.onclick = function () {
        menuIcon.classList.toggle('menu-icon-active');
        menuAdaptive.classList.toggle('none');
        toggleMenu.classList.toggle('toggle-menu-fixed');
    };
};