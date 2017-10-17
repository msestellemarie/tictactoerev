var player = "X";
var computer = "O";
var turn = "Player";
var spots = [".one",".two",".three",".four",".five",".six",".seven",".eight",".nine"];
var board = [];

function computerTurn(){
  var randomNum = Math.floor(Math.random() * 8);
  if($(spots[randomNum]).text() === ""){
    $(spots[randomNum]).text(computer);
    turn = "Player";
  }
  else if(board.indexOf("") !== -1){
    computerTurn();
  }
  gameStatus();
}

function boardStatus(){
  board = spots.map(function(x){return $(x).text();});
}

function gameStatus(){
  boardStatus();

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
  else if(board.indexOf("") !== -1){
    alert("Tied game!");
    clearBoard();
  }
}

function clearBoard(){
  for(each in spots){
    $(spots[each]).empty();
  }
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

  $(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine").click(function(){
    if(turn === "Player" && $(this).text() === ""){
      $(this).text(player);
      turn = "Computer";
      gameStatus();
      computerTurn();
    }
  });
});
