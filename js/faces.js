let faces = [make_funny_face];

let poseNet;
let parts = {nose: {x: -1, y: -1}, leftEye: {x: -1, y: -1}, rightEye: {x: -1, y: -1}, leftEar: {x: -1, y: -1}, rightEar: {x: -1, y: -1}}

function make_funny_face(video){
  video.size(width, height);
  let t = 0;
  noLoop();
  poseNet.removeAllListeners();
  poseNet.on('pose', (poses)=>{
    background(0);
    cast_video_on_canvas(video);
    got_poses(poses); 

    let distanceBetweenEyes = dist(parts.leftEye.x, parts.leftEye.y, parts.rightEye.x, parts.rightEye.y);
    let initialSize = distanceBetweenEyes;

    push();
    //DRAWING THE LEFT EYE
    fill(255);
    ellipse(parts.leftEye.x, parts.leftEye.y, initialSize/2);

    //DRAWING THE LEFT EYE IRIS
    fill(0);
    let leftEyeIrisX = map(noise(t), 0, 1, parts.leftEye.x - initialSize/8, parts.leftEye.x + initialSize/8);
    let leftEyeIrisY = map(noise(t), 0, 1, parts.leftEye.y - initialSize/8, parts.leftEye.y + initialSize/8);
    ellipse(leftEyeIrisX, leftEyeIrisY, initialSize/4);

    //DRAWING THE RIGHT EYE
    fill(255);
    ellipse(parts.rightEye.x, parts.rightEye.y, initialSize/2);

    //DRAWING THE RIGHT EYE IRIS
    fill(0);
    let rightEyeIrisX = map(noise(t), 0, 1, parts.rightEye.x - initialSize/8, parts.rightEye.x + initialSize/8);
    let rightEyeIrisY = map(noise(t), 0, 1, parts.rightEye.y - initialSize/8, parts.rightEye.y + initialSize/8);
    ellipse(rightEyeIrisX, rightEyeIrisY, initialSize/4);

    //DRAWING THE NOSE
    fill(255, 0, 0);
    ellipse(parts.nose.x, parts.nose.y, initialSize);
    pop();

    t += 0.1;  
  });
}

function make_mask(video, img){
  if (!masks[img]) return;
  noLoop();
  video.size(width, height);
  poseNet.removeAllListeners();
  poseNet.on('pose', (poses)=>{
    background(0);
    cast_video_on_canvas(video);
    got_poses(poses); 

    let distanceBetweenEyes = dist(parts.leftEye.x, parts.leftEye.y, parts.rightEye.x, parts.rightEye.y);
    let rotation = get_angle_of(parts.leftEye.x, parts.leftEye.y, parts.rightEye.x, parts.rightEye.y);
    let initialSize = distanceBetweenEyes;

    push();
    translate(parts.nose.x, parts.nose.y);
    rotate(radians(rotation + 180));
    imageMode(CENTER);
    let mask = masks[img];
    image(mask, 0, 0, mask.width * (initialSize/60), mask.height * (initialSize/60));
    pop();
  });
}

function got_poses(poses){
  if (!poses  || poses.length == 0 || poses == undefined) return;
    
  let smothness = 1;

  newNoseX = poses[0].pose.keypoints[0].position.x;
  newNoseY = poses[0].pose.keypoints[0].position.y;
  parts.nose.x = lerp(parts.nose.x, newNoseX, smothness);
  parts.nose.y = lerp(parts.nose.y, newNoseY, smothness);

  newLeftEyeX = poses[0].pose.keypoints[1].position.x;
  newLeftEyeY = poses[0].pose.keypoints[1].position.y;
  parts.leftEye.x = lerp(parts.leftEye.x, newLeftEyeX, smothness);
  parts.leftEye.y = lerp(parts.leftEye.y, newLeftEyeY, smothness);

  newRightEyeX = poses[0].pose.keypoints[2].position.x;
  newRightEyeY = poses[0].pose.keypoints[2].position.y;
  parts.rightEye.x = lerp(parts.rightEye.x, newRightEyeX, smothness);
  parts.rightEye.y = lerp(parts.rightEye.y, newRightEyeY, smothness);

  newLeftEarX = poses[0].pose.keypoints[3].position.x;
  newLeftEarY = poses[0].pose.keypoints[3].position.y;
  parts.leftEar.x = lerp(parts.leftEar.x, newLeftEarX, smothness);
  parts.leftEar.y = lerp(parts.leftEar.y, newLeftEarY, smothness);

  newRightEarX = poses[0].pose.keypoints[4].position.x;
  newRightEarY = poses[0].pose.keypoints[4].position.y;
  parts.rightEar.x = lerp(parts.rightEar.x, newRightEarX, smothness);
  parts.rightEar.y = lerp(parts.rightEar.y, newRightEarY, smothness);
}
