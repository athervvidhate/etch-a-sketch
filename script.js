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
const sizeLabel = document.querySelector("#size-label");
const randomButton = document.querySelector("#random");
let randomToggle = false;

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
    sizeLabel.textContent = "Current Size: " + size + " x " + size;
});

clearButton.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".grid-elem");
    boxes.forEach(box => {
        box.style.backgroundColor = "beige";
    });
});


// removes anon function in addEventListener(), then replaces it
randomButton.addEventListener("click", () => {
    randomToggle = !randomToggle;
    randomButton.classList.toggle("active");
    const boxes = document.querySelectorAll(".grid-elem");
    boxes.forEach(box => {
        let newBox = box.cloneNode(true);
        box.parentNode.replaceChild(newBox,box);
        newBox.addEventListener("mouseover", () => {
            newBox.style.backgroundColor = randomToggle ? '#' + Math.floor(Math.random() * 16777215).toString(16) : "black";
        });  
    });
});

createGrid(16);

/* TODO
    add ui
    add slider for canvas size
    add size display ex: 64x64 DONE
    add random color stylus DONE
    background color changer
    pointer color changer
    on click instead of hover?
*/
