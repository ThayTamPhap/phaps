require 'json'

txt = File.open("../assets/audios.json").read
my_hash = JSON.parse(txt)

urls = my_hash["phaps"].map{ |h| h["audio"].split("?").last }
urls.each do |url|
	`wget #{url}`
end