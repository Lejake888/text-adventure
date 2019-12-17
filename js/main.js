let message1 = "Welcome to the 'text-based adventure' game! This game will include a few puzzle to test you, as well as choices that will determine your path throughout the game. Will you be able to win? Press the 'Next' button to continue.";
let message2 = "If you are given a choice, you must input the number assigned to that item. For example, you will be given a list of items (1- Torch) (2- Bread) (3- Knife). If you want to pick up the 'Torch', you would input the number '1'. Once you pick up that item, it is in your inventory and will not be available for you to pick up. Each item takes up a space in your inventory. Bigger items take up more space. There will be way to increase your storage space throughout the game, but by default, you have an inventory size of 4. To use an item, click the 'Use Item' button.";
let message3 = "The game will start after this screen... good luck";
let message4 = "You start off in a very dark room, with a single lightbulb hanging over your head. There are three items on the floor, pick up what you want, if anything (1- Torch) (2- Bread) (3- Knife)";
let message5 = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo magni nam quaerat optio, eaque pariatur, ex id mollitia soluta recusandae architecto quam velit repellat quod nisi tempore ipsam, ullam provident!";
let messageArray = [message1, message2, message3, message4, message5]
// let speed = 50; 
// let speed = 30; 
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

const useItem = (choice) => {
  document.getElementById("displayBox").innerHTML = ``
  document.getElementById("log").innerHTML = `What item would you like to use:<br>`
  console.log(choice)
}

const duplicateCheck = (item) => {
  console.log(item.name)
  for (i = 0; i < player.storage.length; i++) {
    if (item.name == player.storage[i].name) {
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
  let duplicated = duplicateCheck(item) 
  if (duplicated) {
    player.storage.push(item)
    player.storage.pop()
  }
  else {
    player.storage.push(item)
  }
  
  document.getElementById("displayBox").innerHTML = `You have picked up the: ${item.name}<br>`
  document.getElementById("displayBox").innerHTML += `Inventory space: ${player.storage.length}<br>`
  document.getElementById("displayBox").innerHTML += `Inventory:<br>`
  for (i=0; i < player.storage.length; i++) {
    document.getElementById("displayBox").innerHTML += `- ${player.storage[i].name}<br>`
  }
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

const nextMessage = (bool) => {
  characterCount = 0;
  if (bool) {
    messageCounter++
  }
  else {
    messageCounter--
  }
  displayText(messageArray[messageCounter])

}

const clearLog = (bool) => {
  document.getElementById("log").innerHTML = ""
  nextMessage(bool)
}

const displayText = (currentText) => {
  nextButton.style.visibility = "hidden";
  previousButton.style.visibility = "hidden";
  useItemButton.style.visibility = "hidden";
  inputBox.style.visibility = "hidden";
  document.getElementById("displayBox").innerHTML = ""

  if (characterCount < currentText.length) {
    document.getElementById("log").innerHTML += currentText.charAt(characterCount);
    characterCount++;
    setTimeout(() => {displayText(currentText)}, speed)
  }
  else {
    if (currentText == message4) {
      inputBox.style.visibility = "visible";
      console.log(player)
    }
    
    nextButton.style.visibility = "visible";
    previousButton.style.visibility = "visible";
    useItemButton.style.visibility = "visible";
  }
}

let inputBox = document.getElementById("inputBox")
let nextButton = document.getElementById("nextButton")
let previousButton = document.getElementById("previousButton")
let useItemButton = document.getElementById("useItemButton")

nextButton.addEventListener("click", () => {
  clearLog(true)
});

previousButton.addEventListener("click", () => {
  clearLog(false)
});

useItemButton.addEventListener("click", () => {
  useItem()
});

inputButton.addEventListener("click", () => {
  choice = document.getElementById("inputField").value;
  if (messageCounter == 3) {
    collectItem(choice)
  }
  else {
    useItem(choice)
  }
});

window.onload = () => {
  displayText(message1)
}