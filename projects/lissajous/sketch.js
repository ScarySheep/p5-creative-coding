let vector
let oldVector
let a = 255
let b = 255
let c = 255
let n = 0
let m = 0
let deltaN
let deltaM
let delta1 = 90
let delta2 = 180
let add = 0
p5.disableFriendlyErrors = true;
let _text
let canvas
let restartTime = 0

let myShader
let matcap = []
let currentImage
function setup () {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0)
  canvas.style('z-index', '-1')

  vector = createVector(0, 0, 0)
  oldVector = createVector(0, 0, 0)


  angleMode(DEGREES)
  //stroke(255)
  noStroke()
  //noFill()

  _text = createGraphics(40, 40)
  _text.fill(255)

  init()
}

function preload () {
  //source: https://github.com/aferriss/p5jsShaderExamples
  myShader = loadShader("shader.vert", "shader.frag");
  matcap[0] = loadImage("matcap.png");
  matcap[1] = loadImage("7877EE_D87FC5_75D9C7_1C78C0.png");
  matcap[2] = loadImage("515151_DCDCDC_B7B7B7_9B9B9B.png");
  matcap[3] = loadImage("422509_C89536_824512_0A0604.png");
  matcap[3] = loadImage("7B5254_E9DCC7_B19986_C8AC91.png");

}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}

function init () {
  deltaN = int(map(random(), 0, 1, 1, 10))
  deltaM = int(map(random(), 0, 1, 1, 10))
  n = deltaN
  m = deltaM
  restartTime = millis()
  currentImage = int(random() * matcap.length)
}

function mouseClicked () {
  init()
}

function draw () {
  background(0)

  shader(myShader);
  // Send the texture to the shader
  myShader.setUniform("uMatcapTexture", matcap[currentImage]);
  push()
  rotateX(delta1 / 10)
  rotateY(delta2 / 10)
  translate(0, 0, -500)
  sphere(2000, 12, 9)
  pop()
  for (let t = 0; t < 360; t += 0.8 / map(m * n, 1, 100, 1, 2)) {

    let x = a * sin(t)
    let y = b * sin(n * t + delta1)
    let z = c * sin(m * t + delta2)
    vector.set(x, y, z)
    //stroke(color(x, y, z))
    push()
    scale(map(windowWidth / 1920, 0, 1, 0.5, 1))
    translate(x, y, z);
    scale(map(z / 255, -1, 1, 0.7, 1))
    vector.normalize()
    //rotateX(atan2(-vector.z - 1, -vector.y))
    //rotateY(atan2(-vector.x, -vector.z - 1))
    //rotateZ(atan2(-vector.y, -vector.x))
    //circle(0, 0, 30)
    sphere(25, 12, 9)
    pop()
  }


  let now = (millis() - restartTime)
  if (now > 15000) {
    init()
  }

  delta1 = now / 20
  delta2 = now / 10

  _text.clear()
  _text.text("N: " + int(n * 100) / 100, 0, 10)
  _text.text("M: " + int(m * 100) / 100, 0, 30)
  image(_text, windowWidth / 2 - 60, -windowHeight / 2 + 40)
}
