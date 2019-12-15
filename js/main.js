let message1 = "Welcome to the 'text-based adventure' game! This game will include a few puzzle to test you, as well as choices that will determine your path throughout the game. Will you be able to win? Press the 'Next' button to continue";
let message2 = "If you are given a choice, you must press the button "
let message3 = "You start off in a very dark room, with a single lightbulb hanging over your head. There are three items on the floor (1- Torch) (2- Bread) (3- Knife)";
let message4 = "This is the 3rd message"
let messageArray = [message1, message2, message3, message4]
let speed = 50; 
let characterCount = 0;
let messageCounter = 0;

class Items {
  constructor(name) {
    this.name = name;
    this.inventorySpace = inventorySpace;
  }
}

const nextMessage = () => {
  characterCount = 0;
  messageCounter++
  displayText(messageArray[messageCounter])
}

const clearLog = () => {
  document.getElementById("log").innerHTML = ""
  nextMessage()
}

const displayText = (currentText) => {
  document.getElementById("button").style.visibility = "hidden";
  document.getElementById("inputBox").style.visibility = "hidden";

  if (characterCount < currentText.length) {
    document.getElementById("log").innerHTML += currentText.charAt(characterCount);
    characterCount++;
    setTimeout(() => {displayText(currentText)}, speed)
  }
  else {
    document.getElementById("button").style.visibility = "visible";
    document.getElementById("inputBox").style.visibility = "visible";
  }
}

let nextButton = document.getElementById("button")

nextButton.addEventListener("click", () => {
  clearLog()
});

window.onload = () => {
    displayText(message1)
}