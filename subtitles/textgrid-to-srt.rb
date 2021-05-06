def s2t(s)
	hours = s.floor / 3600
	minutes = (s.floor - hours*3600) / 60
	seconds = s - hours*3600 - minutes*60
	return ("%02d:%02d:%02.3f" % [hours, minutes, seconds]).sub(".",",")
end

def t2s(name, lab_filename, srt_file)
txt = File.open("#{name}.TextGrid").read
txt = txt.split("intervals: size = ")[1]
intervals = txt.split(/intervals.+?:/)
intervals.shift

sents = File.open(lab_filename).read.split(/[\n\s]+/m)
sents.each_with_index do |sent, index|
	sent = sent.gsub(/[\n\s]+/m, " ").strip
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
		print "#{w} "
	end
	puts "\n#{min} - #{max}"
	srt_file.puts "#{index+1}\n#{s2t(min)} --> #{s2t(max)}\n#{sent}\n\n"
	# break
end
end

Dir.glob("*.TextGrid") do |filename|
  name = filename.gsub(".TextGrid", "")
  puts srt_filename = "../#{name.sub("-","/")}.srt"
  lab_filename = "../#{name.sub("-","/")}.lab"
  File.open(srt_filename, "wt") do |srt_file|
  	t2s(name, lab_filename, srt_file)
  end
end