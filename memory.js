let tilesCol = 6;
let tilesRow = 4;
let numberOfTiles = tilesCol * tilesRow;
let lastClicked = ["1", "2"];
let numOfMoves = 0;
let firstKlik = false;
let otwarteOkna = 0;
let targetArray = new Array(3);


let btn = document.getElementsByClassName("btn");
let plus = document.getElementById("plusik");
let minus = document.getElementById("minusik");
let reset = document.getElementById("reset");
// let tile = document.getElementById("tile")

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
  let idTarget = ev.target.id;
  // let klik = ev.target;
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
    case (checkClass && checkID !== targetArray[0].id && firstKlik):
      console.log(2)
      numOfMoves++
      targetArray.unshift(target);
      targetArray.pop();
      ev.target.classList.remove("fa-question-circle-o");
      console.log(targetArray)
      ShowMoves()
      break
    case (checkClass && checkID !== (targetArray[1].id && targetArray[2].id)):
      console.log(3)
    break
  }

}
// document.addEventListener("click", comperFunktion);
// function comperFunktion(eve) {
//   console.log(otwarteOkna);
//   console.log(firstKlik);
//   let clsTarget = eve.target.classList[1];
//   let idTarget = eve.target.id;
//   let klik = eve.target;
//   let targFa = eve.target.classList[0] == "fa";

  // if(!firstKlik){    
  //   targetArray.unshift(klik);
  //   targetArray.pop();
  //   firstKlik = true;
  //   numOfMoves++
  //   otwarteOkna++
  //   eve.target.classList.remove("fa-question-circle-o");
  //   // ShowMoves()

  // }

  // if (targFa && idTarget !== targetArray[0].id) {
  //   targetArray.unshift(klik);
  //   targetArray.pop();
  //   eve.target.classList.remove("fa-question-circle-o");
  //   console.log(targetArray)


  // if (firstKlik && targetArray[1].id !== idTarget) {
  //   closingOpenedTile(eve);
  //   numOfMoves++;
  //   otwarteOkna++;
  //   console.log("piersze if");
  // }
  // if (
  //   targetArray[1].classList[1] == clsTarget &&
  //   targetArray[1].id !== idTarget &&
  //   otwarteOkna == 2
  // ) {
  //   console.log("takie same po porownaniu");
  //   document.getElementById(`${targetArray[1].id}`).id = "hidden";
  //   document.getElementById(`${idTarget}`).id = "hidden";
  //   console.log("var otwarte okna: " + otwarteOkna);
  // } 
  // else {
  //   closingOpenedTile(eve);
  //   console.log(
  //     "warnunek cls: " + targetArray[1].classList[1] + " ==> " + clsTarget
  //   );
  //   console.log("warunek ID: " + targetArray[1].id + " ==> " + idTarget);
  // }
  // }
// }

restart();


function closingOpenedTile(ev) {
  if(otwarteOkna == 3 && eve.target.id == targetArray[1].id){
    otwarteOkna = 1
    document.getElementById(targetArray[1].id)
    .classList.add("fa-question-circle-o");
    console.log(111)
  }
  else if(otwarteOkna == 3 && eve.target.id == targetArray[2].id){
    otwarteOkna = 1
    document.getElementById(targetArray[1].id)
    .classList.add("fa-question-circle-o");
    console.log(222)
  }
  else if (otwarteOkna == 3)  { 
    otwarteOkna = 1;
    document.getElementById(targetArray[1].id)
      .classList.add("fa-question-circle-o");
    document.getElementById(targetArray[2].id)
      .classList.add("fa-question-circle-o");
      console.log(333)

    console.log(
      "zamyka cls and id: " + targetArray[1].classList[1],
      targetArray[1].id + " and " + targetArray[2].classList[1],
      targetArray[2].id
    );
  }

  console.log("otwrte okan z funcji " + otwarteOkna);
  ShowMoves();
} 