function normalizeText(value) {
  value = convertShortcuts(value);
  value = value.replace("...","…").replace(" \""," “").replace("\" ","”");
  value = value.replace(/[[{(]\s+/g, x => " "+x.replace(/\s+/g,""));
  value = value.replace(/\s+[\]})\,\.;:?\!…]/g, x => x.replace(/\s+/g,"")+" ");
  value = value.replace(/\s+[\]})\,\.;:?\!…]/g, x => x.replace(/\s+/g,"")+" ");
  value = value.replace(/^\s+/,"").replace(/\s+$/,"");
  value = value.replace(/\s+/g," ");
  return value;
}

function convertShortcuts(txt) {
  return txt = txt.replace(typingShortcutsRegex, x => {
    var splits = x.split(/(\s?)(.+)/);
    // console.log("Found:", x, splits);
    return splits[1] + splits[2][0] + 
      typingShortcuts[splits[2].toLowerCase()].substr(1,);
  });
}

var typingShortcuts = {};
const typingShortcutsRegex = new RegExp('(^|\\s)(?:' + `
bg  bây giờ
cn  con người
ct  chúng ta
cx  cũng
d?  đúng không?
dc  được
dd  dễ duôi
dd  đúng đắn
dg  đúng
dk  điều kiện
h?  hiểu không?
ko  không
nc  nói chuyện
ng  người
ntn như thế nào
nx  những
vq  vượt qua`.split("\n").map(x => {

  let splits = x.split(/^(\S+)\s+/);
  // console.log(splits);
  if (splits.length < 2) return "-=-=-"; // any nonsense string
  typingShortcuts[splits[1]] = splits[2];
  return splits[1].replace("?", "\\?");

}).slice(1,).join("|")+')(?=[\\s!?.,;:|\\]})]|$)', 'gi'); 
/* 
?= is a positive lookahead
https://stackoverflow.com/questions/1570896/what-does-mean-in-a-regular-expression

"αβ αβγ γαβ αβ αβ".replace(/(^|\s)αβ(?=\s|$)/g, "$1AB")
https://stackoverflow.com/questions/2881445/utf-8-word-boundary-regex-in-javascript
The word boundary assertion does only match if a word character is not preceded 
or followed by another word character (so .\b. is equal to \W\w and \w\W). 
And \w is defined as [A-Za-z0-9_]. So \w doesn’t match greek characters.
*/
console.assert(convertShortcuts('bg')==='bây giờ');
console.assert(convertShortcuts('Bg chúng ta nc về nx cn đang ở đây')==='Bây giờ chúng ta nói chuyện về những con người đang ở đây');

console.assert(normalizeText("  d  . ") === "d.");
console.assert(normalizeText("  d { d f   fd !}  d ,   f .   ") === "d {d f fd!} d, f.");
