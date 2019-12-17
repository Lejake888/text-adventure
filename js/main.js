let message1 = "Welcome to the 'text-based adventure' game! This game will include a few puzzle to test you, as well as choices that will determine your path throughout the game. Will you be able to win? Press the 'Next' button to continue.";
let message2 = "If you are given a choice, you must input the number assigned to that item. For example, you will be given a list of items (1- Torch) (2- Bread) (3- Knife). If you want to pick up the 'Torch', you would input the number '1'. Each item takes up a space in your inventory. Bigger items take up more space. By default, you have an inventory size of 4.";
let message3 = "You start off in a very dark room, with a single lightbulb hanging over your head. There are three items on the floor (1- Torch) (2- Bread) (3- Knife)";
let message4 = "This is the 4th message"
let messageArray = [message1, message2, message3, message4]
// let speed = 50; 
let speed = 5; 
let characterCount = 0;
let messageCounter = 0;

let inputButton = document.getElementById("inputButton")
let choice;
let item;

class Player {
  constructor() {
    this.storage = [];
  }
  storageSpace() {
    if (this.storage.length > 3) {
      return false;
    }
    else {
      return true;
    }
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

const duplicateCheck = (item) => {
  console.log(item.name)
  for (i = 0; i < player.storage.length; i++) {
    if (item.name == player.storage[i].name) {
      // player.storage.shift(item) // Shift doesn't seem to be working, use different method, only removing first item
      console.log("Already have this item")
      document.getElementById("displayBox").innerHTML = `You already have this item in your inventory<br>`
      return true
    }
  }
  return false 
}

const itemPickup = (choice) => {
  if (choice == 1) {
    item = new Items("Torch", 1)
  }
  else if (choice == 2) {
    item = new Items("Bread", 1)
  }
  else if (choice == 3) {
    item = new Items("Knife", 1)
  }
  item.pickedUp = true
  let duplicated = duplicateCheck(item) // Order might be messed up, switch?
  if (duplicated) {
    player.storage.push(item)
    player.storage.pop()
  }
  else {
    player.storage.push(item)

  }
  
  document.getElementById("displayBox").innerHTML = `You have picked up the: ${item.name}<br>`
  document.getElementById("displayBox").innerHTML += `Inventory space: ${player.storage.length}`
}

const collectItem = (choice) => {
  let playerStorage = player.storageSpace()      
  if (playerStorage) {  
    itemPickup(choice)
  }
  else {
    document.getElementById("displayBox").innerHTML = `You do not have room in pick up this item`
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
  choice = document.getElementById("inputField").value;
  collectItem(choice)
});

window.onload = () => {
  displayText(message1)
}