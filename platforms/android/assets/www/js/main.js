function init(){
  var reader = new SpeedReader();
  initializeButtons(reader);
}

function initializeButtons(reader){
  var toggleButton = document.getElementById('togglebutton');
  var resetbutton = document.getElementById('resetbutton');
  var nextSentence = document.getElementById('nextsentence');
  var previousSentence = document.getElementById('previoussentence');

  toggleButton.onclick = function(){
    // vibrate();
    if( reader.getStatus() === 'playing' ){
      reader.stop();
      document.getElementById('togglebutton-icon').setAttribute('class', 'ion-play play-icon');
    }else{
      reader.play();
      document.getElementById('togglebutton-icon').setAttribute('class', 'ion-pause pause-icon');
    };
  }
  resetbutton.onclick = function(){
    // vibrate();
    reader.reset();
    var textinput = document.getElementById('textinput');
    document.getElementById('wordarea').innerHTML = '';
  }

  nextSentence.onclick = function(){
    // vibrate();
    reader.nextSentence();
  }
  previousSentence.onclick = function(){
    // vibrate();
    reader.previousSentence();
  }
}

function halfWindowWidth(){
  return window.innerWidth / 2;
}

// function vibrate(){
//   navigator.vibrate(100);
// }