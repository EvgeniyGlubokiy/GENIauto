// function ibg() {

//    let ibg = document.querySelectorAll(".ibg");
//    for (var i = 0; i < ibg.length; i++) {
//       if (ibg[i].querySelector('img')) {
//          ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
//       }
//    }
// }

// ibg();

//======================= POPUP

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup_content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}

function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnlock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
      }
   }
   body.classList.add('_lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnlock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
   }, timeout);
   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

//burger menu====================================


$('.icon-menu').click(function (event) {
   $(this).toggleClass('active');
   $('.menu__body').toggleClass('active');
   $('body').toggleClass('_lock');
   $('.header__contact').toggleClass('_none');
   $('.header__logo',).toggleClass('flex');
   $('.header__menu').toggleClass('flex');
   $('.header').toggleClass('active');
});
$('.menu__link').click(function (event) {
   $('.menu__body').removeClass('active');
   $('body').removeClass('_lock');
   $('.header__contact').removeClass('_none');
   $('.header__logo',).removeClass('flex');
   $('.icon-menu').removeClass('active');
   $('.header__menu').removeClass('flex');
});

//========================================




//accordeon====================
$(document).ready(function () {
   $('.content').click(function () {
      $(this).toggleClass('accordeon__active').next().slideToggle(300);
   });
});



let data = Array.from(document.querySelectorAll('.card-block .auto-card')),
   step = 4,
   item = 0;

data.slice(step).forEach(e => e.style.display = 'none');
item += step;

document.querySelector('#more').addEventListener('click', function (e) {
   let tmp = data.slice(item, item + step);
   tmp.forEach(e => e.style.display = 'block');
   item += step;

   if (tmp.length < 4)
      this.remove();
});

//==========================================

//swing================================
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__row').offsetHeight;

         // if (iconMenu.classList.contains('_active')) {
         //    document.body.classList.remove('_lock');
         //    iconMenu.classList.remove('_active');
         //    menuBody.classList.remove('_active');
         // }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}

//=====================================