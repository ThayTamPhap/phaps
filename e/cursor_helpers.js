var lastCurrPos = 0;

function getCurrPosStr() {
  var currP = document.getElementById(currSubIndex);
  var currInnerText = currP.innerText;
  lastCurrPos = window.getSelection().anchorOffset;
  return currInnerText.substr(0, lastCurrPos);
}

function resetTextAndPos(suffix="") {
    // Reset HTML to plain text to select correct cursor position
    var currP = document.getElementById(currSubIndex);
    let isEndOfSent = currP.innerText.length <= lastCurrPos;
    
    var currInnerText = normalizeText(currP.innerText)+suffix;
    currP.innerHTML = currInnerText + (suffix == " " ? "&nbsp;" : suffix);
    
    let n = currInnerText.length;
    console.log('currInnerText.length', n, 'lastCurrPos', lastCurrPos);
    if (isEndOfSent || lastCurrPos > n) lastCurrPos = n;
    
    var sel = window.getSelection();
    /* https://javascript.info/selection-range#selecting-the-text-partially */
    // If node is a text node, then offset must be the position in its text.
    sel.collapse(currP.firstChild, lastCurrPos);
}

var selectedText = "";
function blinkCurPos(pos) {
  var currP = document.getElementById(currSubIndex);
  if (!currP.firstChild) { return; }

  let sel = window.getSelection(); 
  selectedText = sel.getRangeAt(0).toString();

  console.log('linkCurPos():\nselectedText', sel.getRangeAt(0).toString());

  if (selectedText.length > 0) {
    ap.pause();
    return;
  }

  var currPos = typeof pos == 'number' ? pos : sel.anchorOffset;
  var txt = currP.firstChild ? currP.firstChild.textContent : "";
  var b = currPos, e = currPos+1, n = txt.length;
  
  while (txt[b] != ' ' && b > 0) b--; if (b < 0) b = 0;
  while (txt[e] != ' ' && e < n) e++; if (e > n) e = n;
  

  let range = new Range();  
  range.setStart(currP.firstChild, b == 0 ? 0 : b+1);
  range.setEnd(currP.firstChild, e);
  sel.removeAllRanges();
  sel.addRange(range);

  let count = 1;
  let interval = window.setInterval(function() {
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
    if (++count > 3) { clearInterval(interval); }
  }, 80);
}
