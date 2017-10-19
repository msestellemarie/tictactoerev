var player = "X";
var computer = "O";
var turn = "Player";
var spots = [".s1",".s2",".s3",".s4",".s5",".s6",".s7",".s8",".s9"];
var board = [];

function computerTurn(){
  var spotsLeft = spots.filter(function(x){return $(x).text()==="";});
  var randomNum = Math.floor(Math.random() * spotsLeft.length);
  if(spotsLeft.length !== 0){
    $(spotsLeft[randomNum]).text(computer);
    turn = "Player";
  }
  gameStatus();
}

function gameStatus(){
  board = spots.map(function(x){return $(x).text();});

  var row1 = board[0] + board[1] + board[2];
  var row2 = board[3] + board[4] + board[5];
  var row3 = board[6] + board[7] + board[8];
  var col1 = board[0] + board[3] + board[6];
  var col2 = board[1] + board[4] + board[7];
  var col3 = board[2] + board[5] + board[8];
  var dia1 = board[0] + board[4] + board[8];
  var dia2 = board[2] + board[4] + board[6];

  if(row1==="XXX" || row2==="XXX" || row3==="XXX" || col1==="XXX" || col2==="XXX" || col3==="XXX" || dia1==="XXX" || dia2==="XXX"){
    alert("X wins!");
    clearBoard();
  }
  else if(row1==="OOO" || row2==="OOO" || row3==="OOO" || col1==="OOO" || col2==="OOO" || col3==="OOO" || dia1==="OOO" || dia2==="OOO"){
    alert("O wins!");
    clearBoard();
  }
  else if(board.indexOf("") === -1){
    alert("Tied game!");
    clearBoard();
  }
}

function clearBoard(){
    $("[class^='s']").empty();
}

$(document).ready(function(){
  $(".board").hide();
  $(".settings").show();

  $(".X").click(function(){
    player = "X";
    computer = "O";
    $(".settings").hide();
    $(".board").show();
  });

  $(".O").click(function(){
    player = "O";
    computer = "X";
    $(".settings").hide();
    $(".board").show();
  });

  $("[class^='s']").click(function(){
    if(turn === "Player" && $(this).text() === ""){
      $(this).text(player);
      turn = "Computer";
      gameStatus();
      computerTurn();
    }
  });
});
