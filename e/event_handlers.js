// Click a sub will call playSub()
async function playSub() {
  var index = parseInt(this.id);
  // Click on not edited sub have no effect
  // , only enter can change sub's timing and make it edited 
  if (!(await isEditedIndex(index))) return;

  if (currSubIndex != index) {
    // First click on sub
    saveCurrSubIndex(index);
    loadCurrAdjustedDeltas();
    await playCurrSubIndex();
    blinkCurPos(0);
  }  else { 
    // Click on current sub
    saveLastCursor('playSub: Click on current sub');
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
      apPlay();
      // blinkCurPos(0);
      if (currSubIndex < subsCount - 1) {
        document.getElementById(currSubIndex+1).contentEditable = true;
      }
      break;

    case 'Tab':
      await playCurrSubIndex();
      blinkCurPos(0);
      maxPlayTime = currSubIndex >= subsCount ? 
        ap.duration : 
        await loadTime(currSubIndex+1);
      break;

    default:
  }

  currKey = null;
}


document.addEventListener("keyup", handleKeyUp);

async function handleKeyUp(event, blink) {
  saveLastCursor('handleKeyUp');

  if (event.code == 'Space') {
    resetTextAndPos();
    await playCurrPos();
  }
}


document.addEventListener("keydown", handleKeyPress);
var cooldown = 0;

async function handleKeyPress(event) {
  // let logStr = `keydown: key='${event.key}' | code='${event.code}' | keyCode='${event.keyCode}'`;
  // console.log(logStr);
  // alert(logStr);
  currKey = event.code;
  
  // key mapping for different browsers / systems
  // Android's keyCode: enter = 13; backspace = 8; others are all 229
  if (currKey == 'MetaRight') { currKey = 'OSRight'; }
  if (currKey == '' && (event.key == 'Backspace' || event.keyCode == 8)) { 
    currKey = 'Backspace'; 
  }
  
  
  if (event.key == 'Enter' || event.keyCode == 13) { 
    event.preventDefault();
    resetTextAndPos(" ");
    await playCurrPos();
    p = document.getElementById(currSubIndex); p.focus();
    if (event.code == '') { blinkCurPos(); } // blinkCurPos for Android
    return;
  }


  switch(currKey) {

    case 'AltLeft':
      event.preventDefault();
      if (ap.paused) { ap.currentTime -= 0.8; await apPlay(); } else { ap.pause(); };
      break;

    case 'Backspace':
      if (currSubIndex > 0 && currSubIndex == subsCount - 1 
        && document.getElementById(currSubIndex).innerText=="") {
        document.body.removeChild(document.getElementById(currSubIndex).parentNode);
        document.getElementById(--currSubIndex).focus();
        saveSubsCount(--subsCount);
      }
      break;

    case 'Enter':
      event.preventDefault();
      if (cooldown > 0) return;

      if (currSubIndex < subsCount-1) { 

        let p = document.getElementById(++currSubIndex);
        p.contentEditable = true;
        if (p.innerText === "") p.innerHTML = "&nbsp;";
        p.focus();
        p.scrollIntoView();
        saveCurrSubIndex(currSubIndex);
        lastCurrPos = 0;
        cooldown=2; let inter=setInterval(()=>(--cooldown==0) && clearInterval(inter),1000);

      } else {

        let div = document.createElement('div');
        let p = document.createElement('p');
        div.innerHTML = `<i>[${++currSubIndex}] ${secondsToTime(0)}</i>`;
        p.id = currSubIndex;
        p.contentEditable = "true";
        p.className = 'edited';
        p.addEventListener("click", playSub);
        p.addEventListener("focus", playAndUpdateSub);
        p.addEventListener("blur", saveCurrentText);
        if (p.innerText === "") p.innerHTML = "&nbsp;";
        div.appendChild(p);
        document.body.appendChild(div);
        p.focus();
        p.scrollIntoView();
        saveSubsCount(++subsCount);
      }
      break;

    case 'Tab':
      event.preventDefault();
      if (await isEditedIndex(currSubIndex+1)) { 
        document.getElementById(++currSubIndex).focus();
      }
      break;

    /* ControlLeft = play, AltRight = forward, OSRight = backward */

    case 'ControlLeft':
      event.preventDefault();
      getCursorback();
      resetTextAndPos();
      await playCurrPos();
      blinkCurPos();
      break;

    case 'AltRight':
      event.preventDefault();
      getCursorback();
      adjust(+1);
      blinkCurPos();
      break;

    case 'OSRight':
      event.preventDefault();
      getCursorback();
      adjust(-1);
      blinkCurPos();
      break;

    case 'Space':
      break;

    default:
      if (await loadTime(currSubIndex) != 0 && !ap.paused) { ap.pause(); }
  }
}

function getCursorback() {
  p = document.getElementById(currSubIndex); p.focus();
  console.log("\nlastCurrPos:", lastCurrPos);
  window.getSelection().collapse(p.firstChild, lastCurrPos);
}

function normalizeTime(time) {
  if (time > ap.duration) return ap.duration;
  if (time < 0) return 0;
  return time;
}

async function adjust(x) {
  let delta = await getCurrDelta();
  var time = await loadTime(currSubIndex) + delta;
  if (delta == 0 && lastCurrPos < 5) {
    time += 0.15 * x;
    time = normalizeTime(time);
    saveTime(currSubIndex, time);
  } else {
    adjustDeltas(1.5 * x);
    time += 1.5 * x;
    time = normalizeTime(time);
  }  
  ap.currentTime = time;
  await apPlay();
}
