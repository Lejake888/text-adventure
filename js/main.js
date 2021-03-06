let message1 = "Welcome to the 'text-based adventure' game! This game will include a few puzzle to test you, as well as choices that will determine your path throughout the game. Will you be able to win? Press the 'Next' button to continue.";
let message2 = "If you are given a choice, you must input the number assigned to that item. For example, you will be given a list of items (1- Torch) (2- Key) (3- Knife). If you want to pick up the 'Torch', you would input the number '1'. Once you pick up that item, it is in your inventory and will not be available for you to pick up. Each item takes up a space in your inventory. Bigger items take up more space. There will be way to increase your storage space throughout the game, but by default, you have an inventory size of 4. To use an item, click the 'Use Item' button.";
let message3 = "The game will start after this screen... good luck";
let message4 = "You start off in a very dark room, with a single lightbulb hanging over your head. There are three items on the floor, pick up what you want, if anything (1- Torch) (2- Key) (3- Knife)";
let message5 = "It's still very dark, and you can barely see in front of you. You won't be able to move on if you want to continue...";

let message6 = "You walk through the door and there is a lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam molestiae, nisi incidunt magnam eum natus quibusdam doloremque repellendus fugiat aliquam eius a cum, necessitatibus tempora possimus dolor ipsum sunt expedita."

let puzzle1 = "You turn on the torch, and it instantly becomes easier to see. You look around the room to see three doors ahead. (1- Blue) (2- Yellow) (3-Red)"

let stage1Array = [message1, message2, message3, message4, message5]
let stage2Array = [message6]
let puzzleArray = [puzzle1]

// let speed = 50; 
// let speed = 30; 
let speed = 1; 
let characterCount = 0;
let messageCounter = 0;
let puzzleCounter = 0;

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

const dropItem = () => {
  document.getElementById("log").style.color = "blue";
  document.getElementById("displayBox").innerHTML = ``
  document.getElementById("log").innerHTML = `What item would you like to drop:<br>`
  for (i=0; i < player.storage.length; i++) {
    document.getElementById("log").innerHTML += `- ${player.storage[i].name}<br>`
  }
  removeItem(player.storage[choice-1])
}

const removeItem = (used) => {
  for (i = 0; i < player.storage.length; i++) {
    if (used.name == player.storage[i].name) {
      player.storage.splice(i,1)
    }
  }
}

const useItem = () => {
  document.getElementById("log").style.color = "red";
  document.getElementById("displayBox").innerHTML = ``
  document.getElementById("log").innerHTML = `What item would you like to use:<br>`
  for (i=0; i < player.storage.length; i++) {
    document.getElementById("log").innerHTML += `- ${player.storage[i].name}<br>`
  }
  return player.storage[choice-1]
}

const duplicateCheck = (item) => {
  for (i = 0; i < player.storage.length; i++) {
    if (item.name == player.storage[i].name) {
      return true
    }
  }
  return false 
}

const itemPickup = (choice) => {
  // Add a check for message counter
  if (choice == 1) {
    item = new Items("Torch", 1)
  }
  else if (choice == 2) {
    item = new Items("Key", 1)
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
    document.getElementById("displayBox").innerHTML = `You have picked up the: ${item.name}<br>`
    document.getElementById("displayBox").innerHTML += `Inventory space: ${player.storage.length}<br>`
    document.getElementById("displayBox").innerHTML += `Inventory:<br>`
    for (i=0; i < player.storage.length; i++) {
      document.getElementById("displayBox").innerHTML += `- ${player.storage[i].name}<br>`
    }
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
    if (messageCounter > 0) {
      messageCounter--
    }
  }
  displayText(stage1Array[messageCounter])
}

const clearLog = (bool) => {
  document.getElementById("log").innerHTML = ""
  nextMessage(bool)
}

const displayText = (currentText) => {
  document.getElementById("log").style.color = "lime";
  nextButton.style.display = "none";
  previousButton.style.display = "none";
  useItemButton.style.display = "none";
  dropItemButton.style.display = "none";
  inputBox.style.display = "none";
  document.getElementById("displayBox").innerHTML = ""

  if (characterCount < currentText.length) {
    document.getElementById("log").innerHTML += currentText.charAt(characterCount);
    characterCount++;
    setTimeout(() => {displayText(currentText)}, speed)
  }
  else {
    if (currentText == message4) {
      inputBox.style.display = "inline";
    }
    
    nextButton.style.display = "inline";
    previousButton.style.display = "inline";
    useItemButton.style.display = "inline";
    dropItemButton.style.display = "inline";
  }
}

let inputBox = document.getElementById("inputBox")
let nextButton = document.getElementById("nextButton")
let previousButton = document.getElementById("previousButton")
let useItemButton = document.getElementById("useItemButton")
let dropItemButton = document.getElementById("dropItemButton")

nextButton.addEventListener("click", () => {
  clearLog(true)
});

previousButton.addEventListener("click", () => {
  clearLog(false)
});

useItemButton.addEventListener("click", () => {
  inputBox.style.display = "inline";
  useItem()
});

dropItemButton.addEventListener("click", () => {
  inputBox.style.display = "inline";
  dropItem()
});

inputButton.addEventListener("click", () => {
  choice = document.getElementById("inputField").value;
  if (messageCounter == 3) {
    collectItem(choice)
  }
  else {
    let used = useItem()
    if (messageCounter == 4) {
      if (used.name == "Torch") {
        document.getElementById("log").innerHTML = ""
        characterCount = 0;
        displayText(puzzleArray[puzzleCounter])
        puzzleCounter++
        removeItem(used)
      }
      else {
        document.getElementById("displayBox").innerHTML = `Using the "${used.name}" did nothing<br>`
      }
    }
  }
});

// Test upload to github

window.onload = () => {
  displayText(message1)
}