"use strict";
import "./style.css";

const cards = document.querySelectorAll(".card");
const cardContaner = document.querySelector(".card-container");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 1,
    // rootMargin: "100px",
  }
);

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  {
    rootMargin: "100px",
  }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

// observer.observe(cards[0]);

cards.forEach((card) => {
  observer.observe(card);
});

const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNum(0, 225)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
// console.log(randomColor());

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.style.backgroundColor = randomColor();
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContaner.append(card);
  }
}
