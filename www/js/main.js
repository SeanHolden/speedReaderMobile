function init(){
  var reader = new SpeedReader();
  initializeButtons(reader);
}

function initializeButtons(reader){
  var toggleButton = document.getElementById('togglebutton');
  var resetbutton = document.getElementById('resetbutton');
  // var fullStopSpeedIncrease = document.getElementById('increasefullstopspeed');
  // var fullStopSpeedDecrease = document.getElementById('decreasefullstopspeed');
  // var wpmUp = document.getElementById('wpmup');
  // var wpmDown = document.getElementById('wpmdown');
  // var commaPauseSpeedUp = document.getElementById('increasecommaspeed');
  // var commaPauseSpeedDown = document.getElementById('decreasecommaspeed');
  // var colonPauseSpeedUp = document.getElementById('increasecolonspeed');
  // var colonPauseSpeedDown = document.getElementById('decreasecolonspeed');
  var nextSentence = document.getElementById('nextsentence');
  var previousSentence = document.getElementById('previoussentence');

  toggleButton.onclick = function(){
    if( reader.getStatus() === 'playing' ){
      reader.stop();
      // this.innerHTML = 'Play';
      document.getElementById('togglebutton-icon').setAttribute('class', 'ion-play play-icon');
    }else{
      reader.play();
      // this.innerHTML = 'Pause';
      document.getElementById('togglebutton-icon').setAttribute('class', 'ion-pause pause-icon');
    };
  }
  resetbutton.onclick = function(){
    reader.reset();
    var textinput = document.getElementById('textinput');
    document.getElementById('wordarea').innerHTML = '';
  }

  nextSentence.onclick = function(){
    reader.nextSentence();
  }
  previousSentence.onclick = function(){
    reader.previousSentence();
  }
}

function halfWindowWidth(){
  return window.innerWidth / 2;
}