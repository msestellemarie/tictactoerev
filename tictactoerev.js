var player = "X";
var computer = "O";
var currentTurn = "Player";
var spots = [".s1",".s2",".s3",".s4",".s5",".s6",".s7",".s8",".s9"];

function max(board, turn){
  var spotsLeft = board.reduce(function(accum,value,index){if(value===""){accum.push(index);}return accum},[]);
  var maxArr = [];
  if(spotsLeft.length === 0){
    maxArr.push(score(gameStatus(board)));
  }
  for(each in spotsLeft){
    var currentBoard = board.slice(0);
    currentBoard[spotsLeft[each]] = turn;
    var currentScore = score(gameStatus(currentBoard));
    if(currentScore !== null){
      maxArr.push(currentScore);
    }
    else if(currentScore === null && turn === computer){
      maxArr.push(min(currentBoard, player)[0]);
    }
    else if(currentScore === null && turn === player){
      maxArr.push(min(currentBoard, computer)[0]);
    }
  }
  return [Math.max(...maxArr),spotsLeft[maxArr.indexOf(Math.max(...maxArr))]];
}

function min(board, turn){
  var spotsLeft = board.reduce(function(accum,value,index){if(value===""){accum.push(index);}return accum},[]);
  var minArr = [];
  if(spotsLeft.length === 0){
    minArr.push(score(gameStatus(board)));
  }
  for(each in spotsLeft){
    var currentBoard = board.slice(0);
    currentBoard[spotsLeft[each]] = turn;
    var currentScore = score(gameStatus(currentBoard));
    if(currentScore !== null){
      minArr.push(currentScore);
    }
    else if(currentScore === null && turn === computer){
      minArr.push(max(currentBoard, player)[0]);
    }
    else if(currentScore === null && turn === player){
      minArr.push(max(currentBoard, computer)[0]);
    }
  }
  return [Math.min(...minArr),spotsLeft[minArr.indexOf(Math.min(...minArr))]];
}

function computerTurn(board, turn){
  var idealIndex = max(board, turn)[1];
  var idealMove = spots[idealIndex];
  $(idealMove).text(computer);
  board[idealIndex] = turn;
  currentTurn = "Player";
  var winner = gameStatus(board);
  if(winner === computer){
    alert("Bummer, you lost.");
    clearBoard();
  }
  else if(winner === player){
    alert("Woo, you win!");
    clearBoard();
  }
  else if(winner === "Tie"){
    alert("It's a tie.")
    clearBoard();
  }

}

function gameStatus(board){
  var row1 = board[0] + board[1] + board[2];
  var row2 = board[3] + board[4] + board[5];
  var row3 = board[6] + board[7] + board[8];
  var col1 = board[0] + board[3] + board[6];
  var col2 = board[1] + board[4] + board[7];
  var col3 = board[2] + board[5] + board[8];
  var dia1 = board[0] + board[4] + board[8];
  var dia2 = board[2] + board[4] + board[6];
  var winner = "";

  if(row1==="XXX" || row2==="XXX" || row3==="XXX" || col1==="XXX" || col2==="XXX" || col3==="XXX" || dia1==="XXX" || dia2==="XXX"){
    winner = "X";
  }
  else if(row1==="OOO" || row2==="OOO" || row3==="OOO" || col1==="OOO" || col2==="OOO" || col3==="OOO" || dia1==="OOO" || dia2==="OOO"){
    winner = "O";
  }
  else if(board.indexOf("") === -1){
    winner = "Tie"
  }
  else {
    winner = "";
  }
  return winner;
}

function score(winner){
  if(winner === computer){
    return 1;
  }
  else if(winner === player){
    return -1;
  }
  else if(winner === "Tie"){
    return 0;
  }
  else {
    return null;
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
    if(currentTurn === "Player" && $(this).text() === ""){
      $(this).text(player);
      currentTurn = "Computer";
      var currentBoard = spots.map(function(x){return $(x).text();});
      var winner = gameStatus(currentBoard);
      if(winner !== ""){
        switch(winner){
          case computer:
            alert("The computer wins!");
            break;
          case player:
            alert("You win!");
            break;
          case "Tie":
            alert("Tied game!");
            break;
        }
        clearBoard();
      }
    }
    var currentBoard = spots.map(function(x){return $(x).text();});
    computerTurn(currentBoard, computer);
  });
});
