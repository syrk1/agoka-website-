function openMenu() {
  document.getElementById("menu").classList.toggle("active");
  document.getElementById("menuOverlay").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("menu").classList.remove("active");
  document.getElementById("menuOverlay").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.getAttribute("data-page");
  if (!page) return;

  document.querySelectorAll("[data-nav-link]").forEach(function (link) {
    if (link.getAttribute("data-nav-link") === page) {
      link.classList.add("active");
    }
  });
});

document.querySelectorAll(".photo-frame.slideshow").forEach(function (frame) {
  var slides = frame.querySelectorAll("img");
  var dots = frame.querySelectorAll(".slide-dots span");
  var current = 0;
  var timer;

  function show(index) {
    slides[current].classList.remove("active");
    if (dots.length) dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    if (dots.length) dots[current].classList.add("active");
  }

  function next() {
    show(current + 1);
  }

  function startTimer() {
    timer = setInterval(next, 4000);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      clearInterval(timer);
      show(i);
      startTimer();
    });
  });

  startTimer();
});

// Swipeable image groups: always start on the first photo, and let the
// arrow button advance the row (looping back to the start at the end)
document.querySelectorAll(".image-group-wrap").forEach(function (wrap) {
  var track = wrap.querySelector(".image-group");
  var arrow = wrap.querySelector(".swipe-hint");
  if (!track) return;

  track.scrollLeft = 0;

  if (arrow) {
    arrow.addEventListener("click", function () {
      var step = track.clientWidth * 0.82 + 12;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + step,
        behavior: "smooth"
      });
    });
  }
});

// Tap-to-reveal stacked photo cards: clicking the top card sends it to the back
document.querySelectorAll(".stack-cards").forEach(function (stack) {
  var cards = stack.querySelectorAll(".stack-card");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      if (card.getAttribute("data-order") !== "0") return;

      cards.forEach(function (c) {
        var order = parseInt(c.getAttribute("data-order"), 10);
        c.setAttribute("data-order", (order - 1 + cards.length) % cards.length);
      });
    });
  });
});
