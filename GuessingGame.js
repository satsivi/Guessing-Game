 function generateWinningNumber(){
  return Math.floor(Math.random() * (100)) + 1;
 }

function shuffle(arr){
  var m = arr.length;
  var i, t;
  while(m){
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
  if(this.playersGuess > this.winningNumber){
    return false;
  }else{
    return true;
  }
}

Game.prototype.playersGuessSubmission = function(g){
  this.playersGuess = g;
  if(g < 1 || g > 100 || isNaN(g)){
    throw "That is an invalid guess.";
  }else{
    return this.checkGuess();
  }
}

Game.prototype.checkGuess = function(){
  if(this.pastGuesses.length >= 5){
    $('#subtitle').text("Press Reset to play again!");
    $('#hintBtn').attr('disabled', true);
    $('#guess-button').attr('disabled', true);
    return "You Lose.";
  }
  if(this.playersGuess === this.winningNumber){
    return "You Win!";
  }else if(this.pastGuesses.indexOf(this.playersGuess) > -1){
    return "You have already guessed that number.";
  }else{
    this.pastGuesses.push(this.playersGuess);
    $('#guessList li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
  }
  if(this.isLower()){
    $('#subtitle').text("Guess higher!");
    }else{
      $('#subtitle').text("Guess lower!");
  }


  var guessDiff = this.difference();

  if(Math.abs(guessDiff < 10)){
    return 'You\'re burning up!';
  }else if(guessDiff < 25){
    return 'You\'re lukewarm.';
  }else if(guessDiff < 50){
    return 'You\'re a bit chilly.';
  }else{
    return 'You\'re ice cold!'
  }
}

function newGame(){
  return new Game();
}

Game.prototype.provideHint = function(){
  var hArr = [this.winningNumber];
  for(var i = 0; i < 2; i++){
    hArr.push(generateWinningNumber());
  }
  return shuffle(hArr);
}

function guessMaker(gameInst){
  var guess = +$('#guess-input').val();
  var str = "";
  $('#guess-input').val("");
  $('#title').text(gameInst.playersGuessSubmission(guess));
}

$(document).ready(function(){
  var game = newGame();

  $("#guess-button").on('click', function(){
    guessMaker(game);
  });

  $('#guess-input').on('keydown', function(e){
    var key = e.which;
    if(key === 13){
      guessMaker(game);
    }
  });

  $('.reset').on('click', function(){
    game = newGame();
    $('#title').text('Guessing Game');
    $('#subtitle').text('Guess a number between 1-100!')
    $('.guess').text('-');
    $('#hintBtn, #guess-button').attr('disabled', false);
  });

  $('#hintBtn').on('click', function(){
    var hints = game.provideHint().join(', ');
    $('#title').text("The answer is one of the following: " + hints);
    $(this).attr('disabled', true);
  })
});
