Speed Reader Mobile
===================

<p>AKA <i>RapidReader</i> (I can make apps but my ability to name them is not so good...)</p>
---

<b>Why?</b>

There are a few speed reader apps out there but I couldn't find a good one that allows you to skip back and forth between sentences and also allows for pausing at punctuation. So I made one that does.

<b>Features</b>

* Copy and paste (or type) text into the text area, and simply press play.
* Skip back if you missed a sentence. Skip forward if the current sentence is boring.
* Add long or short pauses at punctuation. For example: have a 2 second pause at full stops. Have a 0.5 second pause at commas. Have a 1 second pause at colons. This gives your brain time to process the sentence.

<b>How it looks:</b>

<img src="https://raw.githubusercontent.com/SeanHolden/speedReaderMobile/master/images/read.png" width="200" />
<img src="https://raw.githubusercontent.com/SeanHolden/speedReaderMobile/master/images/pastetext.png" width="200" />
<img src="https://raw.githubusercontent.com/SeanHolden/speedReaderMobile/master/images/settings.png" width="200" />

---

<b>Extra info</b>

This is not on app store or google play store as I wasn't totally happy with how it looks and feels when put on mobile. It is great as a web app, but I guess it is difficult to make a phonegap app truly feel native. Issues such as text looking weird and "off" at random intervals. Also, sometimes the words flashing on screen will "lag" for a microsecond and then suddenly go super fast to "catch up". This is not so often, but annoying still.

<b>To run on browser</b>

Clone the repo and run a server from the `www` folder. Open it via localhost in your browser.

<b>To run on mobile</b>

Have `ionic` framework installed: (<a href="http://ionicframework.com/">http://ionicframework.com/</a>)

```
$ ionic platform add android
$ ionic build android
$ ionic run android
```

If device is plugged in, it will auto launch on your phone. (Replace `android` with `ios` for iPhone, but I've not tried this as I don't have an iPhone...)
