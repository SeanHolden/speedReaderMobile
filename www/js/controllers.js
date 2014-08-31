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
})

.controller('PasteTextCtrl', function($scope, SpeedReadText){
  $scope.textString = SpeedReadText.get();
  $scope.snippet = $scope.textString.value;

  this.saveText = function(newText){
    oldText = SpeedReadText.get();
    oldText.value = newText;
    localStorage['speedreadtext'] = newText;
  }

  this.resetText = function(){
    oldText = SpeedReadText.get();
    oldText.value = "";
    $scope.snippet = "";
    localStorage['speedreadtext'] = "";
  }
});
