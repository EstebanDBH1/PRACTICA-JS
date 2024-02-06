const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const links = [
  ...document.querySelectorAll(".co-links-projects .link-project"),
];

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

let imgIndex = 0;
// Load images into an array for reference
const images = [
  "../../media/img1.jpg",
  "../../media/img2.png",
  "../../media/img3.jpg",
  "../../media/img4.png",
  // "./images/1.jpeg",
  //"./images/2.jpeg",
  //"./images/3.jpeg",
  //"./images/4.jpeg",
];

let imgArr = [];

// Canvas mousemove varaibles

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

images.forEach((image, idx) => {
  let elImage = new Image(300);
  elImage.src = image;
  elImage.classList.add("project-image");
  document.body.append(elImage);
  imgArr.push(elImage);
});

// Draw images to the canvas

let percent = 0;
let target = 0;

function drawImage(idx) {
  let { width, height } = imgArr[idx].getBoundingClientRect();

  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // pixelate by diabling the smoothing
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  if (target === 1) {
    // Link has been hovered
    // 2 speeds to make the effect more gradual
    if (percent < 0.2) {
      percent += 0.01;
    } else if (percent < 1) {
      percent += 0.1;
    }
  } else if (target === 0) {
    if (percent > 0.2) {
      percent -= 0.3;
    } else if (percent > 0) {
      percent -= 0.01;
    }
  }

  let scaledWidth = width * percent;
  let scaledHeight = height * percent;

  if (percent >= 1) {
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.drawImage(imgArr[idx], 0, 0, width, height);
  } else {
    ctx.drawImage(imgArr[idx], 0, 0, scaledWidth, scaledHeight);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    if (canvas.width !== 0 && canvas.height !== 0) {
      ctx.drawImage(
        canvas,
        0,
        0,
        scaledWidth,
        scaledHeight,
        0,
        0,
        width,
        height
      );
    }
  }
}

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("mouseover", () => {
    for (let j = 0; j < links.length; j++) {
      if (j !== i) {
        links[j].style.opacity = 0.2;
        links[j].style.zIndex = 0;
      } else {
        links[j].style.opacity = 1;
        links[j].style.zIndex = 3;
      }
    }
  });

  links[i].addEventListener("mouseleave", () => {
    for (let i = 0; i < links.length; i++) {
      links[i].style.opacity = 1;
    }
  });

  links[i].addEventListener("mouseenter", () => {
    imgIndex = i;
    target = 1;
  });

  links[i].addEventListener("mouseleave", () => {
    target = 0;
  });
}

function animate() {
  currentX = lerp(currentX, targetX, 0.075);
  currentY = lerp(currentY, targetY, 0.075);
  let { width, height } = imgArr[imgIndex].getBoundingClientRect();
  canvas.style.transform = `translate3d(${currentX - width / 2}px, ${
    currentY - height / 2
  }px, 0)`;
  drawImage(imgIndex);
  window.requestAnimationFrame(animate);
}

animate();
//data barba.js page transition

// TEXT MARQUEE
let currentScroll = 0;
let isScrollDown = true;

let tween = gsap
  .to(".marquee_part", {
    xPercent: -100,
    repeat: -1,
    duration: 13,
    ease: "linear",
  })
  .totalProgress(0.5);

gsap.set(".marquee__inner", {
  xPercent: -50,
});

window.addEventListener("scroll", function () {
  if (window.scrollY > currentScroll) {
    isScrollDown = true;
  } else {
    isScrollDown = false;
  }

  gsap.to(tween, {
    timeScale: isScrollDown ? 1 : -1,
  });

  currentScroll = window.scrollY;
});

/* BTN MOBILE FUNCIONS */
const tl = gsap.timeline({ paused: true });

const openNav = () => {
  animateOpenNav();
  const navBtn = document.querySelector(".btn-mobile");
  const body = document.querySelector("body");

  navBtn.onclick = function (e) {
    tl.reversed(!tl.reversed());
  };
};

openNav();

function animateOpenNav() {
  tl.to(".menu-overlay-expand", {
    x: 0,
    ease: "Power3.easeInOut",
    duration: 1,
  }).reverse();
}