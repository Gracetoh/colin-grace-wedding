-- AUTO-GENERATED SEED DATA from 'Wedding 2026 Planning.xlsx'
-- Run AFTER schema.sql. Re-running duplicates rows, so run once.

insert into settings(key,value) values
  ('partner1','Colin'),
  ('partner2','Grace'),
  ('wedding_date','2026-09-12'),
  ('rsvp_date','2025-10-30'),
  ('venue','Shangri-La'),
  ('budget_total','60000')
on conflict (key) do nothing;

insert into tables(label,capacity,sort) values
  ('VIP Groom',12,0),
  ('VIP Bride',12,1),
  ('Table 1',10,2),
  ('Table 2',10,3),
  ('Table 3',10,4),
  ('Table 4',10,5),
  ('Table 5',10,6),
  ('Table 6',10,7),
  ('Table 7',10,8),
  ('Table 8',10,9),
  ('Table 9',10,10),
  ('Table 10',10,11),
  ('Table 11',10,12),
  ('Table 12',10,13),
  ('Table 13',10,14),
  ('Table 14',10,15),
  ('Table 15',10,16),
  ('Table 16',10,17),
  ('Table 17',10,18),
  ('Table 18',10,19),
  ('Table 19',10,20),
  ('Table 20',10,21),
  ('Table 21',10,22),
  ('Table 22',10,23);

insert into guests(full_name,age_group,guest_of,invitation_group,table_id,dietary,std_sent,inv_sent,rsvp_rom,rsvp_banquet,gift_received,gift_amount,sort) values
  ('Linda','Adult','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),null,false,false,'yes','yes',false,null,0),
  ('Ser Chye','Adult','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),null,false,false,'yes','yes',false,null,1),
  ('Calvin','Adult','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),null,false,false,'yes','yes',false,null,2),
  ('Gena','Adult','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),null,false,false,'yes','yes',false,null,3),
  ('James','Adult','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),null,false,false,'yes','yes',false,null,4),
  ('Arielle','Adult','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),null,false,false,'yes','yes',false,null,5),
  ('Averie (baby)','Kid','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),'Kids Meal',false,false,'yes','pending',false,null,6),
  ('Colin','Adult','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),null,false,false,'yes','yes',false,null,7),
  ('Grace','Adult','Colin','Colin Fam',(select id from tables where label='VIP Groom' limit 1),'No Beef',false,false,'yes','yes',false,null,8),
  ('Joy','Adult','Grace','Grace Fam',(select id from tables where label='VIP Bride' limit 1),'No Beef',true,false,'yes','yes',false,null,9),
  ('Vince','Adult','Grace','Grace Fam',(select id from tables where label='VIP Bride' limit 1),'No Beef',true,false,'yes','yes',false,null,10),
  ('Xavier','Adult','Grace','Grace Fam',(select id from tables where label='VIP Bride' limit 1),'No Beef',true,false,'yes','yes',false,null,11),
  ('Veronica','Adult','Grace','Grace Fam',(select id from tables where label='VIP Bride' limit 1),'No Beef',false,false,'yes','yes',false,null,12),
  ('Tim','Adult','Grace','Grace Fam',(select id from tables where label='VIP Bride' limit 1),null,false,false,'yes','yes',false,null,13),
  ('Zaryl','Adult','Grace','Grace Fam',(select id from tables where label='VIP Bride' limit 1),null,false,false,'yes','yes',false,null,14),
  ('Ahma','Adult','Grace','Grace Fam',(select id from tables where label='VIP Bride' limit 1),'No Beef',false,false,'yes','yes',false,null,15),
  ('Helper','Adult','Grace','Grace Fam',(select id from tables where label='VIP Bride' limit 1),'No Pork',false,false,'yes','yes',false,null,16),
  ('Patricia KANG Ang Guat','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,17),
  ('Jimmy PEH Keow Bee','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,18),
  ('Larry KANG Ann Beng','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,19),
  ('Bee Lian','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,20),
  ('Mr. & Mrs. YIP Keng Soon','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,21),
  ('Mr. & Mrs. YIP Keng Soon','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,22),
  ('Lister KANG Ann Sen','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,23),
  ('Jenny LAU','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,24),
  ('Irene KANG','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,25),
  ('Esther Kang','Adult','Colin','Linda Fam',(select id from tables where label='Table 3' limit 1),null,false,false,'pending','yes',false,null,26),
  ('Rosalind','Adult','Colin','Linda Fam',(select id from tables where label='Table 4' limit 1),null,false,false,'pending','yes',false,null,27),
  ('Carol','Adult','Colin','Linda Fam',(select id from tables where label='Table 4' limit 1),null,false,false,'pending','yes',false,null,28),
  ('Rosa','Adult','Colin','Linda Fam',(select id from tables where label='Table 4' limit 1),null,false,false,'pending','yes',false,null,29),
  ('Jessica','Adult','Colin','Linda Fam',(select id from tables where label='Table 4' limit 1),null,false,false,'pending','yes',false,null,30),
  ('Linda goh','Adult','Colin','Linda Fam',(select id from tables where label='Table 4' limit 1),null,false,false,'pending','yes',false,null,31),
  ('Foon choon','Adult','Colin','Linda Fam',(select id from tables where label='Table 4' limit 1),null,false,false,'pending','yes',false,null,32),
  ('Jin feng','Adult','Colin','Linda Fam',(select id from tables where label='Table 4' limit 1),null,false,false,'pending','yes',false,null,33),
  ('Teck Hock Wife','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,34),
  ('Roger Chua','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,35),
  ('Roger wife','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,36),
  ('Neo Ah Kim','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,37),
  ('Paul Chua Wei Peng','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,38),
  ('Kok King Min','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,39),
  ('Kok King Min Wife','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,40),
  ('Guo Hui Ling','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,41),
  ('Hui Ling Daughter','Kid','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),'Kids Meal',false,false,'pending','pending',false,null,42),
  ('Chua Teck Suan','Adult','Grace','Joy Fam',(select id from tables where label='Table 5' limit 1),null,false,false,'pending','yes',false,null,43),
  ('Mary','Adult','Grace','Joy Fam',(select id from tables where label='Table 6' limit 1),null,false,false,'pending','yes',false,null,44),
  ('Daniel','Adult','Grace','Joy Fam',(select id from tables where label='Table 7' limit 1),null,false,false,'pending','pending',false,null,45),
  ('Owen','Adult','Grace','Joy Fam',(select id from tables where label='Table 7' limit 1),null,false,false,'pending','pending',false,null,46),
  ('Sean','Adult','Grace','Joy Fam',(select id from tables where label='Table 7' limit 1),null,false,false,'pending','pending',false,null,47),
  ('Kenny','Adult','Grace','Joy Fam',(select id from tables where label='Table 7' limit 1),null,false,false,'pending','pending',false,null,48),
  ('ryan wong',null,'Grace','Joy Fam',(select id from tables where label='Table 7' limit 1),null,false,false,'pending','pending',false,null,49),
  ('4th uncle','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','pending',false,null,50),
  ('wife','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','pending',false,null,51),
  ('caitong','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','pending',false,null,52),
  ('bingru','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','pending',false,null,53),
  ('caiwei','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','pending',false,null,54),
  ('caiwei (toddler)','Kid','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','pending',false,null,55),
  ('shingdong','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','pending',false,null,56),
  ('Phillip Wife','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','yes',false,null,57),
  ('Phillip','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','yes',false,null,58),
  ('Adelyn Toh','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','yes',false,null,59),
  ('wenjun','Adult','Grace','Vince Fam',(select id from tables where label='Table 8' limit 1),null,false,false,'pending','yes',false,null,60),
  ('susan','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','yes',false,null,61),
  ('jimmy','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','yes',false,null,62),
  ('jimmy mom','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','pending',false,null,63),
  ('wei meng','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','yes',false,null,64),
  ('wei liang','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','yes',false,null,65),
  ('spencer (baby)','Kid','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),null,false,false,'pending','pending',false,null,66),
  ('sherice','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','yes',false,null,67),
  ('ah huat','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','pending',false,null,68),
  ('shuzu','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','yes',false,null,69),
  ('ethan','Adult','Grace','Vince Fam',(select id from tables where label='Table 9' limit 1),'No Beef',false,false,'pending','yes',false,null,70),
  ('Skyler','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','no',false,null,71),
  ('racheal','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','yes',false,null,72),
  ('Wen Bin (Rachael bf)',null,'Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','yes',false,null,73),
  ('Dinghan','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','yes',false,null,74),
  ('Jollie (Dinghan GF)','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','yes',false,null,75),
  ('desmond','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','no',false,null,76),
  ('dennis','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','no',false,null,77),
  ('wenglum (dennis gf)','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','no',false,null,78),
  ('jortekh','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','yes',false,null,79),
  ('Geoffrey','Adult','Grace','Grace Friends',(select id from tables where label='Table 10' limit 1),null,true,false,'pending','yes',false,null,80),
  ('Teresa','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','no',false,null,81),
  ('Joy','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','pending',false,null,82),
  ('Margaret','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','yes',false,null,83),
  ('Kai Xien','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','yes',false,null,84),
  ('Diana','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','pending',false,null,85),
  ('Kai le','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','no',false,null,86),
  ('Freda Wee','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','yes',false,null,87),
  ('Luana','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','no',false,null,88),
  ('Harris','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','yes',false,null,89),
  ('Joash','Adult','Grace','Grace Friends',(select id from tables where label='Table 11' limit 1),null,true,false,'pending','pending',false,null,90),
  ('Alcalvie','Adult','Colin','Colin Airforce',(select id from tables where label='Table 21' limit 1),null,false,false,'pending','yes',false,null,91),
  ('Sean','Adult','Colin','Colin Airforce',(select id from tables where label='Table 21' limit 1),null,false,false,'pending','yes',false,null,92),
  ('Melvin','Adult','Colin','Colin Airforce',(select id from tables where label='Table 21' limit 1),'Broad beans',false,false,'pending','yes',false,null,93),
  ('Darren','Adult','Colin','Colin 127',(select id from tables where label='Table 21' limit 1),null,false,false,'pending','yes',false,null,94),
  ('Jin Kai','Adult','Colin','Colin 127',(select id from tables where label='Table 21' limit 1),null,false,false,'pending','yes',false,null,95),
  ('Peng Hong','Adult','Colin','Colin 127',(select id from tables where label='Table 21' limit 1),null,false,false,'pending','pending',false,null,96),
  ('Chow Wei Li','Adult','Colin','Colin 127',(select id from tables where label='Table 21' limit 1),null,false,false,'pending','yes',false,null,97),
  ('May Lee Hui Ling','Adult','Colin','Colin 127',null,null,false,false,'pending','yes',false,null,98),
  ('Lyndon','Adult','Colin','Colin Uni Friends',(select id from tables where label='Table 21' limit 1),null,false,false,'pending','yes',false,null,99),
  ('Cheryl','Adult','Colin','Colin Uni Friends',(select id from tables where label='Table 21' limit 1),null,false,false,'pending','yes',false,null,100),
  ('Jun Wei','Adult','Colin','Colin Uni Friends',(select id from tables where label='Table 21' limit 1),'No Beef',false,false,'pending','yes',false,null,101),
  ('Yean Huar','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,false,false,'pending','yes',false,null,102),
  ('Fangyi','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,false,false,'pending','yes',false,null,103),
  ('Allan','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,false,false,'pending','yes',false,null,104),
  ('Minghui','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,true,false,'pending','yes',false,null,105),
  ('Yumeng','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,true,false,'pending','yes',false,null,106),
  ('Yolanda','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,true,false,'pending','yes',false,null,107),
  ('Weina','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,true,false,'pending','yes',false,null,108),
  ('Julia','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,true,false,'pending','yes',false,null,109),
  ('Jacob','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,true,false,'pending','yes',false,null,110),
  ('Yuhan','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 12' limit 1),null,true,false,'pending','yes',false,null,111),
  ('Ren Jun','Adult','Colin','Colin Shopee Friends',(select id from tables where label='Table 13' limit 1),null,false,false,'pending','yes',false,null,112),
  ('Xiao Feng','Adult','Colin','Colin Bytedance',(select id from tables where label='Table 13' limit 1),null,true,false,'pending','yes',false,null,113),
  ('Mia','Adult','Colin','Colin Bytedance',(select id from tables where label='Table 13' limit 1),null,false,false,'pending','yes',false,null,114),
  ('Ming Jun','Adult','Colin','Colin Bytedance',(select id from tables where label='Table 13' limit 1),null,true,false,'pending','yes',false,null,115),
  ('Shaun','Adult','Colin','Colin Bytedance',(select id from tables where label='Table 13' limit 1),null,true,false,'pending','yes',false,null,116),
  ('Carmen','Adult','Colin','Colin Bytedance',(select id from tables where label='Table 13' limit 1),null,true,false,'pending','yes',false,null,117),
  ('Bryce','Adult','Colin','Colin Bytedance',(select id from tables where label='Table 13' limit 1),null,true,false,'pending','yes',false,null,118),
  ('Sherman','Adult','Colin','Colin Bytedance',(select id from tables where label='Table 13' limit 1),null,true,false,'pending','yes',false,null,119),
  ('Yi Xin','Adult','Colin','Colin Bytedance',(select id from tables where label='Table 13' limit 1),null,true,false,'pending','yes',false,null,120),
  ('DC Chang','Adult','Colin','Colin Crypto Friends',(select id from tables where label='Table 14' limit 1),null,true,true,'pending','yes',false,null,121),
  ('Joel','Adult','Colin','Colin Crypto Friends',(select id from tables where label='Table 14' limit 1),null,true,false,'pending','yes',false,null,122),
  ('Jiaxu','Adult','Colin','Colin ByteDance',(select id from tables where label='Table 14' limit 1),null,false,false,'pending','yes',false,null,123),
  ('Yong Chun Yuan','Adult','Colin','Colin Crypto Friends',(select id from tables where label='Table 14' limit 1),null,true,false,'pending','yes',false,null,124),
  ('Cooker','Adult','Colin','Colin Crypto Friends',(select id from tables where label='Table 14' limit 1),null,true,false,'pending','yes',false,null,125),
  ('Yifan','Adult','Colin','Colin Crypto Friends',(select id from tables where label='Table 14' limit 1),null,true,false,'pending','yes',false,null,126),
  ('Jia Yun','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 14' limit 1),null,true,false,'pending','pending',false,null,127),
  ('Bryan','Adult','Colin','Colin Unilever Friends',(select id from tables where label='Table 15' limit 1),null,true,false,'pending','yes',false,null,128),
  ('Matilda','Adult','Colin','Colin Unilever Friends',(select id from tables where label='Table 15' limit 1),null,true,false,'pending','yes',false,null,129),
  ('Chua Jia Xuan','Adult','Colin','Colin Unilever Friends',(select id from tables where label='Table 15' limit 1),null,true,false,'pending','yes',false,null,130),
  ('Ernest Chua','Adult','Colin','Colin Unilever Friends',(select id from tables where label='Table 15' limit 1),null,true,false,'pending','yes',false,null,131),
  ('Marcus Visa','Adult','Colin','Colin NUS',(select id from tables where label='Table 15' limit 1),null,true,false,'pending','yes',false,null,132),
  ('Kristine','Adult','Colin','Colin NUS',(select id from tables where label='Table 15' limit 1),null,false,false,'pending','yes',false,null,133),
  ('David Viswa','Adult','Colin','Colin Internship',(select id from tables where label='Table 15' limit 1),null,true,false,'pending','yes',false,null,134),
  ('Pierre','Adult','Colin','Tiffany SA',(select id from tables where label='Table 15' limit 1),null,true,false,'pending','yes',false,null,135),
  ('Grace Neo','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),'Yes',true,false,'pending','yes',false,null,136),
  ('Jesmond','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),'Yes',true,false,'pending','pending',false,null,137),
  ('Calida','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),'Yes',true,false,'pending','yes',false,null,138),
  ('Jun Yi','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),'Yes',true,false,'pending','yes',false,null,139),
  ('Stephanie','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),'Yes',true,false,'pending','yes',false,null,140),
  ('Jerald','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),'Yes',true,false,'pending','yes',false,null,141),
  ('Yue Wei','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),null,true,false,'pending','yes',false,null,142),
  ('Clarence','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),null,true,false,'pending','yes',false,null,143),
  ('Pritha Malhotra','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),null,true,false,'pending','yes',false,null,144),
  ('Ting Yew','Adult','Colin','Colin Sec friends',(select id from tables where label='Table 16' limit 1),null,false,false,'pending','yes',false,null,145),
  ('Benjamin','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 17' limit 1),null,true,false,'pending','yes',false,null,146),
  ('Yuxiang','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 17' limit 1),null,true,false,'pending','yes',false,null,147),
  ('Sailesh','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 17' limit 1),null,true,false,'pending','yes',false,null,148),
  ('Daniel yeo','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 17' limit 1),null,true,false,'pending','yes',false,null,149),
  ('Wei Jie','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 17' limit 1),null,true,false,'pending','yes',false,null,150),
  ('Su','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 17' limit 1),null,false,false,'pending','yes',false,null,151),
  ('Glen','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 17' limit 1),null,true,false,'pending','yes',false,null,152),
  ('Feng Dan','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 17' limit 1),null,true,false,'pending','yes',false,null,153),
  ('Chan Qing Sheng','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 18' limit 1),null,true,false,'pending','yes',false,null,154),
  ('Gan Wen Xuan','Adult','Grace','Colin JC Friends',(select id from tables where label='Table 18' limit 1),null,true,false,'pending','yes',false,null,155),
  ('Raymond Ho','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 18' limit 1),null,true,false,'pending','pending',false,null,156),
  ('Wee Tin','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 18' limit 1),null,true,false,'pending','pending',false,null,157),
  ('Oliver','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 18' limit 1),null,true,false,'pending','yes',false,null,158),
  ('Suan Hwee','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 18' limit 1),null,true,false,'pending','yes',false,null,159),
  ('Si Beng Chua','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 18' limit 1),null,false,false,'pending','yes',false,null,160),
  ('Celine Ong','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 18' limit 1),null,true,false,'pending','yes',false,null,161),
  ('Han Mei','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 19' limit 1),null,true,false,'pending','yes',false,null,162),
  ('Shao Ye','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 19' limit 1),null,true,false,'pending','yes',false,null,163),
  ('Zhen Jie','Adult','Colin','Colin Uni Hall Friends',(select id from tables where label='Table 19' limit 1),null,true,false,'pending','yes',false,null,164),
  ('Glenn','Adult','Colin','Squash',(select id from tables where label='Table 19' limit 1),null,true,false,'pending','yes',false,null,165),
  ('Nicholas Ting','Adult','Colin','Colin JC Friends',(select id from tables where label='Table 19' limit 1),null,false,false,'pending','pending',false,null,166),
  ('Aaron Neo','Adult','Colin','DCC',(select id from tables where label='Table 20' limit 1),null,true,false,'pending','yes',false,null,167),
  ('Micheal','Adult','Colin','DCC',(select id from tables where label='Table 20' limit 1),null,true,false,'pending','yes',false,null,168),
  ('Cun Yuan','Adult','Colin','DCC',(select id from tables where label='Table 20' limit 1),null,true,false,'pending','yes',false,null,169),
  ('Austin (Sung Chan)','Adult','Colin','DCC',(select id from tables where label='Table 20' limit 1),null,false,false,'pending','yes',false,null,170),
  ('Benjamin Koh','Adult','Colin','DCC',(select id from tables where label='Table 20' limit 1),null,true,false,'pending','pending',false,null,171),
  ('Elliot','Adult','Colin','DCC',(select id from tables where label='Table 20' limit 1),null,true,false,'pending','yes',false,null,172),
  ('Gene','Adult','Colin','DCC',(select id from tables where label='Table 20' limit 1),null,false,false,'pending','pending',false,null,173),
  ('Dong Ru','Adult','Colin','DCC',(select id from tables where label='Table 20' limit 1),null,true,false,'pending','yes',false,null,174),
  ('Guang Xiang','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,175),
  ('Kelvin','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,176),
  ('Wenxiu','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,177),
  ('Biondi','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,178),
  ('Peiwen','Adult','Grace',null,null,null,false,false,'pending','yes',false,null,179),
  ('Junen','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,180),
  ('Junen GF','Adult','Grace',null,null,null,false,false,'pending','yes',false,null,181),
  ('Elijah Seah','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,182),
  ('Wen Jett','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,183),
  ('Eva','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,184),
  ('Jonathan','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,185),
  ('Jia Hui','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 21' limit 1),null,true,false,'pending','yes',false,null,186),
  ('Justin','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','yes',false,null,187),
  ('ShunYi','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),'No honeyNo hard shell food like crab and lobster',true,false,'pending','yes',false,null,188),
  ('Ze Yu','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','yes',false,null,189),
  ('Natalie Yeoh','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','yes',false,null,190),
  ('Zach Lim (Natalie Fiancee)','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','yes',false,null,191),
  ('Jiale','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','yes',false,null,192),
  ('Ng Gee Wah','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','yes',false,null,193),
  ('Arka','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','no',false,null,194),
  ('Fiona','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','yes',false,null,195),
  ('Christopher Liew','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,false,false,'pending','yes',false,null,196),
  ('Ming En','Adult','Grace','Grace HTX colleagues',null,null,false,false,'pending','no',false,null,197),
  ('Mei Jie','Adult','Grace','Grace HTX colleagues',(select id from tables where label='Table 22' limit 1),null,true,false,'pending','no',false,null,198),
  ('Shi Wei','Adult','Grace','Grace''s AISG Friends',null,null,true,false,'pending','yes',false,null,199),
  ('Sydney','Adult','Grace','Grace''s AISG Friends',null,null,true,false,'pending','yes',false,null,200),
  ('Junsheng','Adult','Grace','Grace''s AISG Friends',null,null,true,false,'pending','yes',false,null,201),
  ('Kai jie','Adult','Grace','Grace''s AISG Friends',null,null,true,false,'pending','pending',false,null,202),
  ('Eugene','Adult','Grace','Grace''s AISG Friends',null,null,true,false,'pending','yes',false,null,203),
  ('Kin','Adult','Grace','Grace''s Binance Friends',null,null,true,false,'pending','no',false,null,204),
  ('Keefe','Adult','Grace','Grace''s Binance Friends',null,null,true,false,'pending','no',false,null,205),
  ('Chrysline',null,'Grace','Grace''s Binance Friends',null,null,true,false,'pending','no',false,null,206),
  ('Haowei',null,'Grace','Grace''s Binance Friends',null,null,true,false,'pending','yes',false,null,207),
  ('Jennifer',null,'Grace',null,null,null,true,false,'pending','pending',false,null,208),
  ('Micheal',null,'Grace',null,null,null,true,false,'pending','no',false,null,209);

insert into budget_items(category,name,details,planned,actual,paid,due_date,vendor,contact,website,notes,sort) values
  ('Bride and Groom''s Attire','Wedding dress & suit rental','- Gown x3
- Suit x2

Rico-A-Mona Bridal


add on suit +380 + GST (for first suit)
second suit + 300 + GST
extra kua + 280 + GST',2980.0,2880.0,2616.0,null,'Rico A Mona',null,'https://www.rico-a-mona.com/packages/','- 40% deposit to reserve gowns
- 40% to lock in on the gown designs
- 20% final fitting


C& G split the bill',0),
  ('Bride and Groom''s Attire','Bridal shoes',null,300.0,130.0,130.0,null,null,null,null,null,1),
  ('Bride and Groom''s Attire','Groom''s shoes',null,null,null,null,null,null,null,null,null,2),
  ('Grooming','Bride''s hair and makeup (actual day)','ACTUAL DAY ELEGANCE
- 1 Fresh Look + 1 Style Change + Actual Day Inclusions


ACTUAL DAY INCLUSIONS
- Bridal makeup and hairstyling session(s)
- Full makeup and hair trial at our studio on
weekdays (excluding public holidays)
- Skin preparation process
- Cosmetic eyelashes for all actual
day makeup
- Brow trimming on your wedding day
- Makeup service at location of your choice*',1050.0,1050.0,525.0,'12 Sept 2026',' Autelier Makeup',null,'https://drive.google.com/file/d/1_9fcNaCaxvnGVH1SpvjqePfQthqtIlq5/view','$525 paid (19 June 2025, grace)',3),
  ('Grooming','surcharge before 7am
for colin
- per artist
- 50/hour before 7am',null,100.0,100.0,100.0,null,' Autelier Makeup
(associate artist)',null,null,'100% paid - grace',4),
  ('Grooming','Bride''s manicure/pedicure',null,70.0,null,null,null,null,null,null,null,5),
  ('Grooming','Grace''s mum makeup','- One fresh makeup and hairstyling
- Brow trim
- Cosmetic eyelashes',200.0,450.0,450.0,null,'Victoria Han',null,null,'100% paid - grace',6),
  ('Grooming','Groom''s Styling Add on',null,200.0,200.0,200.0,null,' Autelier Makeup
(associate artist)',null,null,'100% paid - grace',7),
  ('Grooming','surcharge before 7am
for grace
- per artist
- 50/hour before 7am',null,100.0,100.0,100.0,null,null,null,null,'100% paid - grace',8),
  ('Rings','Wedding bands',null,7000.0,9500.0,9500.0,null,null,null,null,'both paid',9),
  ('Stationery','Bingo Game',null,100.0,null,null,null,null,null,null,null,10),
  ('Stationery','lego guest book',null,0.0,null,null,null,null,null,null,null,11),
  ('Groom and Bride Floral','Bride''s bouquet + Groom''s Boutonnière',null,260.0,408.0,408.0,null,'casaflorales',null,null,'paid by grace',12),
  ('Groom and Bride Floral','Car decor',null,200.0,null,null,null,null,null,null,null,13),
  ('Wedding Party Attire / Gifts','Bridesmaid''s dress',null,320.0,61.0,61.0,null,null,null,null,'paid by grace',14),
  ('Wedding Party Attire / Gifts','Bridesmaid''s gifts',null,300.0,159.0,159.0,null,null,null,null,'paid by grace',15),
  ('Wedding Party Attire / Gifts','Groomsmen''s outfit',null,300.0,null,null,null,null,null,null,null,16),
  ('Wedding Party Attire / Gifts','Creamie Sippie Powder x4',null,63.96,0.0,0.0,null,null,null,'https://morimatcha.sg/products/mori-premium-barista-matcha-powder-ceremonial-grade','Sponsored',17),
  ('Wedding Party Attire / Gifts','Personalized Card x4',null,10.0,10.98,10.98,null,null,null,null,'paid by grace',18),
  ('Wedding Party Attire / Gifts','Matcha Tool Set x4',null,200.0,65.16,65.16,null,null,null,null,'paid by grace',19),
  ('Wedding Party Attire / Gifts','Wosado Eyelash x4',null,0.0,0.0,0.0,null,null,null,null,'Sponsored',20),
  ('Wedding Party Attire / Gifts','Matcha Glass cup x4',null,40.0,9.64,9.64,null,null,null,null,'paid by grace',21),
  ('Wedding Party Attire / Gifts','Glass Straw x4',null,8.0,5.24,5.24,null,null,null,null,'paid by grace',22),
  ('Wedding Party Attire / Gifts','Duffy Flower x4',null,80.0,42.84,42.84,null,null,null,null,'paid by grace',23),
  ('Wedding Party Attire / Gifts','Pink DIY Strips of paper',null,3.0,2.13,2.13,null,null,null,null,'paid by grace',24),
  ('Wedding Party Attire / Gifts','Taobao Delivery',null,20.0,null,null,null,null,null,null,null,25),
  ('Photography & Videography','Pre-wedding shoot photos',null,3000.0,2545.22,2545.22,null,'mondo_forest',null,'https://m.blog.naver.com/mondophoto/223466917626','Booked and paid 2,700,000 KRW to mondo_forest on 28 May 2025 for mondo total package 

- includes 2 dress and flower

- mondo total package (wedding standard) + video


- shoot: 2:30pm to 7:00pm

- need to hire helper thru cheongdamjimin
( 3 hours - 200,000won

5 hours - 250,000 won) - paid in cash on the shooting day

- gown fitting 10am

hair makeup 11:30am to 1:30pm



C&G 100% paid',26),
  ('Photography & Videography','Wedding (actual day) photographer',null,3000.0,2600.0,1300.0,'13 Sept 2026 (aft wedding)','wild hearts library',null,null,'- 10 hours $3188

- more than 580 colour edited images

8 hours $2600
- all colour edited images given



50% paid by colin (19 june 2025)',27),
  ('Photography & Videography','Pre-Wedding Video',null,424.16,424.16,null,'8th april','mondo_forest',null,null,'paid 500,000KRW',28),
  ('Photography & Videography','add on helper',null,212.08,212.08,null,'8th april',null,null,null,'250,000 KRW',29),
  ('Banquet Reception','Emcee',null,1000.0,738.0,null,'13 Sept 2026 (aft wedding)','emceecheng',null,'https://www.emceecheng.com/wedding',null,30),
  ('Banquet Reception','Venue set up and decoration',null,8000.0,8630.0,4315.0,'12 sept 2026','lefairymeadow',null,null,null,31),
  ('Banquet Reception','Angpaos to give',null,null,null,null,null,null,null,null,null,32),
  ('Banquet Reception','Venue',null,47672.24,47672.24,null,null,'Shangri-La',null,null,null,33),
  ('Banquet Reception','Matcha Live Station',null,1100.0,1100.0,1100.0,null,null,null,null,'paid by grace',34),
  ('ROM Ceremony + GDL','Officiant angpao',null,188.0,null,null,null,null,null,null,null,35),
  ('ROM Ceremony + GDL','ROM license fee',null,42.0,42.0,42.0,null,null,null,null,null,36),
  ('ROM Ceremony + GDL','GDL

Guo Da Li Package $238
Dowry Premium Set $258
Bed Setting Set $88
Hair Combing Set $38 (One set only)
Brides’s returning set $78
Mei Po GDL service $888 (include one pre-event video call)',null,1588.0,1508.6,800.0,'Pay the balance on 2nd July','Eternal Red Bonds',null,null,null,37),
  ('Misc.','Customised wedding angpaos',null,null,null,null,null,null,null,null,null,38),
  ('Guo Da Li preparation','VCA Necklace',null,1450.0,1450.0,1450.0,null,null,'Hazel',null,'Colin Paid',39),
  ('Guo Da Li preparation','cartier bracelet',null,4500.0,5320.0,5320.0,null,null,'Hazel',null,'Grace parents paid',40),
  ('Guo Da Li preparation','Rolex',null,22000.0,23300.0,23300.0,null,null,null,null,'Colin Pay',41),
  ('Guo Da Li preparation','Phoenix Bangle',null,3500.0,3595.78,3595.78,null,null,'Hazel',null,'Colin parents paid',42),
  ('Guo Da Li preparation','Bvlgari Diva Earring',null,1320.0,1320.0,1320.0,null,null,'Hazel',null,'Colin parents paid',43);

insert into todos(phase,task,status,priority,price,notes,sort) values
  ('> 1 YEAR','Select Wedding Date','Done','P0','Signed contract','12 September 2026''',0),
  ('15 TO 13 MONTHS','prepare bridesmaid proposal box','Done','P0',null,'do after finals end',1),
  ('> 1 YEAR','Come up with guest list to estimate no. of pax','Done',null,null,'200 pax',2),
  ('15 TO 13 MONTHS','Find Photographer / Videographer','Done','P0',null,'photographer AD:
wildheartslibrary

PWS Photographer  + film in Jeju:
Mondo Forest',3),
  ('> 1 YEAR','Set Wedding Budget','Done','P0',null,'$60k',4),
  ('15 TO 13 MONTHS','send out save the date message','Done',null,null,null,5),
  ('> 1 YEAR','Discuss Wedding Non-negotiables','Done','P0',null,'aesthetics is v impt to us!',6),
  ('15 TO 13 MONTHS','Reserve ceremony/reception venue','Done',null,null,null,7),
  ('> 1 YEAR','CONFIRM Venue','Done','P0',null,'shangrila ($47k, 20 tables)',8),
  ('15 TO 13 MONTHS','Engage Photographer for AD','Done','P0',null,'wildheartslibrary',9),
  ('> 1 YEAR','Research potential venues and go site recces','Done',null,null,null,10),
  ('15 TO 13 MONTHS','prepare PWS Moodboard','Done',null,null,null,11),
  ('> 1 YEAR','Confirm Bridesmaid and Groomsmen','Done','P1',null,null,12),
  ('15 TO 13 MONTHS','Pick theme and colours for wedding','Done',null,null,'Pastel ',13),
  ('> 1 YEAR','come up with budget list for different vendors','Done','Optional',null,null,14),
  ('15 TO 13 MONTHS','Find MUA','Done',null,null,'decided to go with Autelier Studio',15),
  ('> 1 YEAR','Do wisdom tooth removal','Not Started','Optional',null,null,16),
  ('15 TO 13 MONTHS','brainstorm stage set up','Done',null,null,null,17),
  ('> 1 YEAR','Start collating wedding ideas & moodboard','Done',null,null,null,18),
  ('15 TO 13 MONTHS','plan a brief AD itinerary','Done',null,null,null,19),
  ('15 TO 13 MONTHS','Book PWS photographer','Done','P0',null,'Booked and paid 2,700,000 KRW to mondo_forest on 28 May 2025 for mondo total package ',20),
  ('12 TO 10 MONTHS
[Engaged Era]','find emcee','Done','P1',null,'Engaged EmceeCheng
$738',21),
  ('9 TO 7 MONTHS','Plan outfits for Bridesmaids, Groomsmen','Done','P0',null,'bridesmaids: pink
groomsmen: black',22),
  ('12 TO 10 MONTHS
[Engaged Era]','Engage MUA (for AD)','Done',null,null,'decided to go with Autelier Studio, Sheilia ',23),
  ('9 TO 7 MONTHS','collate pws moodboard','Done','P0',null,null,24),
  ('12 TO 10 MONTHS
[Engaged Era]','Engage MUA for parents','Done','P0',null,'engaged Victoria Hans',25),
  ('9 TO 7 MONTHS','Brainstorm about reception set up','Done',null,null,null,26),
  ('12 TO 10 MONTHS
[Engaged Era]','send save the date to friends','Done','P0',null,'send out once we get all the pics from Brooke',27),
  ('9 TO 7 MONTHS','Find Gowns for AD','Done','P0',null,null,28),
  ('12 TO 10 MONTHS
[Engaged Era]','Bridal Shower / Bridesmaid Proposal','Done','P0',null,'28th March 2026',29),
  ('9 TO 7 MONTHS','Find Suit for AD','Done','P0',null,'suit 1: white
suit 2: black',30),
  ('12 TO 10 MONTHS
[Engaged Era]','Order bridesmaid proposal items','Done','P0',null,null,31),
  ('9 TO 7 MONTHS','Find Gowns and Suits for parents','Done','P0',null,null,32),
  ('12 TO 10 MONTHS
[Engaged Era]','Pack bridesmaid proposal boxes','Done','P1',null,null,33),
  ('9 TO 7 MONTHS','start couple videos + photos compilation for AD','In-Progress','P0',null,null,34),
  ('12 TO 10 MONTHS
[Engaged Era]','Do Eyebrow Embroidery','Done','Optional',null,null,35),
  ('9 TO 7 MONTHS','source for florist (for AD bouquet)','Done','P0',null,'to collect bridal bouquet and boutonnieres for groom and x4 parents ',36),
  ('12 TO 10 MONTHS
[Engaged Era]','Book flight tickets to jeju in april','Done','P0',null,'booked 7 april to 20 april',37),
  ('9 TO 7 MONTHS','Buy wedding bands','Done','P0',null,'tiff & co
$9500',38),
  ('12 TO 10 MONTHS
[Engaged Era]','HIFU','Done','P1',null,'booked for dec 2025',39),
  ('9 TO 7 MONTHS','Bridesmaid proposal event','Done','P0',null,'28th March 2026',40),
  ('12 TO 10 MONTHS
[Engaged Era]','Engage Matcha Live Booth','Done','Optional',null,'paid $1.1k',41),
  ('9 TO 7 MONTHS','Do nails for PWS','Done',null,null,null,42),
  ('6 TO 4 MONTHS','Buy AD shoes','Done',null,null,'go dior try on ',43),
  ('2 TO 4 MONTHS','Move into Tennery','In-Progress',null,null,'2026-07-09 00:00:00',44),
  ('6 TO 4 MONTHS','Engage with ROM Solemniser','Done','P0','engaged Dr Williams','can only engage solemizer 3 to 6 months before

https://www.marriage.gov.sg/civil/marriage-process/solemnisers',45),
  ('2 TO 4 MONTHS','confirm guest list numbers','In-Progress',null,null,null,46),
  ('6 TO 4 MONTHS','Register for ROM','Done','P0',null,'https://theiris.sg/romm-singapore/


can only register 21 days before the day

Earliest date: 15 Apr 2026

Latest date: 21 Aug 2026',47),
  ('2 TO 4 MONTHS','plan seat arrangement','In-Progress',null,null,'aft rsvp confirmed',48),
  ('6 TO 4 MONTHS','Buy GDL items from Taobao','Done',null,null,'$45 SGD',49),
  ('2 TO 4 MONTHS','Plan with Emcee on reception script','Not Started',null,null,null,50),
  ('6 TO 4 MONTHS','Buy Rolex','Done','P0',null,null,51),
  ('6 TO 4 MONTHS','Finalise wedding day timeline + activities','In-Progress',null,null,null,52),
  ('2 TO 4 MONTHS','buy Bingo game card','In-Progress',null,null,null,53),
  ('6 TO 4 MONTHS','Create Music Playlist','In-Progress',null,null,null,54),
  ('2 TO 4 MONTHS','select florist and print physical invitation cards [shangri-la]','Done',null,null,null,55),
  ('6 TO 4 MONTHS','Home Reno','Done',null,null,null,56),
  ('2 TO 4 MONTHS','go for food tasting','In-Progress',null,null,'to schedule in july',57),
  ('6 TO 4 MONTHS','Send wedding invitations - consider who needs physical ones','Done',null,null,null,58),
  ('2 TO 4 MONTHS','finalize food menu','Not Started',null,null,null,59),
  ('6 TO 4 MONTHS','Go for PWS','Done','P0',null,'8 April 2026 Jeju',60),
  ('2 TO 4 MONTHS','select wedding favours and linens [at shangri-la]','In-Progress',null,null,null,61),
  ('6 TO 4 MONTHS','Tenant move out','Done',null,null,'2026-04-26 00:00:00',62),
  ('2 TO 4 MONTHS','collate AD moodboard for pics','In-Progress',null,null,null,63),
  ('6 TO 4 MONTHS','source for event stylist (to contact shangrila)','Done','P0',null,'go with SSS',64),
  ('2 TO 4 MONTHS','Delegate Bridesmaid and Groomsmen duties','In-Progress','P1',null,null,65),
  ('6 TO 4 MONTHS','source for event balloons for march in','Done',null,null,'go with lefairymeadows',66),
  ('2 TO 4 MONTHS','Buy bridesmaid dresses','Done',null,null,null,67),
  ('6 TO 4 MONTHS','source for florist (for Car)','In-Progress',null,null,null,68),
  ('2 TO 4 MONTHS','Wisdom Tooth Removal','In-Progress','P0',null,null,69),
  ('6 TO 4 MONTHS','send out rsvp','Done',null,null,'after mondo forest sends out colour corrected pictures',70),
  ('6 TO 4 MONTHS','Design RSVP website','Done',null,null,null,71),
  ('6 TO 4 MONTHS','Have final dress fitting','Not Started',null,null,null,72),
  ('2 TO 4 MONTHS','go for beauty treatments','Done',null,null,null,73),
  ('6 TO 4 MONTHS','Have final suit fitting','Not Started',null,null,null,74),
  ('2 TO 4 MONTHS','pack for the day and overnight stay','Not Started',null,null,null,75),
  ('6 TO 4 MONTHS','prepare wedding vows + speech','Not Started',null,null,null,76),
  ('2 TO 4 MONTHS','prepare angbaos','Not Started',null,null,null,77),
  ('6 TO 4 MONTHS','Finalize Reception counterpieces and decor','Not Started',null,null,null,78),
  ('2 TO 4 MONTHS','finalize everything','Not Started',null,null,null,79),
  ('6 TO 4 MONTHS','Inform Shangrila final guest count','Not Started',null,null,null,80),
  ('2 TO 4 MONTHS','Finalize banquet event order','Not Started',null,null,null,81),
  ('6 TO 4 MONTHS','collect wedding gowns + suits','Not Started',null,null,null,82),
  ('2 TO 4 MONTHS','Finalize seating plan','Not Started',null,null,null,83),
  ('6 TO 4 MONTHS','prepare wedding car','Not Started',null,null,null,84),
  ('6 TO 4 MONTHS','Prepare flowers for wedding car','Not Started',null,null,null,85),
  ('6 TO 4 MONTHS','Guo Da Li','In-Progress',null,null,null,86),
  ('6 TO 4 MONTHS','Finalize Menu','Not Started',null,null,null,87),
  ('6 TO 4 MONTHS','Update Attendance','Not Started',null,null,null,88),
  ('6 TO 4 MONTHS','Trial Makeup and Hair','Not Started',null,null,null,89);

insert into vendors(category,company,notes,sort) values
  ('Bride and Groom''s Attire','Rico A Mona','https://www.rico-a-mona.com/packages/',0),
  ('Grooming','Autelier Makeup','https://drive.google.com/file/d/1_9fcNaCaxvnGVH1SpvjqePfQthqtIlq5/view',1),
  ('Grooming','Autelier Makeup
(associate artist)',null,2),
  ('Grooming','Victoria Han',null,3),
  ('Groom and Bride Floral','casaflorales',null,4),
  ('Photography & Videography','mondo_forest','https://m.blog.naver.com/mondophoto/223466917626',5),
  ('Photography & Videography','wild hearts library',null,6),
  ('Banquet Reception','emceecheng','https://www.emceecheng.com/wedding',7),
  ('Banquet Reception','lefairymeadow',null,8),
  ('Banquet Reception','Shangri-La',null,9),
  ('ROM Ceremony + GDL','Eternal Red Bonds',null,10);

insert into pocs(task,poc_name,poc_phone,backup_name,sort) values
  ('Hold bouquet during vows','','','',0),
  ('Manage bride phone / touch-up kit','','','',1),
  ('Gather family for photos','','','',2),
  ('Cue second march-in / dress change','','','',3),
  ('Keep the rings (best man)','','','',4),
  ('Manage angbao box / gifts / logistics','','','',5),
  ('Guestbook / card box table','','','',6),
  ('Receive & track red packets','','','',7),
  ('Check guests in at registration','','','',8);

insert into rundown(time,activity,location,person,sort) values
  ('08:00','MUA arrival','Bridal suite','Bride lead',0),
  ('10:30','Photographer detail shots','Bridal suite','Photo team',1),
  ('12:00','Groom & groomsmen prep shots','Groom room','Groom lead',2),
  ('17:30','Ballroom styling final check','Ballroom','Coordinator',3),
  ('19:15','First march-in standby','Ballroom entrance','Coordinator',4);
