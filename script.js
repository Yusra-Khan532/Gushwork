// here the idea is to track the mouse position (event), as soon as the mouse
//enters the image area, it triggers the event and it finds the cursor position,
//then clamps the lens witj the cursor, and the preview gets updated by using the same background image just
//the zoomed version of it


const imageArea = document.querySelector(".product-gallery__image-area");
const mainImage = document.querySelector("#main-product-image");
const lens = document.querySelector(".zoom-lens");
const result = document.querySelector(".zoom-result");

const zoomLevel = 2.5;

imageArea.addEventListener("mouseenter", () => {
  lens.style.display = "block";
  result.style.display = "block";

  result.style.backgroundImage = `url(${mainImage.src})`;
  result.style.backgroundSize = `${mainImage.offsetWidth * zoomLevel}px ${mainImage.offsetHeight * zoomLevel}px`;
});

imageArea.addEventListener("mousemove", moveLens);
lens.addEventListener("mousemove", moveLens);

imageArea.addEventListener("mouseleave", () => {
  lens.style.display = "none";
  result.style.display = "none";
});

function moveLens(event) {
  const rect = imageArea.getBoundingClientRect();

  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  const lensWidth = lens.offsetWidth;
  const lensHeight = lens.offsetHeight;

  let lensX = x - lensWidth / 2;
  let lensY = y - lensHeight / 2;

  if (lensX < 0) lensX = 0;
  if (lensY < 0) lensY = 0;
  if (lensX > imageArea.offsetWidth - lensWidth) {
    lensX = imageArea.offsetWidth - lensWidth;
  }
  if (lensY > imageArea.offsetHeight - lensHeight) {
    lensY = imageArea.offsetHeight - lensHeight;
  }

  lens.style.left = `${lensX}px`;
  lens.style.top = `${lensY}px`;

  const bgX = -(lensX * zoomLevel);
  const bgY = -(lensY * zoomLevel);

  result.style.backgroundPosition = `${bgX}px ${bgY}px`;
}