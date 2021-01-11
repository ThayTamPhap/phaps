quotes = {}

def normalize(s)
	return s.gsub("&#8230;","... ").gsub("<br />", "\n").gsub(/\s*\n+\s*/m, "\n").strip
end

File.open("quotes.txt", "r").read.split("\n").each do |q|
quotes[normalize(q)] = true
end

quotes.keys.each_with_index do  |q, i|
	next if i < 179
	puts q, i
`convert -background "#400D00" -size 600x -font Arial -pointsize 20 -border 25 -bordercolor "#400D00" \
       pango:'<span size="x-large" foreground="#E9DA95">#{q}</span>

<span foreground="#DDD"><i>sutamphap.com</i></span>' \
        tiendung.github.io/quotes/#{i}.png`
end
