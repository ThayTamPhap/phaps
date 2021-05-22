/* 
?= is a positive lookahead
https://stackoverflow.com/questions/1570896/what-does-mean-in-a-regular-expression

"αβ αβγ γαβ αβ αβ".replace(/(^|\s)αβ(?=\s|$)/g, "$1AB")
https://stackoverflow.com/questions/2881445/utf-8-word-boundary-regex-in-javascript
The word boundary assertion does only match if a word character is not preceded 
or followed by another word character (so .\b. is equal to \W\w and \w\W). 
And \w is defined as [A-Za-z0-9_]. So \w doesn’t match greek characters.
*/

var typingShortcuts = {};
const typingShortcutsRegex = new RegExp('(^|\\s)(?:' + 
_shortcuts.split("\n").map(x => {

  let splits = x.split(/^(\S+)\s+/);
  // console.log(splits);
  if (splits.length < 2) return "-=-=-"; // any nonsense string
  typingShortcuts[splits[1]] = splits[2];
  return splits[1].replace("?", "\\?").replace(".", "\\.");

}).slice(1,).join("|")+')(?=[\\s!?.,;:|\\]})]|$)', 'gi'); 


function normalizeText(value) {
  value = convertShortcuts(value);
  value = spellSpecialWords(value);
  value = value.replace("...","…").replace(" \""," “").replace("\" ","”");
  value = value.replace(/[[{(]\s+/g, x => " "+x.replace(/\s+/g,""));
  value = value.replace(/\s+[\]})\,\.;:?\!…]/g, x => x.replace(/\s+/g,"")+" ");
  value = value.replace(/\s+[\]})\,\.;:?\!…]/g, x => x.replace(/\s+/g,"")+" ");
  value = value.replace(/^\s+/,"").replace(/\s+$/,"");
  value = value.replace(/\s+/g," ");
  return value;
}
console.assert(normalizeText("  d  . ") === "d.");
console.assert(normalizeText("  d { d f   fd !}  d ,   f .  H? ") === "d {d f fd!} d, f. Hiểu không?");


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
console.assert(spellSpecialWords("100%") == "|một trăm phần trăm|100%|");
console.assert(spellSpecialWords("10") == "10");
console.assert(spellSpecialWords("10|") == "10|");
console.assert(spellSpecialWords("15q") == "|mười lăm|15|q");
console.assert(spellSpecialWords("12") == "|mười hai|12|");


function spellNumber(x) {
  // console.log(`spellNumber "${x}"`)
  var prefix, md, mdd;

  // xxx
  if (md = x.match(/^(\d)(\d\d)$/)) {
    prefix = `${spellNumber(md[1])} trăm`;

    if (md[2] == '00')
      return prefix;

    if (mdd = md[2].match(/^0(\d)$/))
        return `${prefix} lẻ ${spellNumber(mdd[1])}`

    return `${prefix} ${spellNumber(md[2])}`
  }

  // xx
  if (md = x.match(/^(\d)(\d)$/)) {
    if (x == '10') return 'mười'

    // 1x => mười x (11,11,..,19)
    // 2x => 2 x (2x,..,9x)
    prefix = md[1] == '1' ? 'mười' : spellNumber(md[1]);

    switch (md[2]) {
      case '0': return `${prefix} mươi`;
      case '4': return `${prefix} tư`;
      case '5': return `${prefix} lăm`;
      default:  return `${prefix} ${spellNumber(md[2])}`;
    }
  }

  // x
  switch (x) {
    case '0': return `không`;
    case '1': return `một`;
    case '2': return `hai`;
    case '3': return `ba`;
    case '4': return `bốn`;
    case '5': return `năm`;
    case '6': return `sáu`;
    case '7': return `bảy`;
    case '8': return `tám`;
    case '9': return `chín`;
  }
}
console.assert(spellNumber("15") == "mười lăm");
console.assert(spellNumber("12") == "mười hai");
console.assert(spellNumber("102") == "một trăm lẻ hai");


function convertShortcuts(txt) {
  return txt = txt.replace(typingShortcutsRegex, x => {
    var splits = x.split(/(\s?)(.+)/);
    // console.log("Found:", x, splits);
    return splits[1] + splits[2][0] + 
      typingShortcuts[splits[2].toLowerCase()].substr(1,);
  });
}
console.assert(convertShortcuts('bg')==='bây giờ');
console.assert(convertShortcuts('Bg chúng ta nc về nx cn đang ở đây')==='Bây giờ chúng ta nói chuyện về những con người đang ở đây');
