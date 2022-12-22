# Voice-controlled digital dice

Today, I received this message from a friend:
![Ahoi, kannst du mir ne app schreiben die nur meine Stimme erkennt und immer das würfelt wie ich sag, also so ne gezinkte Würfel app?](message.png)

Translation: _Hi there, can you write an app that recognizes only my voice and always rolls the dice as I say, similar to a marked dice?_

Sure thing, I thought! Time to experiment with some new Web APIs - in this case the
[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API).

Only hour later a working proof-of-concept was ready to use.

### Usage

Tap the "WürfelApp" heading to toggle between voice-controlled and inverted mode. Voice-controlled mode is discreetly
indicated using a 1px white border at the top of the screen. When in inverted mode, you will never throw the detected
number.

Tap the dice in order to roll it.

### How it works
We start speech recognition using the Web Speech API, continuously listening for speech input.

In order to reduce latency, interim results were enabled. This proved to not impact accuracy at all, as we are only
looking for single keywords in an entire sentence and there is no need to wait until silence.

We could have used the `confidence` value to only process the speech when a certain threshold (e.g. `.5`) is hit.
Filtering out low-confidence results leads to higher response times. In practice, there is a suprisingly low rate of
erroneous detections, thus making the confidence threshold unnecessary at this time.

Next, we split the transcript into an array of lower-case words. Next, we try to find an item that matches a
pre-defined set of keywords such as "one", "1". We start with the latest (last) word in the array,
moving back in time from there.

This number is then remembered as the dice rolling target until another match is found in future speech transcripts.

### CSS Dice animation
The actual animated dice uses code from
https://codesandbox.io/s/xjk3xqnprw (ryancperry)
