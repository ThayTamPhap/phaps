// Click a sub will call playSub()
async function playSub() {
  var index = parseInt(this.id);
  if (!(await isEditedIndex(index))) return;

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
async function playAndUpdateSub() {
  console.log("currSubIndex", currSubIndex);
  if (currSubIndex >  1) saveTextIndex(currSubIndex - 1);
  if (currSubIndex >= 0) saveTextIndex(currSubIndex);

  switch (currKey) {
    case 'Enter':
      saveCurrSubIndex(currSubIndex);
      saveTime(currSubIndex, ap.currentTime);
      break;

    case 'Slash':
      let delta = await getCurrDelta();
      if (delta == 0 && lastCurrPos < 5) { saveTime(currSubIndex, ap.currentTime); }
      blinkCurPos(0);
      break
  }
  currKey = null;
}


document.addEventListener("keydown", handleKeyPress);
async function handleKeyPress(event) {
  currKey = event.code;
  if (currKey == 'MetaRight') currKey = 'OSRight';
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
  let nextNextSubEdited = currSubIndex >= subsCount - 1 || await isEditedIndex(currSubIndex+2);
  if ( (currKey == 'Tab' && nextSubIsEdited) 
    || (currKey == 'Enter' && (!nextSubIsEdited || !nextNextSubEdited)) ) {
    currSubIndex++;
    let p = document.getElementById(currSubIndex);
    p.contentEditable = true;
    p.click();
  }
}