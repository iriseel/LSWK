const song_choices = document.querySelectorAll(".song_choice");

const carousel_item = document.querySelector(".carousel_item");
const carousel_items = document.querySelectorAll(".carousel_item");
let delay = 0,
    step = 10 / carousel_items.length; /* 5 is the animation duration */
carousel_items.forEach(function (carousel_item) {
    carousel_item.style.animationDelay = -delay + "s";
    delay += step;
});
