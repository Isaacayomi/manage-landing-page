"use strict";
const bodyEl = document.querySelector("body");
const hamburger = document.querySelector(".hamburger__icon");
const navLists = document.querySelector(".nav__lists");
const mainEl = document.querySelector("main");
const navItems = document.querySelectorAll(".nav__items");

// slider section
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
let maxSlide = slides.length - 1;

// Navbar
const openNav = () => {
  navLists.style.display = "block";
  bodyEl.classList.add("blur__background");
  hamburger.src = "./images/icon-close.svg";
};

const closeNav = () => {
  navLists.style.display = "none";
  bodyEl.classList.remove("blur__background");
  hamburger.src = "./images/icon-hamburger.svg";
};

const toggleNav = () => {
  navLists.style.display === "none" ? openNav() : closeNav();
};

// Email
const emailInput = document.querySelector(".input__email");
const submitBtn = document.querySelector(".submit");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class='dots__dot' data-slide = ${i}> </button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document.querySelectorAll(".dots__dot").forEach(function (dot) {
    dot.classList.remove("dots__dot--active");
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

slides.forEach(function (slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`;
});

const goToSlide = function (curImg) {
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - curImg)}%)`;
  });
};

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// Making the slide respond to a keyboard event
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

// Validate email
const ValidateEmail = () => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailInput.value.match(mailformat)) {
    alert("Please enter a correct mail");
  } else {
    alert("Updates has been sent to your inbox");
    emailInput.value = "";
  }
  return;
};

// Event listeners
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ValidateEmail();
});

emailInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") ValidateEmail();
});

hamburger.addEventListener("click", toggleNav);

navItems.forEach(function (it) {
  it.addEventListener("click", function () {
    closeNav();
  });
});
