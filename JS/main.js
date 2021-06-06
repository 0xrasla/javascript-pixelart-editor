let gridSize = 50;
let gridWidth = gridheight = "10px";
let palleteContainer = document.querySelector(".pallete");

let selectedColor = "white";
let defaultColor = "black";

let eraserEnabled = false;

function generateGrid(v) {
        let e = document.querySelector('.pallete');
        for(let i = 0; i < v; i++){ 
          let row = document.createElement("div"); 
          row.className = "row"; 
          for(let x = 1; x <= v; x++){ 
              let cell = document.createElement("div"); 
              cell.className = "box"; 
              cell.style.height = gridheight;
              cell.style.width = gridWidth;
              row.appendChild(cell); 
          } 
          e.appendChild(row); 
        } 
}

function handleButtons() {
    let colorPalleteButtons = document.querySelectorAll(".color-button");

    for(let i of Array.from(colorPalleteButtons)) {
        i.addEventListener("click", (e) => {
            selectedColor = i.style.backgroundColor;
        })
    }
}

function draw() {
    let boxes = document.querySelectorAll('.box');

    let cliked = false;
    for(let i of Array.from(boxes)) {

        i.addEventListener('click', () => {
            i.style.backgroundColor = selectedColor;
        })
        
        i.addEventListener("mouseenter", () => {
            if(cliked) {
                i.style.backgroundColor = selectedColor;

                if(i.classList.contains('eraser')) {
                    eraserEnabled = true;
                }else {
                    eraserEnabled = false;
                }
            }

            i.setAttribute('class', 'box bg')

            document.body.onmousedown = () => {
                cliked = true;
            }

            document.body.onmouseup = () => {
                cliked = false;
            }

            if (!cliked && i.style.backgroundColor == selectedColor) i.style.backgroundColor = selectedColor;

        })

        i.addEventListener("mouseleave", () => {
            document.body.onmousedown = () => {
                cliked = true;
            }

            document.body.onmouseup = () => {
                cliked = false;
            }

            if(eraserEnabled) {
                if (!cliked && i.style.backgroundColor == selectedColor) i.style.backgroundColor = defaultColor; 
            }

            i.setAttribute('class', 'box')
        })
    }
}

function clearButton() {
    let clearButton = document.querySelector('.btn');
    let boxes = document.querySelectorAll('.box');

    clearButton.addEventListener("click", () => {
        for(let i of Array.from(boxes)) {
            i.style.backgroundColor = defaultColor;
        }
    })
}

function saveIt() {
        let div = document.querySelector('.pallete');
        let saveBtn = document.querySelector(".btn-save");

        saveBtn.addEventListener('click', () => {
            html2canvas(div).then(
                function (canvas) {
                    var link = document.createElement('a');
                    link.download = 'draw.png';
                    link.href = canvas.toDataURL()
                    link.click();
                }
            )
        })
}

function main() {
    generateGrid(gridSize)
    handleButtons()
    draw()
    clearButton()
    saveIt()
}

main()