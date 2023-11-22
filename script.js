//Getting and setting the dom elements
const boxes = document.querySelector(".boxes");
const colors = [
  "aqua",
  "aquamarine",
  "crimson",
  "blue",
  "dodgerblue",
  "gold",
  "greenyellow",
  "teal",
];
const colorList = [...colors, ...colors];
const boxLength = colorList.length;
//console.log(boxLength);

//Initialization of the game state
let revealCount = 0;
let activeBox = null;
let waitingTime = false;

//function to build the box dynamically
function buildBoxes(color) {
  const element = document.createElement("div");
  element.classList.add("box");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");
  element.addEventListener("click", () => {
    //checking waiting time
    //adding revealed
    const revealed = element.getAttribute("data-revealed");
    if (waitingTime || revealed === "true" || element === activeBox) {
      return;
    }
    element.style.backgroundColor = color;

    //checking active box
    if (!activeBox) {
      activeBox = element;
      return;
    }
    // console.log(activeBox);

    //logic for matching boxes
    const colorToMatch = activeBox.getAttribute("data-color");
    if (colorToMatch === color) {
      activeBox.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      waitingTime = false;
      activeBox = null;
      revealCount += 2;

      if (revealCount === boxLength) {
        alert("Congratulations! You won! Refresh to play again");
      }
      return;
    }

    waitingTime = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeBox.style.backgroundColor = null;
      waitingTime = false;
      activeBox = null;
    }, 2000);
  });

  return element;
}

//Building the boxes
for (let i = 0; i < boxLength; i++) {
  const randomIndex = Math.floor(Math.random() * colorList.length);
  const color = colorList[randomIndex];
  const box = buildBoxes(color);
  //use splice method avoid repeatation of 3
  colorList.splice(randomIndex, 1);
  //console.log(color);
  //document.body.append(box);
  boxes.append(box);
}
