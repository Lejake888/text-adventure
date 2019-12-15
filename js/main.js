let message1 = "Welcome to the 'text-based adventure' game! This game will include a few puzzle to test you, as well as choices that will determine your path through the game. Will you be able to win?";
let message2 = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis earum aperiam quis dolor, neque eius autem culpa id, aspernatur minus itaque dolores officiis necessitatibus non numquam cumque maxime magni! Possimus!";
let message3 = "This is the 3rd message"
let messageArray = [message1, message2, message3]
let speed = 50; 
let characterCount = 0;
let messageCounter = 0;

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
  if (characterCount < currentText.length) {
    document.getElementById("log").innerHTML += currentText.charAt(characterCount);
    characterCount++;
    setTimeout(() => {displayText(currentText)}, speed)
  }
  else {
    document.getElementById("button").style.visibility = "visible";
  }
}

let nextButton = document.getElementById("button")

nextButton.addEventListener("click", () => {
  clearLog()
});

window.onload = () => {
    displayText(message1)
}