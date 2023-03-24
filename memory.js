let tilesCol = 6;
let tilesRow = 4;
let numberOfTiles = tilesCol * tilesRow;
// let lastClicked = ["1", "2"];
let numOfMoves = 0;
let firstKlik = false;
let otwarteOkna = 0;
let targetArray = new Array(3);

const btn = document.getElementsByClassName("btn");
const plus = document.getElementById("plusik");
const minus = document.getElementById("minusik");
const reset = document.getElementById("reset");

const primalArray = [
  "fa fa-apple",
  "fa fa-stack-overflow",
  "fa fa-whatsapp",
  "fa fa-steam-square",
  "fa fa-reddit-alien",
  "fa fa-github",
  "fa fa-facebook-square",
  "fa fa-envira",
  "fa fa-address-book",
  "fa fa-anchor",
  "fa fa-money",
  "fa fa-at",
  "fa fa-ban",
  "fa fa-bar-chart",
  "fa fa-battery-1",
  "fa fa-birthday-cake",
  "fa fa-battery-2",
  "fa fa-bomb",
  "fa fa-bell-slash-o",
  "fa fa-pie-chart",
  "fa fa-book",
  "fa fa-bolt",
  "fa fa-bug",
  "fa fa-calculator",
  "fa fa-cab",
  "fa fa-calendar",
  "fa fa-child",
  "fa fa-coffee",
  "fa fa-cogs",
  "fa fa-comment",
  "fa fa-comments",
  "fa fa-cutlery",
  "fa fa-diamond",
  "fa fa-recycle",
  "fa fa-eye",
  "fa fa-rss",
  "fa fa-female",
  "fa fa-file-code-o",
  "fa fa-flask",
  "fa fa-medkit",
  "fa fa-line-chart",
  "fa fa-file-zip-o",
  "fa fa-gamepad",
  "fa fa-paw",
  "fa fa-soccer-ball-o",
  "fa fa-rss-square",
  "fa fa-star",
  "fa fa-star-o",
  "fa fa-umbrella",
  "fa fa-thumbs-up",
  "fa fa-trash-o",
  "fa fa-wrench",
  "fa fa-warning",
];

function restart(arr, n) {
  // RESET function
  (() => {
    const myNode = document.getElementById("tester");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  })();

  var result = new Array(n);
  len = arr.length;
  taken = new Array(len);
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  const newArr = result.concat(result); // Duplikacja tablicy
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Losowa liczba całkowita z zakresu [0, i]
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; // Zamiana elementów miejscami
  }
  numOfMoves = 0;
  otwarteOkna = 0;
  firstKlik = false;
  for (let iRow = 0; iRow < tilesCol * tilesRow; iRow++) {
    var div = document.createElement("div");
    div.className = `${newArr[iRow]} fa-question-circle-o`;
    div.id = `id${iRow}`;
    document.querySelector("#tester").appendChild(div);
  }
  ShowMoves();
  myStyle();
  firstKlik = false;
  stopTimer();
}

function myStyle() {
  let styl = `repeat( ${tilesCol} , auto)`;
  document.getElementById("tester").style.gridTemplateColumns = styl;
}
function ShowMoves() {
  document.getElementById("moves").innerHTML = `Moves: ${numOfMoves}`;
}

let time = 0; // czas w sekundach
let timerInterval; // zmienna przechowująca interwał czasowy

// funkcja, która będzie wywoływana co sekundę
function timer() {
  time++; // zwiększ czas o 1 sekundę

  // konwersja czasu na format hh:mm:ss
  // let hours = Math.floor(time / 3600).toString().padStart(2, '0');
  let minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (time % 60).toString().padStart(2, "0");

  // wyświetl czas w elemencie HTML
  document.getElementById("timer").textContent = `Time: ${minutes}:${seconds}`;
}

// funkcja wywoływana po kliknięciu przycisku
function startTimer() {
  // wywołaj funkcję timer() co 1 sekundę i zapisz interwał czasowy do zmiennej
  timerInterval = setInterval(timer, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
  time = 0;
  document.getElementById("timer").textContent = "Time: 00:00";
}

function checkHiddenClassElements(classname) {
  const elements = document.querySelectorAll(`.${classname}`);
  let allHidden = true;

  elements.forEach((element) => {
    if (element.id !== "hidden") {
      allHidden = false;
    }
  });

  if (allHidden) {
    console.log(
      `All elements with class "${classname}" have ID set to "hidden"`
    );
    const inputField = document.getElementById("timer").innerHTML;
    showPopup(
      `Gratulacje!! Odkryłeś wszystkie elementy w ${numOfMoves} ruchach. A twój czas to:  ${inputField}`
    );
  }
}

function showPopup(message) {
  // Create a new div element to hold the popup
  const popup = document.createElement("div");
  popup.id = "popap";

  // Set the popup's text content to the message passed in
  popup.textContent = message;
  const closeButton = document.createElement("button");
  closeButton.className = "btn";
  closeButton.textContent = "OK";
  // closeButton.style.marginLeft = "10px";

  // Add a click event listener to the button to remove the popup
  closeButton.addEventListener("click", () => {
    document.body.removeChild(popup);
    restart(primalArray, numberOfTiles / 2);
  });

  // Add the popup and button elements to the document
  popup.appendChild(closeButton);
  document.body.appendChild(popup);
}

document.addEventListener("click", buttonClicked);
function buttonClicked(ev) {
  let target = ev.target;
  let clsTarget = ev.target.classList[1];
  let checkClass = ev.target.classList[0] == "fa";
  let checkID = ev.target.id;

  if (checkClass && !firstKlik) {
    startTimer();
  }

  switch (true) {
    case target == reset:
      restart(primalArray, numberOfTiles / 2);
      break;
    case target == plus && numberOfTiles < 80:
      tilesCol += 2;
      tilesRow += 2;
      numberOfTiles = tilesCol * tilesRow;
      restart(primalArray, numberOfTiles / 2);
      break;
    case target == minus && numberOfTiles > 24:
      tilesCol -= 2;
      tilesRow -= 2;
      numberOfTiles = tilesCol * tilesRow;
      restart(primalArray, numberOfTiles / 2);
      break;
    case !firstKlik && checkClass:
      console.log(1);
      targetArray.unshift(target);
      targetArray.pop();
      firstKlik = true;
      numOfMoves++;
      otwarteOkna++;
      target.classList.remove("fa-question-circle-o");
      ShowMoves();
      break;
    case checkClass &&
      targetArray[0].classList[1] == clsTarget &&
      checkID !== targetArray[0].id &&
      otwarteOkna < 2:
      console.log(4);
      document.getElementById(`${targetArray[0].id}`).id = "hidden";
      document.getElementById(`${checkID}`).id = "hidden";
      otwarteOkna = 0;
      ShowMoves();
      checkHiddenClassElements("fa");
      break;
    case checkClass &&
      checkID !== targetArray[0].id &&
      firstKlik &&
      otwarteOkna < 2:
      console.log(2);
      numOfMoves++;
      otwarteOkna++;
      targetArray.unshift(target);
      targetArray.pop();
      ev.target.classList.remove("fa-question-circle-o");
      console.log(otwarteOkna + " oraz " + targetArray);
      ShowMoves();
      break;
    case checkClass &&
      otwarteOkna == 2 &&
      checkID !== (targetArray[1].id && targetArray[0].id):
      console.log(3);
      document
        .getElementById(targetArray[0].id)
        .classList.add("fa-question-circle-o");
      document
        .getElementById(targetArray[1].id)
        .classList.add("fa-question-circle-o");
      targetArray.unshift(target);
      targetArray.pop();
      ev.target.classList.remove("fa-question-circle-o");
      numOfMoves++;
      otwarteOkna = 1;
      ShowMoves();
      break;
  }
}
restart(primalArray, numberOfTiles / 2);
