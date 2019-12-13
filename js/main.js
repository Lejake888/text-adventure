let characterCount = 0;
let text = "Hello world!";
let speed = 75; 

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