const cursorImage = document.getElementById("cursor-image");

const projects = document.querySelectorAll(".project");

projects.forEach(project => {

project.addEventListener("mouseenter", () => {

cursorImage.src = project.dataset.image;

cursorImage.style.opacity = 1;

});

project.addEventListener("mouseleave", () => {

cursorImage.style.opacity = 0;

});

});

document.addEventListener("mousemove", (e) => {

cursorImage.style.left = e.clientX + "px";

cursorImage.style.top = e.clientY + "px";

});