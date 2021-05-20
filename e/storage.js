function finalKey(key) {
  return phapname + "_" + key; 
}

async function load(key) {
  return await localforage.getItem(finalKey(key));
}

function save(key, value) {
  localforage.setItem(finalKey(key), value);
}

function saveSubsCount(value) {
  subsCount = value;
  save('subsCount', subsCount);
}

async function loadSubsCount() {
  return subsCount = parseInt(await load('subsCount'));
}

function markEditedIndex(i) {
  save(`edited${i}`, 'true');
}

async function isEditedIndex(i) {
  return await load(`edited${i}`) == 'true';
}

function saveTime(i, value) {
  save(`time${i}`, value);
  markEditedIndex(i);
  var el = document.getElementById(i);
  if (el) {
    el.previousSibling.innerHTML = `${i}: ${secondsToTime(value)}`;
    el.className = 'edited';
  }
}

async function loadTime(i) {
  return parseFloat(await load(`time${i}`));
}

function saveTextIndex(i) {
  saveText(i, document.getElementById(i).innerText);
}

function saveText(i, value) {
  save(`text${i}`, value);
}

async function loadText(i) {
  return await load(`text${i}`);
}

async function saveAll() {
  for (var i = 0; i < subsCount; i++) {
    await saveTextIndex(i);
  }
}

function saveCurrentText() {
  saveTextIndex(parseInt(this.id));
}

function saveCurrSubIndex(index) {
  save('currSubIndex', currSubIndex = index);
}
