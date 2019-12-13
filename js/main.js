let characterCount = 0;
let text = "Welcome to the 'text-based adverture' game! This game will include a few puzzle to test you, as well as choices that will determine your path through the game. Will you be able to win?";
let speed = 50; 

displayText = () => {
  if (characterCount < text.length) {
    document.getElementById("log").innerHTML += text.charAt(characterCount);
    characterCount++;
    setTimeout(displayText, speed);
  }
}

window.onload = () => {
    displayText()
}