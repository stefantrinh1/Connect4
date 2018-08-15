console.log("Welcome to Connect 4");

// using jquery collect all the cells in the cells variable.
var columnsarray = $("table td")
var rowsarray = $("table tr")
var informationbox = $("#infobox")
turn = "red"

$(".btn-warning").on("click",function() {
  $(".intro-text").fadeOut(750);
  $(".board-screen").fadeIn(1500);
  $(".board-screen").hide().show('.board-screen');
  $(informationbox).text("Player One To Start - Red Chip")

})

//===========================

  $('.board button').on('click',function() {
    var col = $(this).closest("td").index();
    var row = $(this).closest("tr").index();
    var rowIndex = rowEmpty(col);
    if (rowIndex == undefined) {alert("Invalid Move, please try again");return }
    var selectedcell = changeColor(rowIndex,col);
    checkwin(rowIndex,col,selectedcell);
    changePlayer()
})

function changePlayer(){
  if (turn === "red") {playerTwo()}
  else if (turn === "yellow") {playerOne()}}


function playerOne() {
  $(informationbox).text("Player One's Turn - Red");
  turn = "red"}
function playerTwo() {
  $(informationbox).text("Player Two's Turn - Yellow");
  turn = "yellow"}

// the row empty func finds the lowest empty row in the selected column
function rowEmpty(col) {
  var colorReport = checkColor(5, col)
  for (var row = 5; row >-1 ; row--) {
   colorReport = checkColor(row, col);
   if (colorReport === "rgb(128, 128, 128)" ) {
     return row}
  }}


function checkColor(row, col) {
  return rowsarray.eq(row).find("td").eq(col).find("button").css("background-color");
}

function changeColor(row,col) {
  var selectedcell = rowsarray.eq(row).find("td").eq(col).find("button")
  $(selectedcell).css("background-color",turn);
  return selectedcell
}

function checkturn() {
  if (turn === "yellow") {turnColor = "rgb(255, 255, 0)"}
  else if (turn === "red") {turnColor = "rgb(255, 0, 0)"}
  return turnColor
}

function checkwin(rowIndex,col,selectedcell) {
  checkacross(rowIndex,col);
  checkdown(rowIndex,col);
  checkForwardDiagonal(rowIndex,col);
  checkBackwardDiagonal(rowIndex,col)
}

function checkacross(rowIndex,col) {
  var acrossList = []
  var turnColor = checkturn()

  if (col < 3) {indexStart = 0; indexEnd = col+3}
  else if (col>=3) {indexStart = col-3; indexEnd =7}

  for (var i = indexStart; i < indexEnd; i++) {
    var currentCell = rowsarray.eq(rowIndex).find("td").eq(i).find("button").css("background-color")
    if (currentCell === turnColor) {
      acrossList.push(i)}}

  for (var i = 0; i < acrossList.length; i++) {
    if (acrossList[i]+1 == acrossList[i+1] && acrossList[i]+2 == acrossList[i+2] &&acrossList[i]+3 == acrossList[i+3]){
      declarewinner(turn)
    }}
  }

function checkdown(rowIndex,col) {
  var downList = []
  var turnColor = checkturn()
  var indexEnd = rowIndex+4
  var indexStart = rowIndex

  if (rowIndex<3) {
    for (var i = indexStart; i < indexEnd; i++) {
      var currentCell = rowsarray.eq(i).find("td").eq(col).find("button").css("background-color");


      if (currentCell === turnColor){
        downList.push(i);}

    for (var j = 0; j < downList.length; j++) {
      if (downList[j]+1 == downList[j+1] && downList[j]+2 == downList[j+2] &&downList[j]+3 == downList[j+3]){
        declarewinner(turn);}}}}}


function checkForwardDiagonal(rowIndex,col) {
  var currentCell = rowsarray.eq(rowIndex).find("td").eq(col).find("button").css("background-color")
  var forwardDiagonal = []

  var rowStart = rowIndex - 3
  var colStart = col - 3
  if (rowStart < 0) {colStart = Math.abs(rowIndex - col); rowStart = 0}
  if (colStart < 0) {rowStart = Math.abs(rowIndex - col); colStart = 0}

  var rowEnd = rowIndex + 3
  var colEnd = col + 3
  if (rowEnd > 5) {rowEnd = 5; colEnd = 5 - rowIndex + col;}
  if (colEnd > 6) {colEnd = 6; rowEnd = 6 - col + rowIndex;}

  for (var i = rowStart, j = colStart; i < rowEnd+1; i++, j++) {
      var currentCell = rowsarray.eq(i).find("td").eq(j).find("button").css("background-color");

      if (currentCell === turnColor){
        forwardDiagonal.push(i);}}

  for (var x = 0; x < forwardDiagonal.length; x++) {
      if (forwardDiagonal[x]+1 == forwardDiagonal[x+1] && forwardDiagonal[x]+2 == forwardDiagonal[x+2] &&forwardDiagonal[x]+3 == forwardDiagonal[x+3]){
        declarewinner(turn); }}}

function checkBackwardDiagonal(rowIndex,col) {
  var currentCell = rowsarray.eq(rowIndex).find("td").eq(col).find("button").css("background-color")
  var backwardDiagonal = []
  var turnColor = checkturn()
  var rowStart = rowIndex + 3
  var colStart = col - 3

  if (rowIndex > 2 && col < 3) {
    var rowDiff = Math.abs(rowStart - 5)
    var colDiff = Math.abs(colStart - 0)
    if (rowDiff > colDiff) { var correctDiff = rowDiff}
    else {var correctDiff = colDiff}
    var colStart = colStart + correctDiff
    var rowStart = rowStart - correctDiff}

  else if (rowIndex >= 3){
    var rowDiff = (rowStart - 5) //always postive since rowstart will always be higher than 5
    var rowStart = 5
    var colStart = colStart + rowDiff}

  else if (col <= 2) {
    var colDiff = colStart - 0 // this is always going to be negative  as will be no higher than -1 or lower than -3
    var colStart = 0
    var rowStart = rowStart + colDiff}

  var rowEnd = rowIndex - 3
  var colEnd = col + 3

  if (rowIndex <= 2 && col >=4) {
    var rowDiff = Math.abs(rowEnd - 0) //this will always be a negative number
    var colDiff = Math.abs(colEnd - 6)// this will always be a postive number
    if (rowDiff>colDiff) {var correctDiff = rowDiff}
    else {var correctDiff = colDiff}
    var colEnd = colEnd - correctDiff
    var rowEnd =  rowEnd + correctDiff}

  else if (rowIndex <=2) {
    var rowDiff = rowEnd - 0  //always negative since row
    var rowEnd = 0
    var colEnd = colEnd - rowDiff}

  else if (col >= 4) {
    var colDiff = colEnd - 6; // this is always going to be Positve
    var colEnd = 6;
    var rowEnd = rowEnd + colDiff;}

  for (var i = rowStart, j = colStart; i > rowEnd-1; i--, j++) {
      var currentCell = rowsarray.eq(i).find("td").eq(j).find("button").css("background-color");
      // console.log("cc= "+currentCell);
      // console.log("tc= "+turnColor);
      if (currentCell === turnColor){backwardDiagonal.push(j);}}


  for (var b = 0; b < backwardDiagonal.length; b++) {
      if (backwardDiagonal[b]+1 == backwardDiagonal[b+1] && backwardDiagonal[b]+2 == backwardDiagonal[b+2] &&backwardDiagonal[b]+3 == backwardDiagonal[b+3]){
        declarewinner(turn); }}}

function declarewinner(turn){

  if (turn === "red") {
    console.log("player one wins");
    
    alert("Player One Wins - Refresh Browser To play Again")
  
  }

  else {console.log("player two wins");
    alert("Player Two Wins - Refresh Browser To play Again")
  
  }
  
  
  }


