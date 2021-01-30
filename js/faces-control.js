let masks = {celebration:null, happy:null, sad:null, sad2:null,angry:null, seek:null, bob:null, alex:null, sam:null, lisa:null, souka:null, serioussouka:null};

function preload(){
  const dir = 'media/images/masks/';
  for (let key of Object.keys(masks)){
    let img = key+".png";
    masks[key] = loadImage(dir+img);
  }
}

function setup_face_masks(){
  for (let key of Object.keys(masks)){
    let face = "make_"+key+"_mask";
    if (!faces.includes(face)) faces.push(face);
  }
}

function play_face(){
  let i = faceIndex;
  let face = faces[i];
  if (face == make_funny_face){
    background(0);
    face(video);
  }else{
    background(0);
    let img = replace_char_from_str(face, '_', '');
    img = img.replace('make', '');
    img = img.replace('mask', '');
    make_mask(video, img);
  }
}

function next_face_index(){
  (faceIndex < faces.length - 1) ? faceIndex++ : faceIndex = 0;
  reload();
  return faceIndex;
}

function previous_face_index(){
  (faceIndex > 0) ? faceIndex-- : faceIndex = faces.length - 1;
  reload();
  return faceIndex;
}

function display_face_name(face){
  let faceName;
  (face instanceof Function) ? faceName = face.name : faceName = face;
  const removableSyntaxs = ['make'];
  faceName = replace_char_from_str(faceName, '_', ' ');
  for (let removableSyntax of removableSyntaxs){
    faceName = faceName.replace(removableSyntax, '');
  }
  $('#effect-name').text(faceName);
}
