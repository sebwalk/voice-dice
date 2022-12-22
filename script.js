const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const keywordMap = new Map();
keywordMap.set('1', 1)
keywordMap.set('eins', 1)
keywordMap.set('eines', 1)
keywordMap.set('2', 2)
keywordMap.set('zwei', 2)
keywordMap.set('3', 3)
keywordMap.set('drei', 3)
keywordMap.set('4', 4)
keywordMap.set('vieh', 4)
keywordMap.set('vier', 4)
keywordMap.set('5', 5)
keywordMap.set('fünf', 5)
keywordMap.set('6', 6)
keywordMap.set('sechs', 6)
keywordMap.set('sex', 6)

function phraseToNumber(phrase){
  const keys = [
    ...phrase.split(" ").reverse().map(word => word.toLowerCase()),
    ...phrase.split("").reverse(),
  ]
  console.log(keys);

  return keys.map(word => keywordMap.get(word)).find(Boolean);
}


function randomNumber() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumberExcluding(number){
  const candidate = randomNumber()
  return candidate === number ?
      randomNumberExcluding(number) :
      candidate
}

let detectedNumber = randomNumber(1,6);

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'de-DE';
recognition.interimResults = true;
recognition.maxAlternatives = 1;
recognition.start();

recognition.onresult = (event) => {
  const latestResult = event.results[event.results.length - 1];
  const latestAlternative = latestResult[0];
  const number = phraseToNumber(latestAlternative.transcript);

  if(number){
    console.log(number)
    detectedNumber = number
  }
}


const dice = document.getElementById('dice');
dice.onclick = () => {
  dice.classList.toggle("odd-roll");
  dice.classList.toggle("even-roll");

  if(document.body.classList.contains('inverted')){
    dice.dataset.roll = randomNumberExcluding(detectedNumber);
  } else {
    dice.dataset.roll = detectedNumber
    detectedNumber = randomNumber()
  }
}

const heading = document.getElementById('heading');
heading.onclick = () => {
  document.body.classList.toggle('inverted');
}
