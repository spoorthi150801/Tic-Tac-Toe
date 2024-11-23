let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // if it is O's turn then we are allowing O to click or else if it is X's turn then we are allowing X to click
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true
        }
        box.disabled = true;
        checkWinner();
    })
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        // gets the value of that particular box clicked
        let pos1Value = boxes[pattern[0]].innerText
        let pos2Value = boxes[pattern[1]].innerText
        let pos3Value = boxes[pattern[2]].innerText

        //checking if the position values aren't empty
        if(pos1Value != "" && pos2Value != "" && pos3Value != "") {
            //condition for winning
            if(pos1Value === pos2Value && pos2Value === pos3Value && pos3Value === pos1Value) {
                showWinner(pos1Value);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);