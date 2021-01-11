quotes = {}

def normalize(s)
	return s.gsub("&#8230;","... ").gsub("<br />", "\n").gsub(/\s*\n+\s*/m, "\n").gsub(/\(|\)/," , ").strip
end

File.open("quotes.txt", "r").read.split("\n").each do |q|
quotes[normalize(q)] = true
end

require "uri"
quotes.keys.each_with_index do  |q, i|
	# next if i < 1200
	filename = "../quotes/#{i}.mp3"
	next if File.exist?(filename) && File.size(filename) > 0
	url = "https://support.readaloud.app/read-aloud/speak/vi/GoogleTranslate%20Vietnamese?q="+URI.escape(q, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
	puts url, filename
	`curl -o #{filename} #{url}`
end
