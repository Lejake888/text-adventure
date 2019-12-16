let message1 = "Welcome to the 'text-based adventure' game! This game will include a few puzzle to test you, as well as choices that will determine your path throughout the game. Will you be able to win? Press the 'Next' button to continue.";
let message2 = "If you are given a choice, you must input the number assigned to that item. For example, you will be given a list of items (1- Torch) (2- Bread) (3- Knife). If you want to pick up the 'Torch', you would input the number '1'. Each item takes up a space in your inventory. Bigger items take up more space. By default, you have an inventory size of 4.";
let message3 = "You start off in a very dark room, with a single lightbulb hanging over your head. There are three items on the floor (1- Torch) (2- Bread) (3- Knife)";
let message4 = "This is the 4th message"
let messageArray = [message1, message2, message3, message4]
// let speed = 50; 
let speed = 5; 
let characterCount = 0;
let messageCounter = 0;

let choice = document.getElementById("inputBox").value;
let inputButton = document.getElementById("inputButton")


let item;

class Player {
  constructor() {
    this.storage = [];
  }
}

class Items {
  constructor(name, inventorySpace) {
    this.name = name;
    this.inventorySpace = inventorySpace;
    this.pickedUp = false;
  }
}

let player = new Player()

const collectItem = (choice) => {
  if (choice == 1) {
    item = new Items("Torch", 1)
    item.pickedUp = true
    player.storage.push(item)
    console.log(item)
  }
  else if (choice == 2) {
    item = new Items("Bread", 1)
    item.pickedUp = true
    player.storage.push(item)
    console.log(item)
  }
  else if (choice == 3) {
    item = new Items("Knife", 1)
    item.pickedUp = true
    player.storage.push(item)
    console.log(item)
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
  document.getElementById("nextButton").style.visibility = "hidden";
  document.getElementById("inputBox").style.visibility = "hidden";

  if (characterCount < currentText.length) {
    document.getElementById("log").innerHTML += currentText.charAt(characterCount);
    characterCount++;
    setTimeout(() => {displayText(currentText)}, speed)
  }
  else {
    if (currentText == message3) {
      document.getElementById("inputBox").style.visibility = "visible";
      console.log(player)
    }
    document.getElementById("nextButton").style.visibility = "visible";
  }
}

let nextButton = document.getElementById("nextButton")

nextButton.addEventListener("click", () => {
  clearLog()
});

inputButton.addEventListener("click", () => {
  collectItem(choice)
});

window.onload = () => {
  displayText(message1)
}