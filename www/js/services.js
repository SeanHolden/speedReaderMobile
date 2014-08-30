angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('SpeedReadText', function(){
  var text = { value: localStorage['speedreadtext'] || "" };

  return {
    get: function(){
      return text;
    }
  }
})

.factory('Settings', function(){
  var wpm = { value: localStorage['wpmvalue'] || '350'};
  var fullStopPause = { value: localStorage['fullstoppause'] || '0.75'};

  return {
    getWPM: function(){
      return wpm;
    },
    getFullStopPause: function(){
      return fullStopPause;
    }
  }
});
