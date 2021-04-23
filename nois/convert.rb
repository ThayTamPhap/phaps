# brew install opusfile
Dir.glob("*.mp3") do |f|
  name = f.gsub(".mp3", "")
  # next if File.size(f) <= 12000000
  next if File.exist?("#{name}.ogg")
  `sox #{f} -t s24 --rate 44100 -c 1 - | opusenc --downmix-mono --bitrate 13 --raw-rate 44100 --raw-bits 24 --raw-chan 1 - #{name}.ogg`
end
