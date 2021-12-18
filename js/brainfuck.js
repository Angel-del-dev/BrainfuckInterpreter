const run = document.getElementById("interpret");
const response = document.getElementById("response");

function interpreter(text = null) {
  
  let tape = Array(30).fill(0);

  if(text == null) {
    displayTape(tape);
    return false;
  }
  
  const currentDate = new Date();
  const currentTime = currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();

  let italic = document.createElement("i");
  italic.innerHTML = `(${currentTime})`;

  let output = italic.innerHTML;

  let ptr = 0;
  let isLooping = false;
  let loopStack = [];
  let innerLoops = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (isLooping) {
      if (char === "[") innerLoops++;
      if (char === "]") {
        if (innerLoops === 0) isLooping = false;
        else innerLoops--;
      }
      continue;
    }

    switch (char) {
      case "+":
        tape[ptr]++;
        break;
      case "-":
        tape[ptr]--;
        break;
      case ">":
        ptr++;
        tape[ptr] = tape[ptr] || 0;
        break;
      case "<":
        ptr--;
        tape[ptr] = tape[ptr] || 0;
        break;
      case ".":
        output += translateToText(tape[ptr]);
        break;
      case ",":
        // User input
        tape[ptr] = prompt()[0].charCodeAt();
        break;
      case "[":
        tape[ptr] === 0 ? (isLooping = true) : loopStack.push(i);
        break;
      case "]":
        tape[ptr] !== 0
          ? (i = loopStack[loopStack.length - 1])
          : loopStack.pop();
        break;
      default:
        break;
    }
  }
  displayTape(tape);

  let newDiv = document.createElement("div");
  newDiv.append(output);

  response.prepend(newDiv);
}

function displayTape(tape, displayer = true) {

  const tapeContainer = document.getElementById("tape");
  let newTape = "";
  newTape += "[";

  for(let i = 0 ; i < tape.length ; i++) {
    let tapeBlock = translateToText(tape[i]);

    if (i<tape.length-1) tapeBlock+= ",";
    newTape += tapeBlock;
  }

  newTape += "]";

  tapeContainer.innerHTML = newTape;
}

function translateToText(text) {
  return String.fromCharCode(text);
}

run.addEventListener("click", function () {
  let textToInterpret = document.getElementById("interpreter").value;
  interpreter(textToInterpret);
});

interpreter();
