var player = "×";
var computer = "○";
var currentTurn = "Player";
var first = "Player";
var compScore = 0;
var playerScore = 0;
var isWinner = false;

function minimax(board, turn, operation, depth){
  var spotsLeft = board.reduce(function(accum,value,index){if(value===""){accum.push(index);}return accum},[]);
  var arr = [];
  for(var each in spotsLeft){
    var currentBoard = board.slice(0);
    currentBoard[spotsLeft[each]] = turn;
    var currentScore = score(gameStatus(currentBoard)[0]);
    if(currentScore !== null){
      arr.push([currentScore, depth]);
    }
    else if(currentScore === null && turn === computer && operation === "max"){
      arr.push(minimax(currentBoard, player, "min", depth+1));
    }
    else if(currentScore === null && turn === computer && operation === "min"){
      arr.push(minimax(currentBoard, player, "max", depth+1));
    }
    else if(currentScore === null && turn === player && operation === "max"){
      arr.push(minimax(currentBoard, computer, "min", depth+1));
    }
    else if(currentScore === null && turn === player && operation === "min"){
      arr.push(minimax(currentBoard, computer, "max", depth+1));
    }
  }
  if(operation === "max" && depth === 0){
    var max = arr[0];
    var maxIndex = spotsLeft[0];
    for(each in arr){
      if(arr[each][0] > max[0]){
        max = arr[each];
        maxIndex = spotsLeft[each];
      }
      else if(arr[each][0] === max[0] && arr[each][1] < max[1]){
        max = arr[each];
        maxIndex = spotsLeft[each];
      }
    }
    return maxIndex;
  }
  else if(operation === "max" && depth !== 0){
    var max = arr[0];
    for(each in arr){
      if(arr[each][0] > max[0]){
        max = arr[each];
      }
    }
    return max;
  }
  else {
    var min = arr[0];
    for(each in arr){
      if(arr[each][0] < min[0]){
        min = arr[each];
      }
    }
    return min;
  }
}

function computerTurn(board, turn){
  var spots = [".s1",".s2",".s3",".s4",".s5",".s6",".s7",".s8",".s9"];
  var numberSpots = spots.reduce(function(accum,value){if($(value).text() === ""){accum += 1;}return accum;},0);
  if(numberSpots === 9){
    first = currentTurn;
  }
  var idealIndex = minimax(board, turn, "max", 0);
  var idealMove = spots[idealIndex];
  $(idealMove).text(computer);
  board[idealIndex] = turn;
  currentTurn = "Player";
  alertWinner(gameStatus(board));
}

function gameStatus(board, game){
  var row1 = board[0] + board[1] + board[2];
  var row2 = board[3] + board[4] + board[5];
  var row3 = board[6] + board[7] + board[8];
  var col1 = board[0] + board[3] + board[6];
  var col2 = board[1] + board[4] + board[7];
  var col3 = board[2] + board[5] + board[8];
  var dia1 = board[0] + board[4] + board[8];
  var dia2 = board[2] + board[4] + board[6];
  var winner = "";
  var winningGame = [];

  if(row1==="×××"){
    winner = "×";
    winningGame = [0,1,2];
  }
  else if(row2==="×××"){
    winner = "×";
    winningGame = [3,4,5];
  }
  else if(row3==="×××"){
    winner = "×";
    winningGame = [6,7,8];
  }
  else if(col1==="×××"){
    winner = "×";
    winningGame = [0,3,6];
  }
  else if(col2==="×××"){
    winner = "×";
    winningGame = [1,4,7];
  }
  else if(col3==="×××"){
    winner = "×";
    winningGame = [2,5,8];
  }
  else if(dia1==="×××"){
    winner = "×";
    winningGame = [0,4,8];
  }
  else if(dia2==="×××"){
    winner = "×";
    winningGame = [2,4,6];
  }
  else if(row1==="⚬⚬⚬"){
    winner = "⚬";
    winningGame = [0,1,2];
  }
  else if(row2==="⚬⚬⚬"){
    winner = "⚬";
    winningGame = [3,4,5];
  }
  else if(row3==="⚬⚬⚬"){
    winner = "⚬";
    winningGame = [6,7,8];
  }
  else if(col1==="⚬⚬⚬"){
    winner = "⚬";
    winningGame = [0,3,6];
  }
  else if(col2==="⚬⚬⚬"){
    winner = "⚬";
    winningGame = [1,4,7];
  }
  else if(col3==="⚬⚬⚬"){
    winner = "⚬";
    winningGame = [2,5,8];
  }
  else if(dia1==="⚬⚬⚬"){
    winner = "⚬";
    winningGame = [0,4,8];
  }
  else if(dia2==="⚬⚬⚬"){
    winner = "⚬";
    winningGame = [2,4,6];
  }
  else if(board.indexOf("") === -1){
    winner = "Tie"
    winningGame = [0,1,2,3,4,5,6,7,8];
  }
  return [winner, winningGame];
}

function score(winner){
  switch(winner){
    case computer:
      return 1;
    case player:
      return -1;
    case "Tie":
      return 0;
    default:
      return null;
  }
}

function alertWinner(status){
  var spots = [".s1",".s2",".s3",".s4",".s5",".s6",".s7",".s8",".s9"];
  var arrStyle = status[1];
  for(each in arrStyle){
    $(spots[arrStyle[each]]).addClass("win-style");
  }
  switch(status[0]){
    case computer:
      isWinner = true;
      var message = "YOU LOSE";
      var emoji = "😳";
      compScore += 1;
      break;
    case player:
      isWinner = true;
      var message = "YOU WIN!!";
      var emoji = "🍕"
      playerScore += 1;
      break;
    case "Tie":
      isWinner = true;
      var message = "TIED GAME";
      var emoji = "😺"
      break;
  }
  if(status[0] !== ""){
    $(".winner-msg").text(message);
    $(".emoji").text(emoji);
    $(".comp-score").text(compScore);
    $(".player-score").text(playerScore);
    $(".board").fadeOut(2000,function(){
      $(".winner").fadeIn(2000,function(){
        clearBoard();
        $(".winner").fadeOut(2000,function(){
          $(".board").fadeIn(2000);
        });
      });
    });
  }
}

function clearBoard(){
  isWinner = false;
  $("[class^='s']").empty();
  $("[class^='s']").removeClass("win-style");
  var spots = [".s1",".s2",".s3",".s4",".s5",".s6",".s7",".s8",".s9"];
  var currentBoard = spots.map(function(x){return $(x).text();});
  if(first === "Player"){
    currentTurn = "Computer";
    first = "";
    computerTurn(currentBoard,computer);
  }
  else if(first === "Computer"){
    currentTurn = "Player";
    first = "";
  }
}

$(document).ready(function(){
  $(".board").hide();
  $(".winner").hide();
  $(".settings").show();

  $(".reset").click(function(){
    $("[class^='s']").empty();
    $(".board").hide();
    $(".score").hide();
    $(".settings").show();
    compScore = 0;
    playerScore = 0;
    currentTurn = "Player";
    $(".comp-score").text(compScore);
    $(".player-score").text(playerScore);
  });

  $(".X").click(function(){
    player = "×";
    computer = "⚬";
    $(".settings").hide();
    $(".board").show();
  });

  $(".O").click(function(){
    player = "⚬";
    computer = "×";
    $(".settings").hide();
    $(".board").show();
  });

  $("[class^='s']").click(function(){
    var spots = [".s1",".s2",".s3",".s4",".s5",".s6",".s7",".s8",".s9"];
    var numberSpots = spots.reduce(function(accum,value){if($(value).text() === ""){accum += 1;}return accum;},0);
    if(numberSpots === 9){
      first = currentTurn;
    }
    if(currentTurn === "Player" && $(this).text() === "" && isWinner === false){
      $(this).text(player);
      currentTurn = "Computer";
      var currentBoard = spots.map(function(x){return $(x).text();});
      var winner = gameStatus(currentBoard);
      alertWinner(winner);
      if(winner[0] === ""){
        setTimeout(function(){
          computerTurn(currentBoard, computer);
        },500);
      }
    }
  });
});
