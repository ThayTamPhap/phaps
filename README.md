`brew install sox opus-tools`

# MP3 to Opus (optimized for speech)
`sox speech.mp3 -t s16 --rate 32000 -c 1 - | opusenc --downmix-mono --bitrate 12 --raw-rate 32000 --raw-bits 16 --raw-chan 1 - speech.opus`

# Text-to-Speech
	- https://vbee.vn/
	- https://responsivevoice.org/

# Start a local server
`ruby -run -e httpd . -p 3000`

* Quotes' text  at https://tiendung.github.io/quotes.js (quotes[] an array of strings)
* Quotes' image at https://tiendung.github.io/quotes/650x/i.png (20mb)
* Quotes' audio at https://tiendung.github.io/quotes/opus/i.ogg (30mb)
* Quotes' audio at https://tiendung.github.io/quotes/opus/i.mp3 (69mb)

Image optimized for web https://imageoptim.com/mac
png to lossy png  16% (16.6mb / 102.4mb) 1357 files
mp3 to opus (ogg) 42% (29.7mb /  69.0mb)

BONUS
https://developers.cloudflare.com/pages/tutorials/build-a-blog-using-nuxt-and-sanity
https://kinderas.com/technology/2020/06/06/jamstack-integrating-sanity-io-and-hugo/
https://endler.dev/2020/perf/
