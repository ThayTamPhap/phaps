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

  let splits = x.split(/^(\S+)\s+/); // console.log(splits);
  if (splits.length < 2) return "-=-=-"; // any nonsense string

  let k = splits[1];
  let v = splits[2];
  
  if (typingShortcuts[k]) { 
    console.log("\n\n!!! WARNING", k, "shortcut is duplicated.\n\n"); 
  }

  typingShortcuts[k] = v;  
  return k.replace("?", "\\?").replace(".", "\\.");

}).slice(1,).join("|")+')(?=[\\s!?.,;:|\\]})])', 'gi'); 


function normalizeText(value, completeSent=true) {
  value = value.replace("...","…").replace(" \""," “").replace("\" ","”");
  value = value.replace(/[ ]/," ")
  value = convertShortcuts(value, completeSent);

  value = spellSpecialWords(value);

  value = value.replace(/[[{(]\s+/g, x => " "+x.replace(/\s+/g,""));
  // ("  d { d f   fd !}  d ,   f .  H? ")==="d {d f fd!} d, f. Hiểu không?"
  value = value.replace(/\s+[\]})\,\.;:?\!…]/g, x => x.replace(/\s+/g,"")+" ");
  value = value.replace(/\s+[\]})\,\.;:?\!…]/g, x => x.replace(/\s+/g,"")+" ");

  // "g g.  hom \nay") === "G g. Hom \Nay"
  value = value.replace(/[.?!\\/]\s*\S/g, x => 
      x.substr(0,x.length-1)+x[x.length-1].toUpperCase());

  // Strip begin, and end spacings
  value = value.replace(/^\s+/,"").replace(/\s+$/," ");
  // value = value.trim();
   // and strim in-between spacings
  value = value.replace(/\s+/g," ");

  return value;
}
console.assert(normalizeText("x .  x , x : x ] x } x )  x  …  x !  x ?  ") === "x. X, x: x] x} x) x… x! X? ");
console.assert(normalizeText("g g.  hom nay") === "g g. Hom nay");
console.assert(normalizeText("  d  . ")==="d. ");
console.assert(normalizeText("  d { d f   fd !}  d ,   f .  H? ")==="d {d f fd!} d, f. Hiểu không? ");


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


function convertShortcuts(txt, completeSent=true) {
  
  if (completeSent) { txt = (txt + " "); }

  txt = txt.replace(typingShortcutsRegex, x => {
    var splits = x.split(/(\s?)(.+)/);
    // console.log("Found:", x, splits);
    let k = splits[2], md;
    let v = typingShortcuts[k.toLowerCase()];
    if (md = k.match(/(^\d+)/)) { 
      k = k.replace(/^\d+/, "\\d+");
      v = typingShortcuts[k].replace("\\d+", md[1]);
    }
    // console.log(k, '=>', v); // k: 323d
    return splits[1] + (k[0]===k[0].toLowerCase() ? v 
      : v[0].toUpperCase() + v.substr(1,));
  });

  return completeSent ? txt.slice(0, txt.length - 1) : txt;
}

console.assert(convertShortcuts('Byg',false)==='Byg');
console.assert(convertShortcuts('byg')==='bây giờ');
console.assert(convertShortcuts('323d')==='323 ngày');
console.assert(convertShortcuts('Byg chúng ta nc về nx cng đang ở đây')==='Bây giờ chúng ta nước về những con người đang ở đây');

// https://kipalog.com/posts/Mot-so-ki-thuat-xu-li-tieng-Viet-trong-Javascript

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

// Loại bỏ tất cả các kí tự không phải chữ cái và số
// str = str.replace(/[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, '');