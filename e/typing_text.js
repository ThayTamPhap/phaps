function normalizeText(value) {
  value = value.replace("...","…").replace(" \""," “").replace("\" ","”");
  value = value.replace(/[[{(]\s+/g, x => " "+x.replace(/\s+/g,""));
  value = value.replace(/\s+[\]})\,\.;:?\!…]/g, x => x.replace(/\s+/g,"")+" ");
  value = value.replace(/\s+[\]})\,\.;:?\!…]/g, x => x.replace(/\s+/g,"")+" ");
  value = value.replace(/^\s+/,"").replace(/\s+$/,"");
  return  value.replace(/\s+/g," ");
}
console.assert(normalizeText("  d  . ") === "d.");
console.assert(normalizeText("  d { d f   fd !}  d ,   f .   ") === "d {d f fd!} d, f.");

function convertShortcuts(txt) {
  return txt = txt.replace(typingShortcutsRegex, x => {
    var splits = x.split(/(\s?)(.+)/);
    // console.log("Found:", x, splits);
    return splits[1] + typingShortcuts[splits[2]];
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

  let temp = x.split(/^(\S+)\s+/);
  // console.log(temp);
  if (temp.length === 1) return "-=-=-";

  let k = temp[1];
  let v = temp[2];
  typingShortcuts[k] = v;

  k[0] = k[0].toLocaleUpperCase();
  v[0] = v[0].toLocaleUpperCase();
  typingShortcuts[k] = v;

  return k.replace("?", "\\?");
}).slice(1,).join("|")+')(?=\\s|$)', 'gi'); 
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
console.assert(convertShortcuts('bg chúng ta nc về nx cn đang ở đây')==='bây giờ chúng ta nói chuyện về những con người đang ở đây');
