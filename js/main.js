let characterCount = 0;
let text = "Welcome to the 'text-based adventure' game! This game will include a few puzzle to test you, as well as choices that will determine your path through the game. Will you be able to win?";
let text2 = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis earum aperiam quis dolor, neque eius autem culpa id, aspernatur minus itaque dolores officiis necessitatibus non numquam cumque maxime magni! Possimus!";

let speed = 50; 

const nextMessage = () => {
  displayText(text2)
}

const clearLog = () => {
  document.getElementById("log").innerHTML = ""
  nextMessage()
}

const displayText = (currentText) => {
  if (characterCount < text.length) {
    document.getElementById("log").innerHTML += text.charAt(characterCount);
    characterCount++;
    setTimeout(displayText, speed);
  }
  else {
    document.getElementById("button").style.visibility = "visible";
    count = 0;
  }
}

let nextButton = document.getElementById("button")

nextButton.addEventListener("click", () => {
  clearLog()
});

window.onload = () => {
    displayText(text)
}