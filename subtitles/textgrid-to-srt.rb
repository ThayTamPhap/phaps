def secs_to_srt_time(s)
	hours = s.floor / 3600
	minutes = (s.floor - hours*3600) / 60
	seconds = s - hours*3600 - minutes*60
	return ("%02d:%02d:%02.3f" % [hours, minutes, seconds]).sub(".",",")
end

def textgrid_to_srt(textgrid_filename, lab_filename, srt_filename, start)
	# puts srt_file.read
  	srt_content = File.exist?(srt_filename) ? File.open(srt_filename).read : ""
  	File.open(srt_filename, "wt") do |srt_file|
	srt_file.print(srt_content)

	txt = File.open(textgrid_filename).read
	txt = txt.split("intervals: size = ")[1]
	intervals = txt.split(/intervals.+?:/)
	intervals.shift

	sents = File.open(lab_filename).read.split(/[\n\s]*\n[\n\s]*/m)
	puts existed_index = srt_content == "" ? 0 : srt_content.split("\n\n").last.match(/^(\d+)\n/)[1].to_i
	# return
	sents.each_with_index do |sent, index|
		sent = sent.gsub(/[\n\s]+/m, " ").strip
		words = sent.downcase.split(/[^[:alpha:][:digit:]]+/)
		word = nil; wi = 0; min = 9999999999; max = 0; unk_count = 0
		while (wi < words.length) do
			word = words[wi]; wi += 1
			w = nil; b = nil; e = nil
			while (true) do
				inter = intervals.shift#; break if inter == nil
				b = inter.match(/xmin = ([\d\.]+)/)[1].to_f
				e = inter.match(/xmax = ([\d\.]+)/)[1].to_f
				w = inter.match(/text = "(.*)"/)[1]
				if (w == "<unk>"); unk_count += 1; end
				break if (w == word || w == "<unk>")
				if (w != "" && w != "<unk>")
					print "\n[ #{wi}-#{unk_count} ] "
					wi -= unk_count + 1; word = words[wi]; wi += 1
					puts "#{w}-#{word}"
					while (word != w) do
						word = words[wi]; wi += 1
						return if wi > words.length
					end
					unk_count = 0
					break
				end
			end
			min = b if min > b
			max = e
			print "#{w} " #"#{wi}-#{w} "
		end ## while (wi < words.length)
		puts "\n#{min} - #{max}\n\n"
		next if (index < existed_index)
		next if (max == 0)
		srt_file.puts "#{index+1}\n#{secs_to_srt_time(start+min)} --> #{secs_to_srt_time(start+max)}\n#{sent}\n\n"
	end ## sents.each_with_index
  	end
end


Dir.glob("phaps/*_0") do |phapname|
	phapname = phapname.sub(/_0$/, "")
	start = 0; i = 0; filename = "#{phapname}_#{i}"	
	while File.exist?(filename) do
		textgrid = filename + "-#{i}.TextGrid"
		if File.exist?(textgrid)
			puts lab_filename = "#{filename}/#{i}.lab"
			puts srt_filename = "../#{filename}.srt"
			textgrid_to_srt(textgrid, lab_filename, srt_filename, start)
			start += File.open(textgrid).read.match(/xmax = (\d+(\.\d+)?)/)[1].to_f
		end
		i += 1; filename = "#{phapname}_#{i}"
	end
end