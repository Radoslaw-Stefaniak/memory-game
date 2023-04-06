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
      `Gratulacje!! Odkryłeś wszystkie elementy w ${numOfMoves} ruchach. 
      A twój czas to:  ${inputField}`
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
    case checkClass && targetArray[0].classList[1] == clsTarget && checkID !== targetArray[0].id &&
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
    case checkClass && otwarteOkna == 2 && checkID !== (targetArray[1].id && targetArray[0].id):
      console.log(3);
      document.getElementById(targetArray[0].id).classList.add("fa-question-circle-o");
      document.getElementById(targetArray[1].id).classList.add("fa-question-circle-o");
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

//  --- Background ---


const paths = [
  {
    final:
      "M0 60L32 63.7C64 67.3 128 74.7 192 85.5C256 96.3 320 110.7 384 123.3C448 136 512 147 576 148C640 149 704 140 768 138.2C832 136.3 896 141.7 928 144.3L960 147L960 0L928 0C896 0 832 0 768 0C704 0 640 0 576 0C512 0 448 0 384 0C320 0 256 0 192 0C128 0 64 0 32 0L0 0Z",
    initial:
      "M0 71L32 64.7C64 58.3 128 45.7 192 59.2C256 72.7 320 112.3 384 129.5C448 146.7 512 141.3 576 127.8C640 114.3 704 92.7 768 95.3C832 98 896 125 928 138.5L960 152L960 0L928 0C896 0 832 0 768 0C704 0 640 0 576 0C512 0 448 0 384 0C320 0 256 0 192 0C128 0 64 0 32 0L0 0Z",
      fill: "#e07707",
  },
  {
    final:
      "M0 82L32 90.2C64 98.3 128 114.7 192 134.5C256 154.3 320 177.7 384 193.8C448 210 512 219 576 212.7C640 206.3 704 184.7 768 178.3C832 172 896 181 928 185.5L960 190L960 145L928 142.3C896 139.7 832 134.3 768 136.2C704 138 640 147 576 146C512 145 448 134 384 121.3C320 108.7 256 94.3 192 83.5C128 72.7 64 65.3 32 61.7L0 58Z",
    initial:
      "M0 131L32 122C64 113 128 95 192 108.5C256 122 320 167 384 186.7C448 206.3 512 200.7 576 188.8C640 177 704 159 768 155.5C832 152 896 163 928 168.5L960 174L960 150L928 136.5C896 123 832 96 768 93.3C704 90.7 640 112.3 576 125.8C512 139.3 448 144.7 384 127.5C320 110.3 256 70.7 192 57.2C128 43.7 64 56.3 32 62.7L0 69Z",
      fill: "#e8522e",
  },
  {
    final:
      "M0 298L32 298C64 298 128 298 192 313.3C256 328.7 320 359.3 384 368.3C448 377.3 512 364.7 576 353.8C640 343 704 334 768 316C832 298 896 271 928 257.5L960 244L960 188L928 183.5C896 179 832 170 768 176.3C704 182.7 640 204.3 576 210.7C512 217 448 208 384 191.8C320 175.7 256 152.3 192 132.5C128 112.7 64 96.3 32 88.2L0 80Z",
    initial:
      "M0 217L32 203.5C64 190 128 163 192 171.2C256 179.3 320 222.7 384 247C448 271.3 512 276.7 576 272.2C640 267.7 704 253.3 768 250.7C832 248 896 257 928 261.5L960 266L960 172L928 166.5C896 161 832 150 768 153.5C704 157 640 175 576 186.8C512 198.7 448 204.3 384 184.7C320 165 256 120 192 106.5C128 93 64 111 32 120L0 129Z",
      fill: "#e5254c",
    },
  {
    final:
      "M0 417L32 405.3C64 393.7 128 370.3 192 376.7C256 383 320 419 384 437C448 455 512 455 576 446.8C640 438.7 704 422.3 768 404.3C832 386.3 896 366.7 928 356.8L960 347L960 242L928 255.5C896 269 832 296 768 314C704 332 640 341 576 351.8C512 362.7 448 375.3 384 366.3C320 357.3 256 326.7 192 311.3C128 296 64 296 32 296L0 296Z",
    initial:
      "M0 255L32 249.5C64 244 128 233 192 240.2C256 247.3 320 272.7 384 286.2C448 299.7 512 301.3 576 298.7C640 296 704 289 768 286.3C832 283.7 896 285.3 928 286.2L960 287L960 264L928 259.5C896 255 832 246 768 248.7C704 251.3 640 265.7 576 270.2C512 274.7 448 269.3 384 245C320 220.7 256 177.3 192 169.2C128 161 64 188 32 201.5L0 215Z",
      fill: "#d3006b",
    },
  {
    final:
      "M0 509L32 500.8C64 492.7 128 476.3 192 473.5C256 470.7 320 481.3 384 488.5C448 495.7 512 499.3 576 494C640 488.7 704 474.3 768 467.2C832 460 896 460 928 460L960 460L960 345L928 354.8C896 364.7 832 384.3 768 402.3C704 420.3 640 436.7 576 444.8C512 453 448 453 384 435C320 417 256 381 192 374.7C128 368.3 64 391.7 32 403.3L0 415Z",
    initial:
      "M0 330L32 325.5C64 321 128 312 192 331C256 350 320 397 384 407C448 417 512 390 576 395.3C640 400.7 704 438.3 768 435.7C832 433 896 390 928 368.5L960 347L960 285L928 284.2C896 283.3 832 281.7 768 284.3C704 287 640 294 576 296.7C512 299.3 448 297.7 384 284.2C320 270.7 256 245.3 192 238.2C128 231 64 242 32 247.5L0 253Z",
      fill: "#ac008e",
    },
  {
    final:
      "M0 541L32 541C64 541 128 541 192 541C256 541 320 541 384 541C448 541 512 541 576 541C640 541 704 541 768 541C832 541 896 541 928 541L960 541L960 458L928 458C896 458 832 458 768 465.2C704 472.3 640 486.7 576 492C512 497.3 448 493.7 384 486.5C320 479.3 256 468.7 192 471.5C128 474.3 64 490.7 32 498.8L0 507Z",
    initial:
      "M0 541L32 541C64 541 128 541 192 541C256 541 320 541 384 541C448 541 512 541 576 541C640 541 704 541 768 541C832 541 896 541 928 541L960 541L960 345L928 366.5C896 388 832 431 768 433.7C704 436.3 640 398.7 576 393.3C512 388 448 415 384 405C320 395 256 348 192 329C128 310 64 319 32 323.5L0 328Z",
      fill: "#5b00b0",
    },
];

const svg = d3.select("svg");

// Create a path element for each set of paths
const pathGroups = svg
  .selectAll("g")
  .data(paths)
  .enter()
  .append("g")
  .append("path")
  // .attr("stroke", "blue")
  // .attr("stroke-width", "5")
  .attr("fill", "url(#myGradient)");

function transitionPaths() {
  pathGroups.each(function (d) {
    const path = d3.select(this);
    path
      .transition()
      .duration(9000)
      .attr("d", d.final)
      .attr("fill",d.fill)
      .transition()
      .duration(9000)
      .attr("d", d.initial)
      // .attr("fill", d.fill)
      .on("end", function () {
        transitionPaths();
      });
  });
}
transitionPaths();