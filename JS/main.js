let palleteLength = 3240;
let palleteContainer = document.querySelector(".pallete");

let selectedColor = "white";
let defaultColor = 'black';

function makePallete() {
    for(let i = 0; i < palleteLength; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        palleteContainer.appendChild(box)
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
            }

            document.body.onmouseup = () => {
                cliked = false;
            }
        })

        i.addEventListener("mouseleave", () => {
            document.body.onmousedown = () => {
                cliked = true;
            }

            document.body.onmouseup = () => {
                cliked = false;
            }
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
    makePallete()
    handleButtons()
    draw()
    clearButton()
    saveIt()
}

main()