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

  this.increaseWPM = function(){
    currentWPM = Settings.getWPM();
    if( parseInt(currentWPM.value) < 1000 ){
      currentWPM.value = (parseInt(currentWPM.value) + 50).toString();
      localStorage['wpmvalue'] = currentWPM.value;
    }
  };

  this.decreaseWPM = function(){
    currentWPM = Settings.getWPM();
    if( parseInt(currentWPM.value) > 50 ){
      currentWPM.value = (parseInt(currentWPM.value) - 50).toString();
      localStorage['wpmvalue'] = currentWPM.value;
    }
  };
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
