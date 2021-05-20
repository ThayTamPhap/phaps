const ap = document.getElementById("audioPlayer");
ap.innerHTML = `<source src="/${phapname}.ogg"/>`


ap.ontimeupdate = function() {
  var seconds = ap.currentTime;
  var minutes = Math.floor(seconds / 60);
  seconds = Math.round(seconds - minutes * 60);
  document.getElementById('playPauseBtn').innerHTML = 
    `${minutes}:${seconds<=9?'0':''}${seconds}`;
};


async function playSubIndex(index, delta = 0) {
  var time = await loadTime(index);
  if (time != 0 || index == 0) { 
    ap.currentTime = time + delta;
    ap.play();
  }  
}


async function playCurrPos() {
    ap.currentTime = (await loadTime(currSubIndex)) + (await getCurrDelta());
    ap.play();
}
