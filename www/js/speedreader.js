function SpeedReader(){
  // availableSpeeds -> WPM:Milliseconds
  var availableSpeeds = {
    50:1200,
    100:600,
    150:400,
    200:300,
    250:240,
    300:200,
    350:171.43,
    400:150,
    450:133.34,
    500:120,
    550:109.09,
    600:100,
    650:92.31,
    700:85.71,
    750:80,
    800:75,
    850:70.59,
    900:66.67,
    950:63.16,
    1000:60
  };
  var WORDCOUNTER=0;
  var sentenceEndIndexCounter=-1;

  var reader = this;
  var status = 'stopped';
  var counterPaused = 0;
  var originalReadspeed = 700;
  var fullStopPauseMultiplier = parseFloat(localStorage['fullstoppause']) || 0;
  var commaPauseMultiplier = parseFloat(localStorage['commapause']) || 0;
  var colonPauseMultiplier = parseFloat(localStorage['colonpause']) || 0;
  var wordsArray = null;
  var wordsArrayFull = null;
  var sentenceEndIndexes;
  var WPM = parseInt(localStorage['wpmvalue']) || 350;
  var readspeed = availableSpeeds[WPM];
  var fullstopPause = readspeed+(fullStopPauseMultiplier*1000);
  var commaPause = readspeed+(commaPauseMultiplier*1000);
  var colonPause = readspeed+(colonPauseMultiplier*1000);

  this.updateStatus = function(value){
    status = value;
  }

  this.getStatus = function(){
    return status;
  }

  this.updateCounterPaused = function(value){
    counterPaused = value;
    WORDCOUNTER = WORDCOUNTER + 1;
  }

  this.play = function(){
    reader.updateStatus('playing');
    var textArea = document.getElementById('textinput');
    if (wordsArrayFull === null){
      // Replace newlines with spaces. Split by spaces.
      wordsArrayFull = textArea.value.replace( /\n/g, " " ).split(' ');

      // Add space to words with hyphens in them
      for(var i=0;i<wordsArrayFull.length;i++){
        splitByHyphen(wordsArrayFull[i], function(word){
          wordsArrayFull[i] = word;
        });
      }
    }
    // Flatten the array due to splitting by hyphens.
    // (Because it would have added arrays to the array.)
    // Split by a string that is unlikely to be already in the text...
    wordsArrayFull = wordsArrayFull.join('<#SPLIT#>').split('<#SPLIT#>');

    if(WORDCOUNTER===0){wordsArraySentences(wordsArrayFull)};
    cycleWords(WORDCOUNTER,wordsArrayFull.slice(WORDCOUNTER,wordsArrayFull.length))
  }

  this.stop = function(){
    reader.updateStatus('stopped');
  }

  this.reset = function(){
    // reader.updateCounterPaused(0);
    reader.stop();
    WORDCOUNTER = 0;
    sentenceEndIndexCounter=-1
    wordsArrayFull = null;
    // document.getElementById('togglebutton').innerHTML = 'Play';
    document.getElementById('togglebutton-icon').setAttribute('class', 'ion-play play-icon');
  }

  this.nextSentence = function(){
    skipToNextSentence();
  }

  this.previousSentence = function(){
    skipToPreviousSentence();
  }

  // sentenceEndIndexes example -> [4, 26, 46, 65, 81, 98, 101, 105, 130, 145, 159]

  function skipToNextSentence(){
    // document.getElementById('togglebutton').innerHTML = 'Play';
    document.getElementById('togglebutton-icon').setAttribute('class', 'ion-play play-icon');

    if(status === 'playing'  ){
      reader.stop();
    }else if(status === 'stopped'){
      reader.play();
      reader.stop();
    }

    if (WORDCOUNTER < sentenceEndIndexes[0]){
      WORDCOUNTER = sentenceEndIndexes[0]
    }else if(WORDCOUNTER === wordsArrayFull.length-1){
      reader.stop();
    }else if(WORDCOUNTER >= sentenceEndIndexes[ sentenceEndIndexes.length-2 ]){
      // if it is last item in sentenceEndIndexes
      WORDCOUNTER = sentenceEndIndexes[ sentenceEndIndexes.length-2 ];
    }else{
      // for item in sentenceEndIndexes
      for(var i=0;i<sentenceEndIndexes.length;i++){
        if( WORDCOUNTER >= sentenceEndIndexes[i] && WORDCOUNTER < sentenceEndIndexes[i+1] ){
          WORDCOUNTER = sentenceEndIndexes[i+1];
          break;
        }
      }
    }
  }

  function skipToPreviousSentence(){
    // document.getElementById('togglebutton').innerHTML = 'Play';
    document.getElementById('togglebutton-icon').setAttribute('class', 'ion-play play-icon');

    if(status === 'playing'  ){
      reader.stop();
    }else if(status === 'stopped'){
      reader.play();
      reader.stop();
    }

    // if current word is inside the very first sentence.
    // set current word back to 0.
    if (WORDCOUNTER < sentenceEndIndexes[0]){
      WORDCOUNTER = 0;
    }else if( WORDCOUNTER === sentenceEndIndexes[0]+1 ){
      WORDCOUNTER = 0;

    // else if current word is inside the very last sentence.
    }else if(WORDCOUNTER > sentenceEndIndexes[ sentenceEndIndexes.length-1 ]){
      WORDCOUNTER = sentenceEndIndexes[ sentenceEndIndexes.length-1 ];
    }else{
      // for item in sentenceEndIndexes
      for(var i=0;i<sentenceEndIndexes.length;i++){
        // if current word is the first word in a sentence... go to previous sentence.
        if( WORDCOUNTER === sentenceEndIndexes[i]+1 ){
          WORDCOUNTER = sentenceEndIndexes[i-1];
          break;
        // else go to the start of the sentence you are currently on.
        }else if( WORDCOUNTER >= sentenceEndIndexes[i] && WORDCOUNTER < sentenceEndIndexes[i+1] ){
          WORDCOUNTER = sentenceEndIndexes[i];
          break;
        }
      }
    }
  }

  function cycleWords(words){
    window.setTimeout(function() {
      if(wordsArrayFull===null){ // <-- When hitting reset button, return to escape the function. Otherwise error.
        return false; 
      }
      var word = wordsArrayFull[WORDCOUNTER];
      var endOfWord;
      var singleLetterWord = false;

      // Split word and color middle letter
      if(word.length === 1){
        endOfWord = word;
        singleLetterWord = true;
        word = '<span id="middlechar">'+word+'</span>';
      }
      else if(word.length > 0){
        splitWordIntoThree(word, function(splitWord){
          endOfWord = splitWord[2];
          word = colorMiddleLetter(splitWord);
        });
      }

      // Display the current word on page
      document.getElementById('wordarea').innerHTML = '<span id="actualword">'+word+'</span>';

      // if middle char exists (e.g. not newline or anything) ... display pixels left and right
      var middleChar = document.getElementById('middlechar');
      if( middleChar && !singleLetterWord ){
        setCharPositions(middleChar);
      }else if(singleLetterWord){
        setSingleCharPosition(middleChar);
      }

      // Set readspeed here
      readspeed = availableSpeeds[WPM];

      // Cycle as long as there are still words left and the status is 'playing'
      if (WORDCOUNTER < wordsArrayFull.length-1){
        if( endOfWord ){ pauseForPunctuation( endOfWord ) };
        if (status === 'playing'){
          WORDCOUNTER++;
          cycleWords(WORDCOUNTER, wordsArrayFull.slice(WORDCOUNTER,wordsArrayFull.length));
        }else{
          reader.updateCounterPaused();
        };
      }else{
        reader.stop();
        // document.getElementById('togglebutton').innerHTML = 'Play';
        document.getElementById('togglebutton-icon').setAttribute('class', 'ion-play play-icon');
      };

    // below should be speed of a single word change in milliseconds
    }, readspeed );
  }

  function splitByHyphen(word,callback){
    if( word.match(/\w-\w/) ){
      // Before being displayed, the array will be split by the <#SPLIT#> string.
      word = word.replace('-','-<#SPLIT#>');
    }else{
      return word;
    }
    callback( word );
  }

  function fullstopPauseValue(){
    return ( availableSpeeds[WPM]+(fullStopPauseMultiplier*1000) );
  }

  function commaPauseValue(){
    return ( availableSpeeds[WPM]+(commaPauseMultiplier*1000) );
  }

  function colonPauseValue(){
    return ( availableSpeeds[WPM]+(colonPauseMultiplier*1000) );
  }

  function pauseForPunctuation(word){
    var lastCharacter = word[ word.length-1 ];
    if ( lastCharacter === '.' ){
      readspeed = fullstopPauseValue();
    }else if( lastCharacter === ',' ){
      readspeed = commaPauseValue();
    }else if( lastCharacter === ':' || lastCharacter === ';' ){
      readspeed = colonPauseValue();
    }else{
      readspeed = availableSpeeds[WPM];
    }
  }

  function isOddNumberOfLetters(word){
    var letterCount = word.length;
    if( letterCount % 2 == 1 ){
      return true;
    }else{
      return false;
    }
  }

  function splitWordIntoThree(word, callback){
    // Remove end-of-word punctuation so it is not counted as a letter
    var lastChar = word[word.length-1];
    var endsInPunctuation = false;
    var minusValue;
    var divideValue;
    // is it a long word?
    var longword = (word.length > 5) ? true : false;

    if( lastChar==='.' || lastChar===',' || lastChar===';' || lastChar===':' ){
      word = word.slice(0,word.length-1);
      endsInPunctuation = true;
      longword = (word.length > 5) ? true : false;
    }

    if( isOddNumberOfLetters(word) ){
      minusValue = 0.5;
    }else{
      minusValue = 1;    
    }

    if( longword ){
      divideValue = 1.5;
    }else{
      divideValue = 2.0;
    }

    var middleCharIndex = ( word.length - ( word.length/divideValue ) - minusValue);
    splitWord = [ word.slice(0,middleCharIndex),
                  word.slice(middleCharIndex,middleCharIndex+1),
                  word.slice(middleCharIndex+1,word.length) ];

    // Put punctuation back onto the end
    if(endsInPunctuation){ splitWord[2]=splitWord[2]+lastChar; };
    callback(splitWord);
  }

  function colorMiddleLetter(splitWord){
    var beginning = '<span id="beginning">'+splitWord[0]+'</span>';
    var middle = '<span id="middlechar">'+splitWord[1]+'</span>';
    var end = '<span id="end">'+splitWord[2]+'</span>';

    return beginning+middle+end;
  }

  function setCharPositions(middleChar){
    // set position of middlechar
    var halfWindow = halfWindowWidth();
    var halfMiddleCharWidth = middleChar.clientWidth/2;
    var middleCharPosition = halfWindow - halfMiddleCharWidth;
    middleChar.setAttribute('style','position:absolute;left:'+middleCharPosition+'px;');

    // set positions of letters around middlechar...
    var beginningCharLeftPixels = ( middleCharPosition - document.getElementById('beginning').clientWidth );
    var endCharLeftPixels = ( middleCharPosition + document.getElementById('middlechar').clientWidth );

    document.getElementById('beginning').setAttribute('style','position:absolute;left:'+beginningCharLeftPixels+'px;');
    document.getElementById('end').setAttribute('style','position:absolute;left:'+endCharLeftPixels+'px;');
  }

  // Only run this when word is a single character
  function setSingleCharPosition(character){
    var halfWindow = halfWindowWidth();
    var halfMiddleCharWidth = character.clientWidth/2;
    var middleCharPosition = halfWindow - halfMiddleCharWidth;
    character.setAttribute('style','position:absolute;left:'+middleCharPosition+'px;');
  }

  // Get the index positions of all words with full stops at the end.
  function wordsArraySentences(words){
    var fullStopIndexes = [];
    var word;
    for(var i=0;i<words.length;i++){
      word = words[i];
      if(word[word.length-1] == '.'){
        // Add word after full stop. If word is blank space (new line)... add next word instead.
        if(wordsArrayFull[i+1]===""){
          fullStopIndexes.push(i+2);
        }else{
          fullStopIndexes.push(i+1);
        }

      }
    }
    sentenceEndIndexes = fullStopIndexes;
  }

}