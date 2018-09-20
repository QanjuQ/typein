const data = [
  "jazzy", "fuzzy", "muzzy", "whizz", "above", "fezzy", "fluid", "lewis", "feast",
  "quick", "junky", "quiff", "unzip", "abuse", "crazy", "blood", "large", "large",
  "boost", "break", "brief", "cable", "cause", "built", "chase", "label", "horse",
  "daily", "draft", "debut", "dress", "eager", "earth", "elite", "guess", "lease",
  "hello", "enjoy", "fight", "flash", "flour", "focus", "chose", "frame", "fault",
  "front", "giant", "hurry", "image", "Henry", "issue", "Japan", "Italy", "human",
  "being", "blush", "India", "laser", "laugh", "layer", "mayor", "Roman", "Solve",
  "smart", "shown", "slide", "spare", "spill", "worry", "cloud", "forum", "fiber",
  "yield", "white", "witch", "voice", "vital", "usage", "video", "watch", "exact",
  "trade", "tower", "start", "trial", "trend", "think", "study", "stood", "store",
  "steam", "stage", "solid", "shirt", "words", "since", "skill", "right", "since",
  "plate", "depth", "photo", "pilot", "phase", "flute", "peace", "ocean", "noise",
  "shoot", "shell", "sheet", "shall", "ready", "range", "rapid", "rural", "false",
  "world", "proud", "quiet", "quite", "prize", "pound", "press", "place", "flesh",
  "media", "mayor", "lying", "magic", "death", "seven", "diver", "driver", "drink"];

var word = "",dragon;
let game,index=0;

const finishLine = 1200, deathPoint = 600;

const changeClass = function(){
  let para = document.getElementsByClassName("letters")[0];
  para.className = "blue";
};

const updateTextArea = function(value){
  document.getElementById('textArea').innerText = value;
};

const displayWord = function() {
    word = randomWord();
    let challenge = word.split('');
    let insertSpan = function(letter){
      return '<span class = "letters">' + letter + '</span>\n';
    };
    challenge = challenge.map(insertSpan);
    challenge = challenge.join('');
    document.getElementById('textArea').innerHTML = challenge;
};


const moveRight = function(distance){
  game.increasePositionBy('left',distance);
  dragon.style.left = game.left + "px";
};

const fallDown = function(distance){
  game.increasePositionBy('top',distance);
  dragon.style.top = game.top + "px";
};

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const setToInitialPos = function(){
  dragon.style.top = game.top + "px";
  dragon.style.left = game.left + "px";
};

const setToTop = function(){
  game.top = 100;
  dragon.style.top = game.top + "px";
};

const compareWord = function(event){
  if(word[index] == event.key){
    index++;
    changeClass();
  }
  if(index == word.length){
    moveRight(40);
    setToTop();
    index=0;
    displayWord();
  }
};

const onDeath = function(interval){
  clearInterval(interval);
  updateTextArea('oops!!! Dragon died');
  dragon.src = "fire1.gif";
  setTimeout(()=>{
    dragon.className = "buring";
  },500);
  document.getElementById('start').style.visibility = "visible";
  setTimeout(location.reload,3000);
};

const whenGameFinished = function(interval){
  clearInterval(interval);
  updateTextArea("Hurray!!! Dragon reached home");
  setTimeout(function(){
    document.getElementById('start').style.visibility = "visible";
  },2000);
};

const startGame = function(){
  index = 0;
  let interval = window.setInterval(function(){
    if(game.hasFinished(finishLine)){
      whenGameFinished(interval);
    }
    if(game.isAlive(deathPoint)){
      game.increasePositionBy('top',10);
      dragon.style.top = game.top + "px";
    }else{
      onDeath(interval);
    }
  },70);
};

const randomWord = function(){
  let index = Math.floor(Math.random()*data.length);
  return data[index];
};

const loadGame = function(){
  displayWord();
  startGame();
};


let values = ["type in the letter to move forward",3,2,1];
let counter = 0;

const start = function(){
  dragon = document.getElementById('dragon');
  dragon.src = "dragon.gif";
  game = new Game('anju',100,0);
  setToInitialPos(0);
  counter = 0;
  document.getElementById('start').style.visibility = "hidden";
  setTimeout(changeTextArea, 1000);
  setTimeout(changeTextArea, 2000);
  setTimeout(changeTextArea, 3000);
  setTimeout(changeTextArea, 4000);
  setTimeout(loadGame,5000);
};


const changeTextArea = function(){
  document.getElementById('textArea').innerText = values[counter];
  counter++;
};

const addListeners = function(){
  document.getElementById('start').addEventListener("click",start);
  window.onkeypress = compareWord;
};

window.onload = addListeners;
