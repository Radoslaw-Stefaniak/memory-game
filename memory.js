let tilesCol = 6;
let tilesRow = 4;
let numberOfTiles = tilesCol * tilesRow;
let lastClicked = ["1", "2"];
let numOfMoves = 0;
let firstKlik = false;
let otwarteOkna = 0;
let targetArray = new Array(3);


const btn = document.getElementsByClassName("btn");
const plus = document.getElementById("plusik");
const minus = document.getElementById("minusik");
const reset = document.getElementById("reset");

const primalArray = [
  "fa fa-apple", "fa fa-stack-overflow", "fa fa-whatsapp", "fa fa-steam-square", "fa fa-reddit-alien",
  "fa fa-github", "fa fa-facebook-square", "fa fa-envira", "fa fa-address-book", "fa fa-anchor",
  "fa fa-money", "fa fa-at", "fa fa-ban", "fa fa-bar-chart", "fa fa-battery-1", "fa fa-birthday-cake",
  "fa fa-battery-2", "fa fa-bomb", "fa fa-bell-slash-o", "fa fa-pie-chart", "fa fa-book",
  "fa fa-bolt", "fa fa-bug", "fa fa-calculator", "fa fa-cab", "fa fa-calendar", "fa fa-child",
  "fa fa-coffee", "fa fa-cogs", "fa fa-comment", "fa fa-comments", "fa fa-cutlery", "fa fa-diamond",
  "fa fa-recycle", "fa fa-eye", "fa fa-rss", "fa fa-female", "fa fa-file-code-o", "fa fa-flask",
  "fa fa-medkit", "fa fa-line-chart", "fa fa-file-zip-o", "fa fa-gamepad", "fa fa-paw",
  "fa fa-soccer-ball-o", "fa fa-rss-square", "fa fa-star", "fa fa-star-o", "fa fa-umbrella",
  "fa fa-thumbs-up", "fa fa-trash-o", "fa fa-wrench", "fa fa-warning",
];

function pickFromArray() {
  return (faIconClass = primalArray
    .slice(0, numberOfTiles / 2)
    .concat(primalArray.slice(0, numberOfTiles / 2)));
}
pickFromArray();

function sortyArr(arr) {  // Random sort function
  let currentIndex = arr.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
}

function restart() {  // RESET function
  (() => {
    const myNode = document.getElementById("tester");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  })();
  pickFromArray();
  sortyArr(faIconClass);
  numOfMoves = 0;
  otwarteOkna = 0
  firstKlik = false;
  for (let iRow = 0; iRow < tilesCol * tilesRow; iRow++) {
    var div = document.createElement("div");
    div.className = `${faIconClass[iRow]} fa-question-circle-o`;
    div.id = `id${iRow}`;
    document.querySelector("#tester").appendChild(div);
  }
  ShowMoves();
  myStyle();
}
function myStyle() {  // Styl numbero of Tile
  let styl = `repeat( ${tilesCol} , auto)`;
  document.getElementById("tester").style.gridTemplateColumns = styl;
}
function ShowMoves() {  // Display score borde function
  document.getElementById("moves").innerHTML = `Moves: ${numOfMoves}`;
}

document.addEventListener("click", buttonClicked);
function buttonClicked(ev) {
  let target = ev.target
  let clsTarget = ev.target.classList[1];
  let checkClass = ev.target.classList[0] == "fa";
  let checkID = ev.target.id


  switch (true) {
    case (target == reset):
      restart()
      break;
    case (target == plus && numberOfTiles < 80):
      tilesCol += 2;
      tilesRow += 2;
      numberOfTiles = tilesCol * tilesRow;
      restart();
      break;
    case (target == minus && numberOfTiles > 24):
      tilesCol -= 2;
      tilesRow -= 2;
      numberOfTiles = tilesCol * tilesRow;
      restart();
      break
    case (!firstKlik && checkClass):
      console.log(1)
      targetArray.unshift(target);
      targetArray.pop();
      firstKlik = true;
      numOfMoves++
      otwarteOkna++
      target.classList.remove("fa-question-circle-o");
      ShowMoves()
      break;
     case(checkClass && targetArray[0].classList[1] == clsTarget && checkID !== targetArray[0].id && otwarteOkna<2):
      console.log(4)
      document.getElementById(`${targetArray[0].id}`).id = "hidden";
      document.getElementById(`${checkID}`).id = "hidden";
      numOfMoves++
      otwarteOkna = 0
      ShowMoves()
     break 
    case (checkClass && checkID !== targetArray[0].id && firstKlik && otwarteOkna<2):
      console.log(2)
      numOfMoves++
      otwarteOkna++
      targetArray.unshift(target);
      targetArray.pop();
      ev.target.classList.remove("fa-question-circle-o");
      console.log(otwarteOkna +" oraz "+ targetArray)
      ShowMoves()
      break
    case (checkClass && otwarteOkna == 2 && checkID !== (targetArray[1].id && targetArray[0].id)):
      console.log(3)
      document.getElementById(targetArray[0].id).classList.add("fa-question-circle-o");
      document.getElementById(targetArray[1].id).classList.add("fa-question-circle-o");
      targetArray.unshift(target);
      targetArray.pop();
      ev.target.classList.remove("fa-question-circle-o");
      numOfMoves++
      otwarteOkna = 1
      ShowMoves()
    break
  }

}
restart();
// do tąd działa dalej funcja przerobiona prze AI

function shuffleArray(arr) {
  const halfLength = arr.length / 2;
  const firstHalf = arr.slice(0, halfLength);
  const secondHalf = arr.slice(halfLength, arr.length);
  const shuffled = firstHalf.concat(secondHalf).sort(() => Math.random() - 0.5);
  return shuffled;
}

function restart() {  // RESET function by AI
  const myNode = document.getElementById("tester");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  faIconClass = shuffleArray(primalArray.slice(0, numberOfTiles));
  numOfMoves = 0;
  otwarteOkna = 0
  firstKlik = false;
  for (let iRow = 0; iRow < tilesCol * tilesRow; iRow++) {
    const div = document.createElement("div");
    div.className = `${faIconClass[iRow]} fa-question-circle-o`;
    div.id = `id${iRow}`;
    document.querySelector("#tester").appendChild(div);
  }
  ShowMoves();
  myStyle();
}

let zmienna_sprawdzajaca_rebase = 4 //zmieniam na 4
let reb = 2

function fuu(a , b){
  return console.log(a+b)
}
fuu(zmienna_sprawdzajaca_rebase, reb)