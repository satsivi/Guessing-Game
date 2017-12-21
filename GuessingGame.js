 // - Game
 // - Game.prototype.playersGuessSubmission
 // - Game.prototype.checkGuess
 // - Game.prototype.difference
 // - Game.prototype.isLower
 // - Game.prototype.provideHint
 // - generateWinningNumber
 // - newGame
 // - shuffle

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
  if(this.playersGuess === this.winningNumber){
    return "You Win!";
  }else if(this.pastGuesses.indexOf(this.playersGuess) > -1){
    return "You have already guessed that number.";
  }else{
    this.pastGuesses.push(this.playersGuess);
  }

  if(this.pastGuesses.length === 5){
    return "You Lose.";
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
