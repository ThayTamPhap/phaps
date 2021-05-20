const defaultSecondsPerWord = 0.3;
var secondsPerWord = defaultSecondsPerWord;

async function estimateSecondsPerWord(index) {
  if (index == 0) { return secondsPerWord; }
  q = await loadText(index - 1);
  b = await loadTime(index - 1);
  e = await loadTime(index);
  if (b == 0 || b >= e) { return secondsPerWord; }

  x = (e - b) / q.split(/\s+/).length;
  secondsPerWord = (x <= 0.36) ? x : secondsPerWord;
  console.log('New secondsPerWord:', secondsPerWord);

  return secondsPerWord;
}


const notWordRegex = /[\s\,\.\<\>\;\:\/\?\|\\\[\]\{\}\`\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=“”…‘’]+/gm;
var adjustedDeltas = [];

function resetAdjustedDeltas() {
  adjustedDeltas = [];
}

function adjustDeltas(x) {
  var currPos = getCurrPosStr().length;
  var ad = adjustedDeltas[currPos];
  adjustedDeltas[currPos] = (ad == undefined ? 0 : ad) + x;
  adjustedDeltas = adjustedDeltas.slice(0, currPos + 1);
}

async function getCurrDelta() {
  var q = getCurrPosStr();
  q = q.toLocaleLowerCase();
  var currPos = q.length;
  var words = q.split(notWordRegex);
  
  var wordsCount = words.length - 2;
  if (words[words.length - 1] == "") { wordsCount--; }
  // Too short string always return 0 to make it point to the beginning of the sent
  if (wordsCount <= 0) return 0;
  if (words.length > 20) wordsCount -= words.length / 10;
  if (words.length > 40) wordsCount -= words.length / 20;
  var breakCount1 = q.split(END_PHRASE_AND_SENT_REGEX).length - 1;
  var breakCount2 = q.split(END_SENT_REGEX).length - 1;
  wordsCount += breakCount1*0.3 + breakCount2*0.5;
  var delta2 = wordsCount * (await estimateSecondsPerWord(currSubIndex));

  var delta1 = 0;
  if (words.length > 0) {
    words.forEach(w => delta1 += wordsSecs[w] || defaultSecondsPerWord);
    delta1 += (breakCount1+breakCount2)*defaultSecondsPerWord*0.8;
  }
  
  var delta = (delta1 + delta2) / 2;
  var n = adjustedDeltas.length - 1;
  if (n > currPos) n = currPos;
  for (var ad, i = 0; i <= n; i++) { 
    ad = adjustedDeltas[i]
    if (ad != 0 && ad != undefined) {
      delta += ad;
      console.log("adjustedDeltas[",i,"] = ", ad);
    }
  };

  console.log('currSub:', currSubIndex, ', words.length', words.length, 'delta1', delta1, 
    'wordsCount', wordsCount, 'delta2', delta2, 'currPos', currPos, 'adjustedDeltas.length', adjustedDeltas.length, 'delta', delta);

  return delta < 0 ? 0 : delta;
}