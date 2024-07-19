// creates a blank square grid of div elements and makes them listen for mouse hovers
function createGrid(size) {
    let dimension = (960/size).toString();

    for(let i = 0; i < size**2; i++) {
        const box = document.createElement("div");
        box.style.width = dimension+"px";
        box.style.height = dimension+"px";
        box.classList.add("grid-elem");
        container.appendChild(box);
        gtToggle = false;
        box.style.backgroundColor = bgPicker.value;
        box.addEventListener("mousemove", () => { 
            if (mouseDown) {
                box.style.backgroundColor = eraserToggle ? "#D3D9D4" :
                randomToggle ? '#' + Math.floor(Math.random() * 16777215).toString(16) : stylusPicker.value;
            }
        });
    }
}

let mouseDown = false;
const body = document.querySelector("body");
const container = document.querySelector(".container");
const clearButton = document.querySelector("#clear");
const sizeLabel = document.querySelector("#size-label");
const sizeSlider = document.querySelector(".slider");
const stylusPicker = document.querySelector("#stylus");
const bgPicker = document.querySelector("#bg");
bgPicker.value = "#D3D9D4"
const eraserButton = document.querySelector("#eraser");
let eraserToggle = false;
const gtButton = document.querySelector("#grid-toggle");
let gtToggle = false;
const randomButton = document.querySelector("#random");
let randomToggle = false;

document.body.addEventListener("mousedown", () => { mouseDown = true});
document.body.addEventListener("mouseup", () => { mouseDown = false});


sizeLabel.addEventListener("click", () => {
    let size = parseInt(prompt("What size would you like the canvas to be?"));

    if(isNaN(size)) {
        size=16;
    } else if (size > 80) {
        alert("Maximum size is 80!");
        size = 80;
    } else if (size < 1) {
        alert("Minimum size is 1!");
        size = 1;
    }

    container.innerHTML = "";
    createGrid(size);
    sizeSlider.value = size;
    sizeLabel.textContent = "Current Size: " + size + " x " + size;
});

sizeSlider.addEventListener("input", (event) => {
    container.innerHTML = "";
    createGrid(event.target.value);
    sizeLabel.textContent = "Current Size: " + event.target.value + " x " + event.target.value;
});

stylusPicker.addEventListener("change", (event) => {
    let color = event.target.value;
    document.querySelectorAll(".grid-elem").forEach(box => {
            let newBox = box.cloneNode(true);
            newBox.addEventListener("mousemove", () => {
                if (mouseDown) {
                    newBox.style.backgroundColor = color;
                } 
            });
            box.replaceWith(newBox);  
    });
});

bgPicker.addEventListener("change", (event) => {
    let color = event.target.value;
    document.querySelectorAll(".grid-elem").forEach(box => {
        box.style.backgroundColor = color;
    });
});


// ternary operator, checks for eraserToggle, if true then turns on eraser. 
// if false, checks the random toggle for whether it should be black or random cursor
// duplicate code, i think it's alright here though
eraserButton.addEventListener("click", () => {
    eraserToggle = !eraserToggle;
    eraserButton.classList.toggle("active");
    document.querySelectorAll(".grid-elem").forEach(box => {
        box.addEventListener("mousemove", () => {
            if (mouseDown) {
                box.style.backgroundColor = eraserToggle ? "#D3D9D4": 
            randomToggle ? '#' + Math.floor(Math.random() * 16777215).toString(16) : "black";
            }
        }); 
    }); 
});


// removes anon function in addEventListener(), then replaces it
randomButton.addEventListener("click", () => {
    randomToggle = !randomToggle;
    randomButton.classList.toggle("active");
    document.querySelectorAll(".grid-elem").forEach(box => {
            let newBox = box.cloneNode(true);
            newBox.addEventListener("mousemove", () => {
                if(mouseDown) {
                    newBox.style.backgroundColor = randomToggle ? '#' + Math.floor(Math.random() * 16777215).toString(16) : "black";
                    }
                });
            box.replaceWith(newBox);
    });
});

gtButton.addEventListener("click", () => {
    gtToggle = !gtToggle;
    gtButton.classList.toggle("active");
    document.querySelectorAll(".grid-elem").forEach(box => {
        box.style.border = gtToggle ? "none": "1px solid #212A31";
    }); 
});

clearButton.addEventListener("click", () => {
    document.querySelectorAll(".grid-elem").forEach(box => {
        box.style.backgroundColor = "#D3D9D4";
    });
    clearButton.classList.toggle("active");
});

createGrid(16);