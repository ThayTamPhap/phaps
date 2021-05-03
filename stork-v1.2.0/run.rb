def remove_mark(str)
  result = str
  result = result.gsub(/\u0111/, 'd')
  result = result.gsub(/(\u00e0|\u00e1|\u00e2|\u00e3|\u0103|\u1ea1|\u1ea3|\u1ea5|\u1ea7|\u1ea9|\u1eab|\u1ead|\u1eaf|\u1eb1|\u1eb3|\u1eb5|\u1eb7)/, 'a')
  result = result.gsub(/(\u00e8|\u00e9|\u00ea|\u1eb9|\u1ebb|\u1ebd|\u1ebf|\u1ec1|\u1ec3|\u1ec5|\u1ec7)/, 'e')
  result = result.gsub(/(\u00ec|\u00ed|\u0129|\u1ec9|\u1ecb)/, 'i')
  result = result.gsub(/(\u00f2|\u00f3|\u00f4|\u00f5|\u01a1|\u1ecd|\u1ecf|\u1ed1|\u1ed3|\u1ed5|\u1ed7|\u1ed9|\u1edb|\u1edd|\u1edf|\u1ee1|\u1ee3)/, 'o')
  result = result.gsub(/(\u00f9|\u00fa|\u0169|\u01b0|\u1ee5|\u1ee7|\u1ee9|\u1eeb|\u1eed|\u1eef|\u1ef1)/, 'u')
  result = result.gsub(/(\u00fd|\u1ef3|\u1ef5|\u1ef7|\u1ef9)/, 'y')
  return result
end

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
