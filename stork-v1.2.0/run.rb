txt = File.open("../assets/quotes.js").read
quotes = txt.split("\n")[1...-1]

File.open("quotes.toml", "wt") do |f|
	f.puts '''[output]
excerpts_per_result = 5
displayed_results_count = 30
excerpt_buffer = 8

[input]
minimum_indexed_substring_length = 3
minimum_index_ideographic_substring_length = 2
stemming = "None"
url_prefix = "/#"
files = ['''
	quotes.each_with_index do |item, index|
		q = item.downcase[1...-2]
		f.puts "{title = \"##{index}\", url = \"#{index}\", contents = \"#{q}\"},\n"
	end
	f.print "]"
end

`stork build --input quotes.toml --output quotes.st`
`stork test --input quotes.toml`
