// creates a blank square grid of div elements and makes them listen for mouse hovers
function createGrid(size) {
    let dimension = Math.round(960/size).toString();

    for(let i = 0; i < size**2; i++) {
        const box = document.createElement("div");
        box.style.width = dimension+"px";
        box.style.height = dimension+"px";
        box.classList.add("grid-elem");
        container.appendChild(box);
        gtToggle = false;
        box.addEventListener("mouseover", () => {    
            box.style.backgroundColor = randomToggle ? '#' + Math.floor(Math.random() * 16777215).toString(16) : "black";
        });
    }
}

const body = document.querySelector("body");
const container = document.querySelector(".container");
const csButton = document.querySelector("#change-size");
const clearButton = document.querySelector("#clear");
const sizeLabel = document.querySelector("#size-label");
const eraserButton = document.querySelector("#eraser");
let eraserToggle = false;
const gtButton = document.querySelector("#grid-toggle");
let gtToggle = false;
const randomButton = document.querySelector("#random");
let randomToggle = false;

csButton.addEventListener("click", () => {
    let size = parseInt(prompt("What size would you like the canvas to be?"));

    if(isNaN(size)) {
        size=16;
    } else if (size > 80) {
        size = 80;
    } else if (size < 1) {
        size = 1;
    }

    container.innerHTML = "";
    createGrid(size);
    sizeLabel.textContent = "Current Size: " + size + " x " + size;
});

clearButton.addEventListener("click", () => {
    document.querySelectorAll(".grid-elem").forEach(box => {
        box.style.backgroundColor = "#D3D9D4";
    });
    clearButton.classList.toggle("active");
});

gtButton.addEventListener("click", () => {
    gtToggle = !gtToggle;
    gtButton.classList.toggle("active");
    document.querySelectorAll(".grid-elem").forEach(box => {
        box.style.border = gtToggle ? "none": "1px solid #212A31";
    }); 
});

// ternary operator, checks for eraserToggle, if true then turns on eraser. 
// if false, checks the random toggle for whether it should be black or random cursor
// duplicate code, i think it's alright here though
eraserButton.addEventListener("click", () => {
    eraserToggle = !eraserToggle;
    eraserButton.classList.toggle("active");
    document.querySelectorAll(".grid-elem").forEach(box => {
        box.addEventListener("mouseover", () => {
            box.style.backgroundColor = eraserToggle ? "#D3D9D4": 
            randomToggle ? '#' + Math.floor(Math.random() * 16777215).toString(16) : "black";
        }); 
    }); 
});


// removes anon function in addEventListener(), then replaces it
randomButton.addEventListener("click", () => {
    randomToggle = !randomToggle;
    randomButton.classList.toggle("active");
    document.querySelectorAll(".grid-elem").forEach(box => {
        box.replaceWith(box,cloneNode(true));
        box.addEventListener("mouseover", () => {
            box.style.backgroundColor = randomToggle ? '#' + Math.floor(Math.random() * 16777215).toString(16) : "black";
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
