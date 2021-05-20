// Click a sub will call playSub()
async function playSub() {
  var index = parseInt(this.id);

  if (currSubIndex != index) {
    // First click on sub
    resetAdjustedDeltas();
    saveCurrSubIndex(index);
    await playSubIndex(currSubIndex);
    blinkCurPos(0);
  }  else { 
    // Click on current sub
    await playCurrPos();
    blinkCurPos();
  }
}

// Whenever a sub get focused (click, tab, enter) will call playAndUpdateSub()
function playAndUpdateSub() {
  if (currSubIndex > 1) saveTextIndex(currSubIndex - 1);
  saveTextIndex(currSubIndex);

  if (currKey == 'Enter' || currKey == 'Slash') {  
    saveCurrSubIndex(currSubIndex);
    saveTime(currSubIndex, ap.currentTime);
  } else if (parseInt(this.id) != currSubIndex) {
    playSubIndex(currSubIndex);
  }
  currKey = null;
}


document.addEventListener("keydown", handleKeyPress);
async function handleKeyPress(event) {
  currKey = event.code;
  console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
  // console.log('currKey', currKey);

  switch(currKey) {
    case 'Slash':
      if (event.key != '/') { return; }
      event.preventDefault();
      playAndUpdateSub();
      break;

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
      nextSub();
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

    case 'ArrowUp':
      break

    case 'ArrowDown':
      break

    case 'ArrowLeft':
      break

    case 'ArrowRight':
      break

    default:
      if (await loadTime(currSubIndex) != 0) { ap.pause(); }
  }
}

async function adjust(x) {
  let delta = await getCurrDelta();
  var time = await loadTime(currSubIndex) + delta;
  if (delta == 0 && lastCurrPos < 3) {
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

function nextSub() {
  if (currSubIndex < subsCount - 1) { 
    currSubIndex++;  
    document.getElementById(currSubIndex).focus();
  }
}