let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let brain;

let r,g,b;

let which = "black";

function pickColor() {
  r = Math.floor(Math.random() * 255)
  g = Math.floor(Math.random() * 255)
  b = Math.floor(Math.random() * 255)
}

function setup () {
  pickColor();
  canvas.width = 600;
  canvas.height = 300;

  brain = new NeuralNetwork(3, 3, 2);



  // automate the training
  for (let i = 0; i < 100000; i++) {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255);

    let targets = trainColor(r,g,b);

    let inputs = [r / 255, g/ 255, b / 255];

    brain.train(inputs, targets)
  }

  draw()
}

function colorPredictor(r, g, b) {

  let inputs = [r / 255, g / 255, b / 255];
  
  let outputs = brain.predict(inputs);

  if (outputs[0] > outputs[1]) {
    return "black";
  } else {
    return "white"
  }

  console.log(outputs);
  // if (r + g + b > 300) {
  //   return "black"
  // } else {
  //   return "white"
  // }
}

function trainColor(r,g,b) {
  if (r + g + b > 300) {
    return [0, 1]
  } else {
    return [1, 0]
  }
}

window.addEventListener('click', function (ev) {
  // let targets;
  // let inputs = [r / 255, g / 255, b / 255];
  // if (ev.clientX > canvas.width / 2) {
  //   targets = [1, 0];
  // } else {
  //   targets = [0, 1];
  // }

  // brain.train(inputs, targets)

  pickColor();
})

function draw() {
  ctx.fillStyle = "rgb("+r+", "+g+", "+b+")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 4;
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();


  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("black", 150, 100);
  ctx.fillStyle = " white";
  ctx.fillText("white", 450, 100);

  let which = colorPredictor(r,g,b);

  if (which === "black") {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.ellipse(150, 200, 30, 30, 45 * Math.PI / 180, 0, 2 * Math.PI);
    ctx.fill();
  } else {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(350, 200, 30, 30, 45 * Math.PI / 180, 0, 2 * Math.PI);
    ctx.fill();
  }
  window.requestAnimationFrame(draw)
}

setup();