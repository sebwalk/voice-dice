const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const keywordMap = new Map();
keywordMap.set('1', 1)
keywordMap.set('eins', 1)
keywordMap.set('2', 2)
keywordMap.set('zwei', 2)
keywordMap.set('3', 3)
keywordMap.set('drei', 3)
keywordMap.set('4', 4)
keywordMap.set('vier', 4)
keywordMap.set('5', 5)
keywordMap.set('fünf', 5)
keywordMap.set('6', 6)
keywordMap.set('sechs', 6)

function phraseToNumber(phrase){
  return phrase
  .split(" ")
  .reverse()
  .map(word => word.toLowerCase())
  .map(word => keywordMap.get(word))
  .filter(Boolean)
  .at(0)
}


function randomNumber() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let detectedNumber = randomNumber(1,6);

const recognition = new SpeechRecognition();
recognition.grammars = new SpeechGrammarList();
recognition.continuous = true;
recognition.lang = 'de-DE';
recognition.interimResults = true;
recognition.maxAlternatives = 1;
recognition.start();

recognition.onresult = (event) => {
  const latestResult = event.results[event.results.length - 1];
  const latestAlternative = latestResult[0];
  detectedNumber = phraseToNumber(latestAlternative.transcript) || detectedNumber
}


const dice = document.getElementById('dice');
dice.onmousedown = () => {
  dice.classList.toggle("odd-roll");
  dice.classList.toggle("even-roll");

  dice.dataset.roll = document.body.classList.contains('engaged') ?
      detectedNumber :
      randomNumber()

  detectedNumber = randomNumber();
}

const heading = document.getElementById('heading');
heading.onclick = () => {
  document.body.classList.toggle('engaged');
}
