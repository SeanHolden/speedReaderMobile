angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, SpeedReadText) {
  init();
  $scope.textString = SpeedReadText.get();
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('SettingsCtrl', function($scope, Settings) {
  $scope.wpm = Settings.getWPM();
  $scope.fullStopPause = Settings.getFullStopPause();
  $scope.commaPause = Settings.getCommaPause();
  $scope.colonPause = Settings.getColonPause();

  this.increaseWPM = function(){
    var currentWPM = Settings.getWPM();
    if( parseInt(currentWPM.value) < 1000 ){
      currentWPM.value = (parseInt(currentWPM.value) + 50).toString();
      localStorage['wpmvalue'] = currentWPM.value;
    }
  }

  this.decreaseWPM = function(){
    var currentWPM = Settings.getWPM();
    if( parseInt(currentWPM.value) > 50 ){
      currentWPM.value = (parseInt(currentWPM.value) - 50).toString();
      localStorage['wpmvalue'] = currentWPM.value;
    }
  }

  this.increaseFullStopPauseValue = function(){
    var currentFullStopPause = Settings.getFullStopPause();
    if( parseFloat(currentFullStopPause.value) < 10.0 ){
      currentFullStopPause.value = (parseFloat(currentFullStopPause.value) + 0.125).toString();
      localStorage['fullstoppause'] = currentFullStopPause.value;
    }
  }

  this.decreaseFullStopPauseValue = function(){
    var currentFullStopPause = Settings.getFullStopPause();
    if( parseFloat(currentFullStopPause.value) > 0 ){
      currentFullStopPause.value = (parseFloat(currentFullStopPause.value) - 0.125).toString();
      localStorage['fullstoppause'] = currentFullStopPause.value;
    }
  }

  this.increaseCommaPauseValue = function(){
    var currentCommaPause = Settings.getCommaPause();
    if( parseFloat(currentCommaPause.value) < 10.0 ){
      currentCommaPause.value = (parseFloat(currentCommaPause.value) + 0.125).toString();
      localStorage['commapause'] = currentCommaPause.value;
    }
  }

  this.decreaseCommaPauseValue = function(){
    var currentCommaPause = Settings.getCommaPause();
    if( parseFloat(currentCommaPause.value) > 0 ){
      currentCommaPause.value = (parseFloat(currentCommaPause.value) - 0.125).toString();
      localStorage['commapause'] = currentCommaPause.value;
    }
  }

  this.increaseColonPauseValue = function(){
    var currentColonPause = Settings.getColonPause();
    if( parseFloat(currentColonPause.value) < 10.0 ){
      currentColonPause.value = (parseFloat(currentColonPause.value) + 0.125).toString();
      localStorage['colonpause'] = currentColonPause.value;
    }
  }

  this.decreaseColonPauseValue = function(){
    var currentColonPause = Settings.getColonPause();
    if( parseFloat(currentColonPause.value) > 0 ){
      currentColonPause.value = (parseFloat(currentColonPause.value) - 0.125).toString();
      localStorage['colonpause'] = currentColonPause.value;
    }
  }
})

.controller('PasteTextCtrl', function($scope, SpeedReadText){
  $scope.textString = SpeedReadText.get();
  $scope.snippet = $scope.textString.value;

  this.saveText = function(newText){
    oldText = SpeedReadText.get();
    oldText.value = newText;
    localStorage['speedreadtext'] = newText;
    resetLocalStorageValues();
  }

  this.resetText = function(){
    oldText = SpeedReadText.get();
    oldText.value = "";
    $scope.snippet = "";
    localStorage['speedreadtext'] = "";
    resetLocalStorageValues();
  }

  this.loadTestText = function(){
    oldText = SpeedReadText.get();
    newText = "This is, some test-data.\n\nIt is a bunch, of text that will, allow me to make, sure if this app is working correctly, or not.\n\nIt will need commas, and things such as: colons and also, the next line will contain a semi-colon.\n\nThis is the line with the semi-colon; Pausing at the correct moments is important for the reader.\n\nIt is the era of an Old Horde, forged with steel rather than fel blood. A union of great orc clans, the Iron Horde, tramples the planet Draenor beneath terrifying war machines. Azeroth falls next. Worlds uncounted will follow.\n\nYou must mount a desperate charge on Draenor – savage home of orcs and adopted bastion of stoic draenei – at this pivotal moment. Your allies are legends from across time; your fortress a foothold in an alien land. Lead the armies of one world against another… before the future itself is unmade.";
    oldText.value = newText;
    $scope.snippet = newText;
    localStorage['speedreadtext'] = newText;
  }

  function resetLocalStorageValues(){
    // reset localStorage values on change
    localStorage['sentenceendindexes'] = '';
    localStorage['singleletterword'] = "";
    localStorage['currentword'] = "";
    localStorage['wordcounter'] = "";
  }
});
