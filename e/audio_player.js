const ap = document.getElementById("audioPlayer");
ap.innerHTML = `<source src="/${phapname}.ogg"/>`


ap.ontimeupdate = function() {
  let a = secondsToMinutesAndSecondsAndRemains(ap.currentTime);
  document.getElementById('playPauseBtn').innerHTML = 
    `${twoDigitsFmt(a[0])}:${twoDigitsFmt(a[1])}`;
};


async function playSubIndex(index, delta = 0) {
  var time = await loadTime(index);
  if (isNaN(time)) return;
  if (time != 0 || index == 0) { 
    ap.currentTime = time + delta;
    ap.play();
  }  
}


async function playCurrPos() {
    ap.currentTime = (await loadTime(currSubIndex)) + (await getCurrDelta());
    ap.play();
}
