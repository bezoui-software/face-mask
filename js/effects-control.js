
function play_effect(){
  let i = effectIndex;
  let effect = effects[i];
  if (effect == convert_video_to_low_resolution){
    res.removeClass('hidden');
    background(0);
    convert_video_to_low_resolution(video, res.value());
  }else if (effect == convert_video_to_mosaique){
    //VIDEO, SHAPE, OUTLINE
     background(0);
    effect(video);
  }else if (effect == convert_video_to_painting_filter){
    effect(video);
  }else{
    background(0);
    effect(video);
  }
}

function change_effect_by_covering_the_camera(){
  if (on_camera_covered()) {
    next_effect_index();
    canChangeEffect = false; 
  }else{
    canChangeEffect = true;  
  }
}


function next_effect_index(){
  if (!canChangeEffect) return;
  reload(); 
  (effectIndex < effects.length - 1) ? effectIndex++ : effectIndex = 0;
  return effectIndex;
}

function previous_effect_index(){
  reload(); 
  (effectIndex > 0) ? effectIndex-- : effectIndex = effects.length - 1;
  return effectIndex;
}

function display_effect_name(effect){
  let effectName = effect.name;
  const removableSyntaxs = ['convert', 'to', 'video', 'make'];
  effectName = replace_char_from_str(effectName, '_', ' ');
  for (let removableSyntax of removableSyntaxs){
    effectName = effectName.replace(removableSyntax, '');
  }
  $('#effect-name').text(effectName);
}
