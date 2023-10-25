"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const hoveredColor = document.getElementById("hovered-color");
const selectedColor = document.getElementById("selected-color");
const imageInput = document.getElementById("image-input");

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.crossOrigin = "anonymous";
    canvas.classList.add("photoLoad");

    img.onload = function () {
      if (img.width > 400) {
        const aspectRatio = img.height / img.width;
        img.width = 400;
        img.height = 400 * aspectRatio;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
      canvas.addEventListener("click", (event) => pick(event, selectedColor));
    };

    img.style.display = "none";
  };

  reader.readAsDataURL(file);
});

function pick(event, destination) {
  const bounding = canvas.getBoundingClientRect();
  const x = event.clientX - bounding.left;
  const y = event.clientY - bounding.top;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  destination.style.background = rgba;
  destination.textContent = rgba;
  
  console.log(rgba);
  return rgba;
}
