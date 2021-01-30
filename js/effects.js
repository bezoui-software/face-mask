const effects = [convert_video_to_mosaique, convert_video_to_low_resolution, convert_video_to_red_filter, convert_video_to_green_filter, convert_video_to_bleu_filter, convert_video_to_negative, convert_video_to_negative_with_red_filter, convert_video_to_negative_with_green_filter, convert_video_to_negative_with_bleu_filter, convert_video_to_painting_filter, convert_video_to_painting_manualy_filter];

function convert_video_to_mosaique(video, shape, outline){ 
  let i, r, g, b, bright, w, vScale = 8;
  video.size(width/vScale, height/vScale);
  video.loadPixels();
  for (let y=0; y<video.height; y++){
    for (let x=0; x<video.width; x++){
     
      i = (x + y * video.width) * 4;

      r = video.pixels[i + 0];
      g = video.pixels[i + 1];
      b = video.pixels[i + 2];
      bright = (r + g + b) / 3;

      w = map(bright, 0, 255, 0, vScale);

      if (outline){
        noFill();
        stroke(r, g, b);
      }else{
        noStroke();
        fill(r, g, b);
      }

      if (shape == 'rect'){
        rect(x * vScale, y * vScale, w, w);     
      }else{
        ellipse(x * vScale, y * vScale, w, w);
      }
    }  
  }
}

function convert_video_to_low_resolution(video, resolution){ 
  let i, r, g, b, bright;
  resolution /= 64;
  //resolution = Math.round(resolution);
  video.size(width/resolution, height/resolution);
  video.loadPixels();
  for (let y=0; y<video.height; y++){
    for (let x=0; x<video.width; x++){
     
      i = (x + y * video.width) * 4;

      r = video.pixels[i + 0];
      g = video.pixels[i + 1];
      b = video.pixels[i + 2];
      bright = (r + g + b) / 3;
      noStroke();
      fill(r, g, b, 255);
      rect(x * resolution, y * resolution, resolution, resolution);     
    }  
  }
}

function convert_video_to_red_filter(video){ 
  let i;


  video.loadPixels();
  video.size(width, height);
  loadPixels();
  for (let y=0; y<height; y++){
    for (let x=0; x<width; x++){
      i = (x + y * width) * 4;
      pixels[i + 0] = 255;
      pixels[i + 1] = video.pixels[i + 1];
      pixels[i + 2] = video.pixels[i + 2]; 
    }  
  }
  updatePixels();
}

function convert_video_to_green_filter(video){ 
  let i;


  video.loadPixels();
  video.size(width, height);
  loadPixels();
  for (let y=0; y<height; y++){
    for (let x=0; x<width; x++){
      i = (x + y * width) * 4;
      pixels[i + 0] = video.pixels[i + 0];
      pixels[i + 1] = 255;
      pixels[i + 2] = video.pixels[i + 2]; 
    }  
  }
  updatePixels();
}

function convert_video_to_bleu_filter(video){ 
  let i;


  video.loadPixels();
  video.size(width, height);
  loadPixels();
  for (let y=0; y<height; y++){
    for (let x=0; x<width; x++){
      i = (x + y * width) * 4;
      pixels[i + 0] = video.pixels[i + 0];
      pixels[i + 1] = video.pixels[i + 1];
      pixels[i + 2] = 255; 
    }  
  }
  updatePixels();
}

function convert_video_to_negative(video){ 
  let i;


  video.loadPixels();
  video.size(width, height);
  loadPixels();
  for (let y=0; y<height; y++){
    for (let x=0; x<width; x++){
      i = (x + y * width) * 4;
      pixels[i + 0] = 255 - video.pixels[i + 0];
      pixels[i + 1] = 255 - video.pixels[i + 1];
      pixels[i + 2] = 255 - video.pixels[i + 2]; 
    }  
  }
  updatePixels();
}

function convert_video_to_negative_with_red_filter(video){ 
  let i;


  video.loadPixels();
  video.size(width, height);
  loadPixels();
  for (let y=0; y<height; y++){
    for (let x=0; x<width; x++){
      i = (x + y * width) * 4;
      pixels[i + 0] = 255;
      pixels[i + 1] = 255 - video.pixels[i + 1];
      pixels[i + 2] = 255 - video.pixels[i + 2]; 
    }  
  }
  updatePixels();
}

function convert_video_to_negative_with_green_filter(video){ 
  let i;


  video.loadPixels();
  video.size(width, height);
  loadPixels();
  for (let y=0; y<height; y++){
    for (let x=0; x<width; x++){
      i = (x + y * width) * 4;
      pixels[i + 0] = 255 - video.pixels[i + 0];
      pixels[i + 1] = 255;
      pixels[i + 2] = 255 - video.pixels[i + 2]; 
    }  
  }
  updatePixels();
}

function convert_video_to_negative_with_bleu_filter(video){ 
  let i;


  video.loadPixels();
  video.size(width, height);
  loadPixels();
  for (let y=0; y<height; y++){
    for (let x=0; x<width; x++){
      i = (x + y * width) * 4;
      pixels[i + 0] = 255 - video.pixels[i + 0];
      pixels[i + 1] = 255 - video.pixels[i + 1];
      pixels[i + 2] = 255; 
    }  
  }
  updatePixels();
}

let painters = [];

function convert_video_to_painting_filter(video){ 
  let vScale = 1;
  video.size(width/vScale, height/vScale);
  video.loadPixels();

  if (painters.length == 0) createPainters(50);

  painters.forEach((painter, i)=>{
    let COLOR = video.get(painter.x/vScale, painter.y/vScale);
    colorMode(RGB);
    let r = COLOR[0];
    let g = COLOR[1];
    let b = COLOR[2];

    painter.update();
    painter.color = color(r, g, b, 150);
    painter.show();
  });
}

function createPainters(n){
  for (let i=0; i<n; i++){
    painters[i] = new Painter(width/2, height/2, 4);
  }
}

let manualPainters = [];
function convert_video_to_painting_manualy_filter(video){ 
  let vScale = 1;
  video.size(width/vScale, height/vScale);
  video.loadPixels();

  if (mouseIsPressed) createManualPainter(5);

  manualPainters.forEach((painter, i)=>{
    let COLOR = video.get(painter.x/vScale, painter.y/vScale);
    colorMode(RGB);
    let r = COLOR[0];
    let g = COLOR[1];
    let b = COLOR[2];

    painter.color = color(r, g, b, 150);
    painter.show();
  });
}

function createManualPainter(rows, cols){
  if (!cols) cols = rows;
  for (let y=0; y<rows; y++){
    for (let x=0; x<cols; x++){ 
      let r = 4;
      let posX = mouseX + (r**2 * x);
      let posY = mouseY + (r**2 * y);
      manualPainters.push(new Painter(posX, posY, r));  
    }
  }
}