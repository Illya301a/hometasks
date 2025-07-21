const slides = document.querySelectorAll(".slides img");
const slider = document.querySelector(".slides");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");
const toggleAutoBtn = document.querySelector(".toggleAuto");

let currentIndex = 0;
let autoPlayInterval;

export { currentIndex, autoPlayInterval };
