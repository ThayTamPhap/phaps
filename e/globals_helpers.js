const IDEAL_LINE_CHARS = 45*5;
const MAX_LINE_CHARS = 60*5;
const MIN_LINE_CHARS = 22*5;

// https://regexr.com/ => to test regex
const END_PHRASE_AND_SENT_REGEX = /(\s*(?:[,;:\n\\\.\?\!]\s*)+)/gm;
const END_SENT_REGEX =            /(\s*(?:[\n\\\.\?\!]\s*)+)/gm;
const SPECIAL_WORDS_REGEX =       /(\d+%?)([^\d%|]|$)/g;

// Global variables (app state)
var currSubIndex, currKey, subsCount;
const expanding = false;
const phapname = location.search.replace("?", "");
console.log('phapname', phapname);


function twoDigitsFmt(d) {
  return `${d <= 9 ? '0' : ''}${d}`
}

function secondsToMinutesAndSecondsAndRemains(s) {
  let minutes = Math.floor(s / 60);
  s -= minutes*60;
  let seconds = Math.floor(s);
  let remains = s - seconds;
  remains = Math.round(remains * 100);
  return [minutes, seconds, remains];
}

function secondsToTime(s) {
  let a = secondsToMinutesAndSecondsAndRemains(s);
  return `${twoDigitsFmt(a[0])}:${twoDigitsFmt(a[1])}.${twoDigitsFmt(a[2])}`
}

function spellSpecialWords(txt) {
  // e.g: 100 or 100% not end with |
  return txt.replace(SPECIAL_WORDS_REGEX, function (x) {
    var m = x.match(/(\d+%?)([^\d%\|]|$)/);
    // console.log(txt, x, m);
    // Just return 0-9,10
    if (m[1].match(/^(\d|10)$/)) return x;
    
    if (md = m[1].match(/^(\d+)%$/))
      return `|${spellNumber(md[1])} phần trăm|${m[1]}|${m[2]}`;
    
    // Default is number
    return `|${spellNumber(m[1])}|${m[1]}|${m[2]}`;
  });
} 
console.assert(spellSpecialWords("100%|") == "100%|");
console.assert(spellSpecialWords("100%") == "|1 trăm phần trăm|100%|");
console.assert(spellSpecialWords("10") == "10");
console.assert(spellSpecialWords("10|") == "10|");
console.assert(spellSpecialWords("15q") == "|mười lăm|15|q");
console.assert(spellSpecialWords("12") == "|mười hai|12|");


function spellNumber(x) {
  // console.log(`spellNumber "${x}"`)
  var prefix, md, mdd;

  // xxx
  if (md = x.match(/^(\d)(\d\d)$/)) {
    prefix = `${md[1]} trăm`;

    if (md[2] == '00')
      return prefix;

    if (mdd = md[2].match(/^0(\d)$/))
        return `${prefix} lẻ ${mdd[1]}`

    return `${prefix} ${spellNumber(md[2])}`
  }

  // xx
  if (md = x.match(/^(\d)(\d)$/)) {
    if (x == '10') return 'mười'

    // 1x => mười x (11,11,..,19)
    // 2x => 2 x (2x,..,9x)
    prefix = md[1] == '1' ? 'mười' : md[1];

    switch (md[2]) {
      case '0': return `${prefix} mươi`;
      case '1': return `${prefix} một`;
      case '2': return `${prefix} hai`;
      case '3': return `${prefix} ba`;
      case '4': return `${prefix} tư`;
      case '5': return `${prefix} lăm`;
      case '6': return `${prefix} sáu`;
      case '7': return `${prefix} bảy`;
      case '8': return `${prefix} tám`;
      case '9': return `${prefix} chín`;
      default:  return `${prefix} ${md[2]}`;
    }
  }

  return x;
}
