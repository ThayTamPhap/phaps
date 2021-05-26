## Two-phrase-matching shortcuts

Example of typical shortcuts (scs for short) typing
bd    bắt đầu
bg    bao giờ
bgm   bây giờ mình
blm   ba-la-mật

[ PROBLEM: ]

hard-to-remember over 100+ scs. Not suggestion so easily to wrong type 
word-in-your-head with pre-defined sc. e.g: word-in-your-head "chính xác", 
you typed 'cx' then you got "cảm xúc" :'(

scs requires considerable time to check for duplication and create / change scs manually.


[ SOLUTION: two-phrase-matching ]

\#1: use only first syllabel char => very easy to remember and can be generated automatically

\#2: show suggested words while typing so no mis-match with word-in-your-head
and words that machine know. Suggested words are extracted from bi-gram, tri-gram and 4-gram built from a text corpus and sorted by word frequency corelated with already typed
syllables ...

For example:

bgct  bao giờ chúng ta
bgct  bây giờ chúng ta
cbtm  cho bản thân mình
cbtm  chính bản thân mình
cbtm  của bản thân mình

=>

Human   Computer
Typed   Showed
bgct    (1) bao giờ chúng ta (2) bây giờ chúng ta
cbtm    (1) cho bản thân mình (2) chính bản thân mình (3) của bản thân mình

Human   Computer
Choose  Finalize
1       bao giờ chúng ta
3       của bản thân mình

Finally:

Human   Computer
bgct1   bao giờ chúng ta
cbtm3   của bản thân mình

=> Very simple, intuitive UI / UX
=> And very simple data structure and algorithm too:

shortcuts = {
	"bgct" : "bao giờ chúng ta|bây giờ chúng ta",
	"cbtm" : "cho bản thân mình|chính bản thân mình|của bản thân mình"
}



## Android Keyboard Distance-Based Mis-typing Correction

https://keep.google.com/#NOTE/1D2_xbUY2A-qPxbHPkghYfXdH2a1lOU7yvN7mNWaFyTk06K1EqwPQAWjKpvE-J-pb97Qn

( L ) Left thumb coverage
( R ) Right thumb coverage

Chủ yếu gõ nhầm theo chiều ngang:

( L )
q qw, w qwe, e wer, r ert, t rt
a as, s asd, d sdf, f dfg, g fg
z zx, x zxc, c xcv, v cv

( R )
y yu, u yui, i uio, o iop, p op
h hj, j hjk, k jkl, lkl
b bn, n bnm, m nm

https://vietnameseaccent.com/
Automatically inserting accent marks for Vietnamese words.
The free Web interface supports text up to 1000 characters.

"trong cuoc song chung ta phai biet tran trong nhung dieu nho nhat nhat, co le la khong nen lam gi ca" =>

"trong cuộc sống chúng ta phải biết trân trọng những điều nhỏ nhặt nhất, có lẽ là không nên làm gi cả""


Quá nhiều phím tắt k nhớ nổi, loạn. Làm cn tự động chữa lỗi gõ nhầm, tự động bỏ dấu thì tốt hơn. vietnameseaccent.com tự động bỏ dấu trông kq rất có triển vọng.

Cần convert Vietnamese syllables thành Telex ascii hết để dễ xây FST hoặc pattern matching, tiết kiệm bộ nhớ ..., và tận dụng dc keyboard-distance. Sẽ giả sử cách gõ Telex bỏ thanh âm sfrxj (tone) sau cùng, và bỏ dấu ôơư ... (mark) ngay sát nguyên âm.

Trước mắt build prototype sử dụng pattern matching via dictionary lookup (hash data struct).

Vd: tieeng => rieeng, tueeng, toeeng, ... => nhiều combinations phết đấy.
t,r u,i,o ee n,m g,f => 2 * 3 * 1 * 2 * 2 = 6 * 4 = 24 combinations
Sau đó lookup, uni-gram, bi-gram, tri-gram dict để lọc và xếp hạng để chọn ra vài ứng cử viên tốt nhất.

## Optimization


https://gitlab.inria.fr/kaldi.web
Online decoding part of kaldi ported to run in browser
https://gitlab.inria.fr/kaldi.web/kaldi-wasm/-/wikis/build_details.md#openfst

https://reposhub.com/cpp/miscellaneous/revdotcom-fstalign.html#Installation

Cần build FST để lọc syllabe, tự động chữa lỗi syllabe dựa trên keyboard-distance.
Dùng ML (bi-gram, tri-gram) để chọn lọc và xếp hạng các khả năng được đưa ra bởi FST
dựa trên xác xuất xuất hiện gần nhau của các syllable.


# [ LATER ]

## Get more text from 
https://sutamphap.com/category/thu-vien-phat-hoc/sach-su-tam-phap-dich/
https://sutamphap.com/category/thu-thay-tro/
https://sutamphap.com/category/hoi-dap/

## Scan transcribed texts to build a LM

# [ DONE ]

## Scan transcribed text files, build a 1s, 2s, s3 dict

a dict of bi-syllabes & tri-syllables (2s, 3s) and use them to create
shortcuts and auto-complete function.

2s: rất-là là-nhiều
3s: rất-là-nhiều
4s: không-những-mà-còn, làm phước cúng dường (Thực ra 4s = 2s + 2s)

## Fast typing for Vietnamese

j => gi
f => ph
q => qu

júp việc => giúp
july => july

wo|ưo => ươ
uo => uô
ie => iê
ye => yê
uu => ưu

e.g:
fuu fieu => phưu phiêu
