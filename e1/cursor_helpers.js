var lastCurrPos = 0;

function saveLastCursor(from="") {
  lastCurrPos = window.getSelection().anchorOffset;
  console.log(`\n\nsaveLastCursor(${from}) => ${lastCurrPos}\n\n`);
}

function getCurrPosStr() {
  var currP = document.getElementById(currSubIndex);
  var currInnerText = currP.innerText;
  return currInnerText.substr(0, window.getSelection().anchorOffset);
}

function capitalizeFirstCharOf(sent) {
  return sent[0].toUpperCase() + sent.slice(1,);
}

function autoCapitalizedFirstCharOf(p, auto=false) {
  let yesDoIt = (p.id == "0");
  if (yesDoIt === false) {
    let pp = p.parentNode.previousSibling.lastChild;
    yesDoIt = pp.firstChild.textContent.match(/[.?!\\/]\s*$/);
  }
  console.log('yesDoIt', yesDoIt);
  if (auto && yesDoIt) {
    p.innerHTML = capitalizeFirstCharOf(p.innerText);
  }
  return yesDoIt;
}

function resetTextAndPos(suffix="") {
    // Reset HTML to plain text to select correct cursor position
    var sel = window.getSelection();
    var currP = document.getElementById(currSubIndex);
    var currInnerText = currP.innerText;

    // if (suffix) { lastCurrPos = sel.anchorOffset; }
    if (suffix && currInnerText[lastCurrPos-1] != " ") suffix = " ";
    else suffix = "";

    isEndOfSent = lastCurrPos >= currInnerText.length;
    let normText = 
      normalizeText(currInnerText.substr(0, lastCurrPos)) + suffix;
    let remain = currInnerText.substr(lastCurrPos,);
    currInnerText = normText + remain;
    lastCurrPos = normText.length;
    
    let n = currInnerText.length;    
    if (currInnerText[n-1] == " ") {
     currInnerText = currInnerText.slice(0, n-1) + "&nbsp;";
    }

    if (autoCapitalizedFirstCharOf(currP, false)) {
      currP.innerHTML = capitalizeFirstCharOf(currInnerText);
    } else {
      currP.innerHTML = currInnerText;
    }

    // console.log(`n=${n}, lastCurrPos=${lastCurrPos}\nnormText="${normText}", remain="${remain}"`);

    /* https://javascript.info/selection-range#selecting-the-text-partially */
    // If node is a text node, then offset must be the position in its text.
    if (isEndOfSent || lastCurrPos > n) lastCurrPos = n;
    sel.collapse(currP.firstChild, lastCurrPos);
}

var selectedText = "";
function blinkCurPos(pos) {
  var currP = document.getElementById(currSubIndex);
  if (!currP.firstChild) { return; }

  let sel = window.getSelection(); 
  selectedText = sel.getRangeAt(0).toString();

  console.log('linkCurPos():\nselectedText', selectedText);

  if (selectedText.length > 0) {
    ap.pause();
    return;
  }

  // use lastCurrPos since click on virtual button reset curpos to 0
  var currPos = typeof pos == 'number' ? pos : lastCurrPos;
  var txt = currP.firstChild ? currP.firstChild.textContent : "";
  
  var n = txt.length;
  if (currPos > n) currPos = n;

  var b = currPos, e = currPos+1, n = txt.length;
  while (txt[b] != ' ' && b > 0) b--; if (b < 0) b = 0;
  while (txt[e] != ' ' && e < n) e++; if (e > n) e = n;
  

  let range = new Range();  
  range.setStart(currP.firstChild, b == 0 ? 0 : b+1);
  range.setEnd(currP.firstChild, e);
  sel.removeAllRanges();
  sel.addRange(range);

  let count = 0;
  let interval = window.setInterval(function() {
    if (++count > 2) { 
      clearInterval(interval); 
      sel.collapse(currP.firstChild, currPos);
    }

    if (selectedText.length > 0) {
      ap.pause();
      clearInterval(interval);
      return;
    }

    if (count % 2 == 0) {
      range.setStart(currP.firstChild, b == 0 ? 0 : b+1);
      range.setEnd(currP.firstChild, e);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      sel.collapse(currP.firstChild, currPos);
    }
  }, 80);
}
