require 'open-uri'

while true do
c = open("https://sutamphap.com/").read
m = c.match(/thien-ngon">(.+?)<\/div/m)
q = m[1].gsub('<span style="font-weight: 400;">', '').gsub('</span>', '')
q = q.gsub("<p>", " ").gsub("</p>", " ")
q = normalize(q)
puts q
quotes[q] = true
File.open("quotes.txt", "w") { |f| f.puts quotes.keys }
end

return

n = 97
for i in 18..18 do
	url = "https://sutamphap.com/loai-thuyet-phap/cac-chu-de-tu-tap-trong-cuoc-song/page/#{i}"
	# puts url
	c = open(url).read
	# "https://sutamphap.com/?post_type=thuyet-phap&p=6760"
	# "https://sutamphap.com/wp-content/uploads/2020/03/thuyetphap-ODoiMoiLaMatTran.mp3"
	c.scan(/text-item-thuyet-phap"\s\S+p=(\d+)/) { |p|
		page = "https://sutamphap.com/?post_type=thuyet-phap&p=#{p[0]}"
		m = open(page).read
		t = m.match(/title-post">(.+?)</)[1]
		a = m.match(/https\S+?mp3/)[0]
		puts "phap[#{n+=1}] = ['#{t}', '#{a}']"
	}
end
