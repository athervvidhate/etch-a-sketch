// creates a blank square grid of div elements and makes them listen for mouse hovers
function createGrid(size) {
    let dimension = Math.round(960/size).toString();

    for(let i = 0; i < size**2; i++) {
        const box = document.createElement("div");
        box.style.width = dimension+"px";
        box.style.height = dimension+"px";
        box.classList.add("grid-elem");
        container.appendChild(box);

        box.addEventListener("mouseover", () => {    
            box.style.backgroundColor = "black";
        });
    }
}
const body = document.querySelector("body");
const container = document.querySelector(".container");
const csButton = document.querySelector("#change-size");
const clearButton = document.querySelector("#clear");

csButton.addEventListener("click", () => {
    let size = parseInt(prompt("What size would you like the canvas to be?"));

    if(isNaN(size)) {
        size=16;
    } else if (size > 100) {
        size = 100;
    } else if (size < 1) {
        size = 1;
    }

    container.innerHTML = "";
    createGrid(size);
});

clearButton.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".grid-elem");
    boxes.forEach(box => {
        box.style.backgroundColor = "beige";
        
    });
});

createGrid(16);

/* TODO
    add ui
    add slider for canvas size
    add size display ex: 64x64
    rainbow color
    background color changer
    pointer color changer
    on clikc instead of hover?

*/
