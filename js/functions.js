function cast_video_on_canvas(video) {
  let i;
  video.loadPixels();
  video.size(width, height);
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      i = (x + y * width) * 4;
      pixels[i + 0] = video.pixels[i + 0];
      pixels[i + 1] = video.pixels[i + 1];
      pixels[i + 2] = video.pixels[i + 2];
    }
  }
  updatePixels();
}

function get_angle_of(x1, y1, x2, y2) {
  let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / PI);
  return angle;
}

function next_mode() {
  (modeIndex < modes.length) ? modeIndex++ : modeIndex = 0;
}

function next_index() {
  if (mode == 'effect') next_effect_index();
  if (mode == 'face') next_face_index();
}

function previous_index() {
  if (mode == 'effect') previous_effect_index();
  if (mode == 'face') previous_face_index();
}

function display_counter_timer() {
  $('#capture-timer').text(captureTimer + "s");
}

function increase_capture_timer() {
  (captureTimer < captureTimerMax) ? captureTimer++ : captureTimer = captureTimerMax;
  display_counter_timer();
}

function decrease_capture_timer() {
  (captureTimer > 0) ? captureTimer-- : captureTimer = 0;
  display_counter_timer();
}

function save_image_to_gallery() {
  setTimeout(() => {
    make_url_for_canvas(canvas.canvas, updateCanvasUrl);
  }, captureTimer * 1000);
}


function on_camera_covered() {
  if (video.elt.played.length > 0) {
    if (check_if_video_pixels_are_off(video)) {
      return true;
    }
  }
  return false;
}

function updateCanvasUrl(url) {
  let canvasUrl = URL.createObjectURL(url);
  let img = display_image(canvasUrl, 160, 120, 'img', document.getElementById('imgs'));
  imgs.push(img);
}

function display_image(url, w, h, className, parent) {
  let img = document.createElement('img');
  img.width = w;
  img.height = h;
  img.src = url;
  img.addEventListener('click', download_image);
  if (className) img.classList.add(className);
  document.body.appendChild(img);
  if (parent) parent.appendChild(img);
  return img;
}

function download_image(res) {
  let link = res.target.src;
  let a = document.createElement('a');
  a.href = link;
  a.download = 'bs-mosaique-image-' + floor(random(999999999999999999999)) + '.jpeg';
  a.click();
}

function make_url_for_canvas(canvas, func) {
  canvas.toBlob(func, 'image/jpeg', 1);
}

function replace_char_from_str(oldStr, oldChar, newChar) {
  let newStr = oldStr;
  for (let i = newStr.length - 1; i >= 0; i--) {
    if (newStr.charAt(i) == oldChar) {
      newStr = newStr.replaceAt(i, newChar);
    }
  }
  return newStr;
}

function check_if_array_have_the_some_elements(arr) {
  let firstItem = arr[0];
  for (let item of arr) {
    if (item != firstItem) {
      return false;
    }
  }
  return true;
}

function check_if_video_pixels_are_off(video) {
  let i, r, g, b, bright, firstBright;
  video.loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      i = (x + y * video.width) * 4;
      r = video.pixels[i + 0];
      g = video.pixels[i + 1];
      b = video.pixels[i + 2];
      bright = (r + g + b) / 3;
      if (bright > 50) {
        return false;
      }
    }
  }
  return true;
}

String.prototype.replaceAt = function(index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }
  return this.substring(0, index) + replacement + this.substring(index + 1);
}