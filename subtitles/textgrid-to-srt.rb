txt = File.open("nois-CHUYENANUONGDUNG.TextGrid").read
txt = txt.split("intervals: size = ")[1]
intervals = txt.split(/intervals.+?:/)
intervals.shift


def s2t(s)
	hours = s.floor / 3600
	minutes = (s.floor - hours*3600) / 60
	seconds = s - hours*3600 - minutes*60
	return ("%02d:%02d:%02.3f" % [hours, minutes, seconds]).sub(".",",")
end

sents = File.open("../nois/CHUYENANUONGDUNG.lab").read.split(/[\n\s]*\.[\n\s]*/m)
sents.each_with_index do |sent, index|
	words = sent.downcase.split(/[^[:alpha:]]+/)
	min = 0; max = 0
	words.each_with_index do |word, wi|
		w = nil; b = nil; e = nil
		while (true) do
			inter = intervals.shift; break if inter == nil
			b = inter.match(/xmin = ([\d\.]+)/)[1].to_f
			e = inter.match(/xmax = ([\d\.]+)/)[1].to_f
			w = inter.match(/text = "(.*)"/)[1]
			break if (w == word || w == "<unk>")
		end
		min = b if wi == 0
		max = e
		# print "#{w} "
	end
	# puts "\n#{min} - #{max}"
	puts "#{index+1}\n#{s2t(min)} --> #{s2t(max)}\n#{sent}\n\n"
	# break
end
