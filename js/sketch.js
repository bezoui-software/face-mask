let starting_time = Date.now();
console.log('SKETCH.js');

let canvas, canvasUrl;
let video, imgs = [];
let vScale = 8;

let res;

let modes = ['effect', 'face'];
let modeIndex = 0;
let mode = modes[modeIndex];

let effectIndex = 0;
let canChangeEffect;

let faceIndex = 0;
let canChangeFace;

let captureTimer = 0;
let captureTimerMax = 10;

function setup(){
  canvas = createCanvas(640, 480);
  canvas.id('canvas');  

  video = createCapture(VIDEO);
  video.id('camera');
  video.addClass('hidden');

  res = createSlider(256, 1280, 256, 64);
  poseNet = ml5.poseNet(video);
  reload();

  let setuping_duration = Date.now() - starting_time;
  console.log('SETUP IN', setuping_duration, 'ms');
}

function reload(){
  loop();
  background(0);
  res.addClass('hidden');
  mode = modes[modeIndex];
  setup_face_masks();
}

function draw(){
  translate(vScale/4, vScale/4);

  mode = modes[modeIndex];

  if (mode == 'effect'){ 
    display_effect_name(effects[effectIndex]);
    play_effect();
    change_effect_by_covering_the_camera();
  }
  else if (mode == 'face'){ 
    display_face_name(faces[faceIndex]);
    play_face();
  }
}

function keyPressed(){
  if (key == ' ') save_image_to_gallery();
  if (key == 'ArrowUp') increase_capture_timer(); 
  if (key == 'ArrowDown') decrease_capture_timer(); 
  if (key == 'ArrowRight') next_index(); 
  if (key == 'ArrowLeft') previous_index(); 
  if (key == 'm') next_mode(); 
}
