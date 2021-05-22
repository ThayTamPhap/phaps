# MP3 to Opus (optimized for speech)
`brew install sox opus-tools mp3splt`
`sox speech.mp3 -t s16 --rate 32000 -c 1 - | opusenc --downmix-mono --bitrate 12 --raw-rate 32000 --raw-bits 16 --raw-chan 1 - speech.opus`


# Text-to-Speech
	- https://vbee.vn/
	- https://responsivevoice.org/


# Start a local server
`ruby -run -e httpd . -p 3000`


# Image optimized for web 
https://imageoptim.com/mac
png to lossy png  16% (16.6mb / 102.4mb) 1357 files
mp3 to opus (ogg) 42% (29.7mb /  69.0mb)
