# MP3 to Opus (optimized for speech)
`sox speech.mp3 -t s16 --rate 32000 -c 1 - | opusenc --downmix-mono --bitrate 12 --raw-rate 32000 --raw-bits 16 --raw-chan 1 - speech.opus`

# Text-to-Speech
	- https://vbee.vn/
	- https://responsivevoice.org/

# Start a local server
`ruby -run -e httpd . -p 3000`
