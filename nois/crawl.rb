require 'open-uri'

# for i in 12..14 do
# 	url = "https://sutamphap.com/loai-thuyet-phap/thu-noi/page/#{i}"
# 	n = (i-1)*6
# 	# puts "#{n}, #{url}"
# 	c = open(url).read
# 	c.scan(/text-item-thuyet-phap"\s\S+p=(\d+)/) { |p|
# 		page = "https://sutamphap.com/?post_type=thuyet-phap&p=#{p[0]}"
# 		m = open(page).read
# 		t = m.match(/title-post">(.+?)</)[1]
# 		a = m.match(/https.+?(mp3|m4a)/i)[0]
# 		puts "phap[#{n+=1}] = ['#{t})', '#{a}']"
# 	}
# end

phap = []
phap[1] = ['Tính cách có cần sửa không (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/04/TInh-cach-co-can-sua-khong-1.mp3']
phap[2] = ['Giai đoạn tu tập khó khăn (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/04/Giai-doan-tu-tap-kho-khan.mp3']
phap[3] = ['Bơ vơ (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/04/Bo-vo.mp3']
phap[4] = ['Sao khó chịu chẳng chịu đi (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/04/Sao-kho-chiu-chang-chiu-di.mp3']
phap[5] = ['Một số nguyên lý thiền (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/04/Mot-so-nguyen-ly-thien.mp3']
phap[6] = ['Lo lắng (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/04/Lo-Lang.mp3']
phap[7] = ['Vô cảm (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/04/Vo-cam.mp3']
phap[8] = ['Cách thực hành thiền chánh niệm (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/04/Cach-thuc-hanh-thien-chanh-niem.mp3']
phap[9] = ['Tu ở chùa và ở đời (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/04/Tu-o-chua-va-o-doi.mp3']
phap[10] = ['Sân và cách vượt qua (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/03/San-va-cach-vuot-qua.mp3']
phap[11] = ['Góc khuất xấu xí (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/03/Goc-khuat-xau-xi.mp3']
phap[12] = ['Bản chất của cuộc sống (Ngọc bảo)', 'https://sutamphap.com/wp-content/uploads/2021/03/Ban-chat-cua-cuoc-song.mp3']
phap[13] = ['Tâm rộng mở (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/03/Tam-rong-mo.mp3']
phap[14] = ['Tính cách có cần sửa không (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/03/TInh-cach-co-can-sua-khong.mp3']
phap[15] = ['Cho tất cả các học trò đến tu học với Thầy (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/03/Cho-tat-ca-hoc-tro-den-tu-hoc-voi-thay.mp3']
phap[16] = ['Xuất gia hay trốn đời (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/03/Xuat-gia-hay-tron-doi.mp3']
phap[17] = ['Sao chẳng hết sân (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/03/Sao-chang-het-san.mp3']
phap[18] = ['Vượt qua dễ duôi (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/03/Vuot-qua-de-duoi.mp3']
phap[19] = ['Mấy lời chia sẻ cho người muốn xuất gia (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/03/May-loi-chia-se-cho-nguoi-muon-xuat-gia.mp3']
phap[20] = ['Sự thật về khổ (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/03/Su-that-ve-kho.mp3']
phap[21] = ['Một ngày mai chưa hề biết (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/03/Mot-ngay-mai-chua-he-biet.mp3']
phap[22] = ['Niệm gì (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/03/Niem-gi.mp3']
phap[23] = ['Đừng vội vàng (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/02/Dung-voi-vang.mp3']
phap[24] = ['Biết và thấy (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/02/Biet-va-thay-mix.mp3']
phap[25] = ['Vô cảm (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/02/Vo-cam.mp3']
phap[26] = ['Hãy cười vui lên (Giọng đọc Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/02/Hay-cuoi-vui-len.mp3']
phap[27] = ['Chánh niệm khó quá (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/02/Chanh-niem-kho-qua-mix.mp3']
phap[28] = ['Chỉ tồn tại trong suy nghĩ (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/02/Chi-ton-tai-trong-suy-nghi-mix.mp3']
phap[29] = ['Tâm và pháp  (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/02/Tam-va-phap-mix.mp3']
phap[30] = ['Một số nguyên lý thiền (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/02/Mot-so-nguyen-ly-thien-mix.mp3']
phap[31] = ['Giai đoạn tu tập khó khăn (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/02/Giai-doan-tu-tap-kho-khan-mix.mp3']
phap[32] = ['Chánh niệm chỉ là phương tiện (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/02/Chanh-niem-chi-la-phuong-tien-ghep.mp3']
phap[33] = ['Cai nghiện (Hải Yến)', 'https://sutamphap.com/wp-content/uploads/2021/02/CaiNghien-ThuNoi-HaiYen.mp3']
phap[34] = ['Sợ thay đổi (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/01/SOTHAYDOI.mp3']
phap[35] = ['Chuyện ăn uống đúng (Giọng đọc Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/01/CHUYENANUONGDUNG.mp3']
phap[36] = ['Cho tất cả các học trò đến tu học với Thầy (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2021/01/Cho-Tat-Ca-Cac-Hoc-Tro-Den-Tu-Hoc-Voi-Thay-v2a.mp3']
phap[37] = ['Định vị tương lai (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2021/01/DINHVITUONGLAI.mp3']
phap[38] = ['Sống thuận Pháp như thế nào (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2020/12/SONGTHUANPHAPNHUTHENAO.mp3']
phap[39] = ['Biết và thấy (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/12/Biet-va-Thay-v2a.mp3']
phap[40] = ['Đấu tranh với cuộc sống (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2020/12/DAUTRANHVOICUOCSONG.mp3']
phap[41] = ['Lo lắng (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/12/Lo-Lang-v2a.mp3']
phap[42] = ['Chánh niệm thanh lọc thân tâm (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2020/12/Chanh-niem-thanh-loc-than-tam.mp3']
phap[43] = ['Sao chẳng hết sân (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/12/Sao-Chang-Het-San-v2a.mp3']
phap[44] = ['Băn khoăn cuộc sống (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2020/12/Ban-khoan-cuoc-song.mp3']
phap[45] = ['Bơ vơ (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/12/Bo-Vo-v2a.mp3']
phap[46] = ['Bức thư không muốn gửi (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2020/12/Buc-thu-khong-muon-gui.mp3']
phap[47] = ['Tại sao khó chịu chẳng chịu đi (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/12/Tai-Sao-Kho-Chiu-Chang-Chiu-Di-v2a.mp3']
phap[48] = ['Tình duyên', 'https://sutamphap.com/wp-content/uploads/2020/11/Tinh-Duyen.mp3']
phap[49] = ['Định nghĩa chánh niệm (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/11/Dinh-Nghia-Chanh-Niem-v2a.mp3']
phap[50] = ['Cuộc đời bị đánh cắp (Ngọc Bảo)', 'https://sutamphap.com/wp-content/uploads/2020/11/CuocDoiBiDanhCap.mp3']
phap[51] = ['Góc khuất xấu xí (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/11/Goc-Khuat-Xau-Xi-v2a.mp3']
phap[52] = ['Nhật ký chánh niệm', 'https://sutamphap.com/wp-content/uploads/2020/10/NhatKyChanhNiem.mp3']
phap[53] = ['Một ngày mai chưa hề biết (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/10/Mot-Ngay-Mai-Chua-He-Biet-v2b.mp3']
phap[54] = ['Yêu và đau khổ', 'https://sutamphap.com/wp-content/uploads/2020/10/YeuVaDauKho.mp3']
phap[55] = ['Sân và cách vượt qua (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/10/San-va-Cach-Vuot-Qua-v2a.mp3']
phap[56] = ['Bản chất của cuộc sống (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/10/Ban-Chat-Cua-Cuoc-Song-v2a.mp3']
phap[57] = ['Bạn đạo và hội nhóm Phật tử', 'https://sutamphap.com/wp-content/uploads/2020/10/Hoi-Nhom-Phat-Tu.mp3']
phap[58] = ['Tâm rộng mở (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/10/Tam-Rong-Mo-v2a.mp3']
phap[59] = ['Cách thực hành thiền Chánh niệm', 'https://sutamphap.com/wp-content/uploads/2020/10/Cach-Thuc-Hanh-Thien-Chanh-Niem.mp3']
phap[60] = ['Mấy lời chia sẻ cho người muốn xuất gia (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/09/May-Loi-Chia-Se-Cho-Nguoi-Muon-Xuat-Gia-v1c.mp3']
phap[61] = ['Chỉ tồn tại trong suy nghĩ (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/09/Chi-Ton-Tai-Trong-Suy-Nghi-v2a.mp3']
phap[62] = ['Tu ở chùa và ở đời (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/09/Tu-O-Chua-Va-O-Doi.mp3']
phap[63] = ['Tính cách có cần sửa không (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/09/Tinh-Cach-Co-Can-Sua-Khong-v2b.mp3']
phap[64] = ['Giai đoạn tu tập khó khăn (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/09/Giai-Doan-Tu-Tap-Kho-Khan-v2a.mp3']
phap[65] = ['Nửa đạo nửa đời', 'https://sutamphap.com/wp-content/uploads/2020/08/Nua-Dao-Nua-Doi-v2a.mp3']
phap[66] = ['Xuất gia hay trốn đời (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/08/Xuat-Gia-Hay-Tron-Doi-v2a.mp3']
phap[67] = ['Một số nguyên lý thiền (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/08/Mot-so-nguyen-ly-thien.mp3']
phap[68] = ['Tâm và Pháp', 'https://sutamphap.com/wp-content/uploads/2020/08/Tam-va-Phap-edited.mp3']
phap[69] = ['Nỗi oan của Corona (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/07/Noi-Oan-Corona-v2a.m4a']
phap[70] = ['Vô cảm (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/07/Vo-cam.mp3']
phap[71] = ['Sự thật về Khổ (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/07/Su-that-ve-kho.mp3']
phap[72] = ['Chánh niệm khó quá (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/07/Chanh-niem-kho-qua.mp3']
phap[73] = ['Chánh niệm chỉ là phương tiện (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/07/Chanh-niem-chi-la-phuong-tien.mp3']
phap[74] = ['Buông bỏ phiền não (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/06/Buong-bo-phien-nao.mp3']
phap[75] = ['Hãy cười vui lên (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/06/Hay-cuoi-vui-len.mp3']
phap[76] = ['Niệm gì (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/06/Niem-gi.m4a']
phap[77] = ['Đừng vội vàng (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/06/Dung-Voi-Vang.m4a']
phap[78] = ['Cai nghiện (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/06/thuyetPhap_CaiNghien.m4a']
phap[79] = ['Vượt qua dễ duôi (Tố Anh)', 'https://sutamphap.com/wp-content/uploads/2020/06/Vuot-qua-de-duoi.m4a']

for i in 1..79 do
# `wget #{phap[i][1]}`
	name = phap[i][1].split('/')[-1].sub(/\..+/,'')
	next unless File.exist?("#{name}.ogg") && File.size("#{name}.ogg") > 0
	#print "{\"title\":\"#{phap[i][0]}\",\"audio\":\"nois/#{name}.ogg?#{phap[i][1]}\"},"
	puts "\"nois/#{name}.ogg\" to \"#{phap[i][0]}\""
end
