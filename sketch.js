function preload(){
  sound = loadSound('MrJuan.mp3');
}

function setup(){
  let cnv = createCanvas(600,600);
  cnv.mouseClicked(togglePlay);
  
  fft = new p5.FFT();
  
  // Create an Audio input from the microphone
  mic = new p5.AudioIn();
  mic.start();
  
  
  //fft.setInput(mic);
  
  sound.amp(0.5);
  
  angleMode(DEGREES)
}

function draw(){
  background(220);


  //testFrequency();
  //testMic();
  //circleFrequency();
  //triangleFrequency();
  cat();


  text('tap to play', 20, 20);
  text(str(mouseX)+","+str(mouseY), 80, 20);
  
  testTime();
}


function testTime() {
  // Analyse amplitude by time
  let waveform = fft.waveform();
  noFill();
  translate(width/2,height/2) 
  beginShape();
  stroke(0);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, -100, 100);
    let y = map( waveform[i], -1, 1, -30, 30);
    vertex(x,y);
  }
  endShape();  
  
  rotate(20)
  beginShape();
  stroke(0);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, -100, 100);
    let y = map( waveform[i], -1, 1, -30, 30);
    vertex(x,y);
  }
  endShape();  
  
  rotate(-40)
  beginShape();
  stroke(0);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, -100, 100);
    let y = map( waveform[i], -1, 1, -30, 30);
    vertex(x,y);
  }
  endShape();   
  

}

function circleFrequency() {
  bass = fft.getEnergy("bass");
  circle(300,300,bass)
  
  push()
  //scale(bass/255);
  //translate(200,100)
  /*
  beginShape();
  vertex(258,111.1) 
  vertex(242.9,120.5) 
  vertex(227.8,129.9 )
  vertex(227.2,112.1 )
  vertex(226.6,94.3 )
  vertex(242.3,102.7 )
  endShape()
  */
  //translate(200,100)
  pop()
}

function cat() {
  noStroke();
  fill(255, 0, 0);
  
  
  offsetX = 300
  offsetY = 300
  
  push()
  translate(offsetX,offsetY-40)  
  earWidth = 50
  rotate(35)
  triangle(0,0,earWidth/2,-50,earWidth,0)
  pop()
  
  push()
  translate(offsetX,offsetY-40) 
  rotate(-35)
  triangle(0,0,-earWidth/2,-50,-earWidth,0)
  pop()
  
  // Head
  circle(offsetX,offsetY,100)
  fill("black")
  circle(offsetX,offsetY,10)
  
  // Left eye
  push()
  fill("white")
  translate(offsetX-15,offsetY-15) 
  rotate(30)
  ellipse(0, 0, 20,15)    
  fill("black")
  circle(0,0,10)
  pop()
  
  // Right eye
  push()
  fill("white")
  translate(offsetX+15,offsetY-15) 
  rotate(-30)
  ellipse(0, 0, 20,15)
  fill("black")
  circle(0,0,10)
  pop()
  
  
  // Body
  fill("red")
  circle(offsetX,offsetY+120,140)
  fill("red")
  circle(offsetX,offsetY+60,40)

  ellipse(offsetX,offsetY+175,80, 40)
  
  // Tail
  push()
  noFill();
  strokeWeight(15);
  stroke("red");
  //bezier(85, 20, 10, 10, 90, 90, 15, 80);
        beginShape();
        curveVertex(300,480);
        curveVertex(300,480);
        curveVertex(370,450);
        curveVertex(400,380);
        curveVertex(430,350);
        curveVertex(450,350);
        curveVertex(450,390);
        endShape();
  pop()
  
  // Legs
  push()
  translate(offsetX-50,offsetY+165) 
  rotate(30)
  ellipse(0, 0, 80,40) 
  pop()
  push()
  translate(offsetX+50,offsetY+165) 
  rotate(-30)
  ellipse(0, 0, 80,40) 
  pop()
  
  // Mouth
  push()
  fill("white")
  circle(offsetX,offsetY+15,10)
  pop()
  
  
}

function triangleFrequency() {
  bass = fft.getEnergy("bass");
  text(str(bass), 80, 20);
  
  offsetX = 30
  offsetY = 300
  push()
  translate(offsetX,offsetY)  
  rotate(30)
  triangle(0,0,30,-30,60,0)
  pop()
  
  push()
  translate(offsetX,offsetY) 
  rotate(-30)
  triangle(0,0,-30,-30,-60,0)
  pop()
  
  /*
  push()
  offsetX = 30
  offsetY = 300
  translate(offsetX,offsetY)
  rotate(30)
  triangle(0, 0, 60-offsetX, 280-50*bass/255-offsetY, 90-offsetX, 300-offsetY);
  rotate(-60)
  triangle(0, 0, -60, -30, -90, 300-offsetY);
  pop()  */
}

function testFrequency() {
  // Analyse amplitute by frequency
  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 0);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }  
}

function testMic() {
  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  let h = map(vol, 0, 1, height, 0);
  ellipse(width / 2, h - 25, 50, 50);
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}