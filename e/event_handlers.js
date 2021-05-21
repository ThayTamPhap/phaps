// Click a sub will call playSub()
async function playSub() {
  var index = parseInt(this.id);
  // Click on not edited sub have no effect
  // , only Enter / Next can change sub's timing and make it edited 
  if (!(await isEditedIndex(index))) return;

  if (currSubIndex != index) {
    // First click on sub
    resetAdjustedDeltas();
    saveCurrSubIndex(index);
    await playCurrSubIndex();
    blinkCurPos(0);
  }  else { 
    // Click on current sub
    await playCurrPos();
    blinkCurPos();
  }
}

// Whenever a sub get focused (click, tab, enter) will call playAndUpdateSub()
async function playAndUpdateSub() {
  console.log("currSubIndex", currSubIndex);
  // Save recent edited text
  if (currSubIndex >  1) saveTextIndex(currSubIndex - 1);
  if (currSubIndex >= 0) saveTextIndex(currSubIndex);
  if (currSubIndex < subsCount - 1) saveTextIndex(currSubIndex + 1);

  switch (currKey) {
    case 'Enter':
      saveCurrSubIndex(currSubIndex);
      saveTime(currSubIndex, ap.currentTime);
      maxPlayTime = ap.currentTime + await getCurrDelta('Whole sentence');
      ap.play();
      // blinkCurPos(0);
      if (currSubIndex < subsCount - 1) {
        document.getElementById(currSubIndex+1).contentEditable = true;
      }
      break;

    case 'Tab':
      await playCurrSubIndex();
      blinkCurPos(0);
      maxPlayTime = currSubIndex >= subsCount ? 
        qp.duration : 
        await loadTime(currSubIndex+1);
      break;

    default:
  }

  currKey = null;
}


document.addEventListener("keydown", handleKeyPress);
var cooldown = 0;
async function handleKeyPress(event) {
  currKey = event.code;
  if (currKey == 'MetaRight') currKey = 'OSRight';
  console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
  // console.log('currKey', currKey);

  switch(currKey) {

    case 'ControlLeft':
      await playCurrPos();
      resetTextAndPos();
      blinkCurPos();
      break;

    case 'AltLeft':
      event.preventDefault();
      if (ap.paused) { ap.currentTime -= 0.8; ap.play(); } else { ap.pause(); };
      break;

    case 'Enter':
      event.preventDefault();
      if (cooldown > 0) return;
      nextSub();
      cooldown = 3; // 3 seconds
      let interval = setInterval(()=>(--cooldown==0) && clearInterval(interval), 1000);
      break;

    case 'Tab':
      event.preventDefault();
      nextSub();
      break;

    case 'AltRight':
      event.preventDefault();
      adjust(+1);
      break;

    case 'OSRight':
      event.preventDefault();
      adjust(-1);
      break;

    default:
      if (await loadTime(currSubIndex) != 0) { ap.pause(); }
  }
}

async function adjust(x) {
  let delta = await getCurrDelta();
  var time = await loadTime(currSubIndex) + delta;
  if (delta == 0 && lastCurrPos < 5) {
    time += 0.15 * x;
    saveTime(currSubIndex, time);
  } else {
    adjustDeltas(1.5 * x);
    time += 1.5 * x;
  }  
  ap.currentTime = time;
  ap.play();
  blinkCurPos();
}

async function nextSub() {
  if (currSubIndex >= subsCount - 1) return;
  let nextSubIsEdited = await isEditedIndex(currSubIndex+1);
  if ( (currKey == 'Tab' && nextSubIsEdited) 
    || currKey == 'Enter') {
    currSubIndex++;
    let p = document.getElementById(currSubIndex);
    p.contentEditable = true;
    p.focus();
  }
}