/*
 Navicat Premium Data Transfer

 Source Server         : m
 Source Server Type    : MongoDB
 Source Server Version : 40202
 Source Host           : localhost:27017
 Source Schema         : music

 Target Server Type    : MongoDB
 Target Server Version : 40202
 File Encoding         : 65001

 Date: 27/04/2020 23:27:12
*/


// ----------------------------
// Collection structure for collects
// ----------------------------
db.getCollection("collects").drop();
db.createCollection("collects");

// ----------------------------
// Collection structure for lyrics
// ----------------------------
db.getCollection("lyrics").drop();
db.createCollection("lyrics");

// ----------------------------
// Documents of lyrics
// ----------------------------
db.getCollection("lyrics").insert([ {
    _id: ObjectId("5ea6dd1ea19d17eb7abe9830"),
    song: ObjectId("5ea6dbd2a19d17eb7abe982b"),
    content: "\"[ti:你就不要想起我]\r\n[ar:田馥甄]\r\n[al:渺小]\r\n[by:]\r\n[offset:0]\r\n[00:00.00]你就不要想起我 - 田馥甄 (Hebe Tien)\r\n[00:05.16]词：施人诚\r\n[00:10.32]曲：杨子朴/刘大江\r\n[00:15.48]编曲：洪敬尧/温奕哲\r\n[00:20.64]我都寂寞多久了还是没好\r\n[00:29.29]感觉全世界都在窃窃嘲笑\r\n[00:36.85]我能有多骄傲\r\n[00:40.76]不堪一击好不好\r\n[00:46.47]一碰到你我就被撂倒\r\n[00:54.95]吵醒沉睡冰山后从容脱逃\r\n[01:03.53]你总是有办法轻易做到\r\n[01:10.73]一个远远的微笑\r\n[01:15.08]就掀起汹涌波涛\r\n[01:19.59]又闻到眼泪沸腾的味道\r\n[01:27.90]明明你也很爱我\r\n[01:30.38]没理由爱不到结果\r\n[01:36.42]只要你敢不懦弱\r\n[01:38.97]凭什么我们要错过\r\n[01:45.56]夜长梦还多\r\n[01:49.32]你就不要想起我\r\n[01:54.18]到时候你就知道有多痛\r\n[02:21.03]当时那些快乐多难得美好\r\n[02:29.26]你真的有办法舍得不要\r\n[02:36.52]才刚成真的美梦\r\n[02:40.79]转眼就幻灭破掉\r\n[02:45.33]祝福你真的可以睡得好\r\n[02:53.61]明明你也最爱我\r\n[02:56.11]没理由爱不到结果\r\n[03:02.17]只要你敢不懦弱\r\n[03:04.70]凭什么我们要错过\r\n[03:11.29]夜长梦很多\r\n[03:15.03]你就不要想起我\r\n[03:19.87]到时候最好别来要认错\r\n[03:27.43]你就不要 想我到 疯掉\r\n[03:40.77]明明你也还爱我\r\n[03:43.25]没理由爱不到结果\r\n[03:49.30]只要你敢不懦弱\r\n[03:51.80]凭什么我们要错过\r\n[03:58.37]夜长梦会多\r\n[04:02.18]你就不要想起我\r\n[04:07.01]我等夜监听你说多爱我\"",
    __v: NumberInt("0")
} ]);
db.getCollection("lyrics").insert([ {
    _id: ObjectId("5ea6dd6aa19d17eb7abe9831"),
    song: ObjectId("5ea6dbfda19d17eb7abe982c"),
    content: "[ti:小幸运]\t\t\t\t\t\t\t\t\r\n[ar: 田馥甄]\t\t\t\t\t\t\t\t\r\n[al:电影《我的少女时代》主题曲]\t\t\t\t\t\t\t\t\r\n[by:果果1314]\t\t\t\t\t\t\t\t\r\n\r\n[00:00.00]小幸运\r\n[00:02.00](电影我的少女时代主题曲)\r\n[00:04.00]歌手： 田馥甄\r\n[00:06.00]作词： 吴辉福,徐世珍\r\n[00:08.00]作曲： JerryC\r\n[00:10.00]歌词编辑：果果 765708831\r\n[00:12.00]爱歌词网：www.22lrc.com\r\n[00:14.00]\r\n[00:15.56]我听见雨滴落在青青草地\r\n[00:21.67]我听见远方下课钟声响起\r\n[00:27.78]可是我没有听见你的声音\r\n[00:32.70]认真呼唤我姓名\r\n[00:40.06]爱上你的时候还不懂感情\r\n[00:46.08]离别了才觉得刻骨铭心\r\n[00:51.94]为什么没有发现遇见了你\r\n[00:56.51]是生命最好的事情\r\n[02:51.96][01:02.45]也许当时忙着微笑和哭泣\r\n[02:57.84][01:08.35]忙着追逐天空中的流星\r\n[03:03.60][01:13.96]人理所当然的忘记\r\n[03:08.15][01:18.60]是谁风里雨里一直默默守护在原地\r\n[03:15.84][01:26.36]原来你是我最想留住的幸运\r\n[03:20.96][01:31.47]原来我们和爱情曾经靠得那么近\r\n[03:27.02][01:37.68]那为我对抗世界的决定\r\n[03:31.62][01:42.23]那陪我淋的雨\r\n[03:34.56][01:45.27]一幕幕都是你一尘不染的真心\r\n[03:42.14][01:52.62]与你相遇好幸运\r\n[03:45.20][01:55.85]可我已失去为你泪流满面的权利\r\n[03:51.16][02:01.93]但愿在我看不到的天际\r\n[03:55.85][02:06.52]你张开了双翼\r\n[03:59.02][02:09.59]遇见你的注定(oh--)她会有多幸运\r\n[04:10.92][02:19.28]\r\n[02:29.44]青春是段跌跌撞撞的旅行\r\n[02:35.30]拥有着后知后觉的美丽\r\n[02:41.48]来不及感谢是你给我勇气\r\n[02:46.11]让我能做回我自己",
    __v: NumberInt("0")
} ]);
db.getCollection("lyrics").insert([ {
    _id: ObjectId("5ea6dd7da19d17eb7abe9832"),
    song: ObjectId("5ea6dc2ca19d17eb7abe982d"),
    content: "\"[ti:摩天动物园]\r\n[ar:G.E.M. 邓紫棋]\r\n[al:摩天动物园]\r\n[by:]\r\n[offset:0]\r\n[00:00.00]摩天动物园 - G.E.M.邓紫棋\r\n[00:01.39]词：G.E.M.邓紫棋\r\n[00:02.32]曲：G.E.M.邓紫棋\r\n[00:03.26]编曲 Arranged by：老道/G.E.M.邓紫棋/T-Ma 马敬恒\r\n[00:05.59]制作人 Producer：G.E.M.邓紫棋/T-Ma 马敬恒\r\n[00:07.57]和音 Bvox：G.E.M.邓紫棋\r\n[00:08.73]混音 Mixed by：Richard Furch\r\n[00:09.55]母带 Mastered by：Randy Merrill @ Sterling Sound\r\n[00:09.55]\r\n[00:10.27]传说在伊甸\r\n[00:12.03]\r\n[00:12.66]原始的爱没有欺骗\r\n[00:15.62]简朴过每一天\r\n[00:18.24]人们彼此真心一片\r\n[00:21.15]心跟着独特节奏跳\r\n[00:24.11]脸挂着橘色嘴巴笑\r\n[00:26.94]直到蛇在身边绕\r\n[00:28.40]苹果让你咬\r\n[00:29.70]直到起重机拔掉\r\n[00:31.23]我们的独角\r\n[00:32.86]可怜的亚当\r\n[00:34.05]从此掉进蜘蛛网\r\n[00:35.51]为面包打仗\r\n[00:36.76]先要学会吃土壤\r\n[00:38.33]朴实的大象\r\n[00:39.51]进化变成四不像\r\n[00:40.91]举头望着八方\r\n[00:42.35]低头忘了思故乡\r\n[00:43.86]人人都各自想登峰插上\r\n[00:46.14]自己的旗帜\r\n[00:47.22]纯白的鸽子为什么它像\r\n[00:49.33]变成了历史\r\n[00:50.49]努力要骑到宝马买到房子\r\n[00:53.06]不过是为了让青蛙能变成王子\r\n[00:55.63]穿灰衣的姑娘得不到尊重\r\n[00:58.34]社会大众不在乎微小昆虫\r\n[01:01.16]于是一群羔羊 卑微的愿望\r\n[01:03.78]是努力挤进荒凉 庸俗的天堂\r\n[01:06.58]那些被龟赢的兔他们眼睛深红\r\n[01:09.53]只会每天妒忌着别人成功\r\n[01:12.35]于是学着蟑螂 到处爬着墙\r\n[01:14.81]不怕黑也不怕脏\r\n[01:16.12]大便也舔上 为了要前往\r\n[01:17.51]光鲜的监房\r\n[01:18.68]活在摩天动物园\r\n[01:21.47]文明和野兽周旋\r\n[01:24.22]我看着黑白的脸\r\n[01:26.30]一张张变色就在一念间\r\n[01:29.77]人的心太莫测幻变\r\n[01:32.53]纠缠在爱与恨之间\r\n[01:35.04]天使与魔鬼都在身边\r\n[01:37.77]画着没终点的圆圈\r\n[01:40.92]活在摩天动物园\r\n[01:43.76]我只能祈求上天\r\n[01:46.52]赐我清澈一双眼\r\n[01:48.61]一点点识破美丽的谎言\r\n[01:52.09]当你站在欲望边缘\r\n[01:54.84]突然间善恶难分辨\r\n[01:57.30]天使与魔鬼都在身边\r\n[02:00.15]这时候你跪在谁跟前\r\n[02:14.25]你和我生来都是曾经白的纸\r\n[02:16.95]只是同样被写上太多歪的字\r\n[02:19.65]长大最无奈的是\r\n[02:21.05]踏实怕是傻子\r\n[02:22.29]你若不想被掰着吃\r\n[02:23.88]必须磨利牙齿\r\n[02:25.34]别任人屠宰\r\n[02:26.48]必要关头只能把人出卖\r\n[02:28.20]再无奈\r\n[02:28.93]也只是成功无法避开的附带\r\n[02:30.97]当鼻子爱上了雾霾\r\n[02:32.41]一开始察觉不出来\r\n[02:33.60]这一种腐败 它像骨牌\r\n[02:34.97]慢慢地覆盖 把你毒害\r\n[02:36.69]单纯的一群小白猪\r\n[02:39.44]被名和利熏陶摆布\r\n[02:42.20]衣服都故意少块布\r\n[02:43.93]沦为了潮牌奴\r\n[02:45.16]卖了灵魂捞财富\r\n[02:47.75]一个个红得快速\r\n[02:49.18]却饿得变了排骨\r\n[02:50.54]镜子里面的怪物\r\n[02:51.83]四处无人它就败露\r\n[02:53.34]当初都憧憬好莱坞\r\n[02:56.06]最后通通都跑来哭\r\n[02:58.37]穿灰衣的姑娘得不到尊重\r\n[03:01.12]社会大众不在乎微小昆虫\r\n[03:04.00]于是一群羔羊\r\n[03:05.36]卑微的愿望\r\n[03:06.61]是努力挤进荒凉\r\n[03:08.12]庸俗的天堂\r\n[03:09.36]那些被龟赢的兔他们眼睛深红\r\n[03:12.32]只会每天妒忌着别人成功\r\n[03:15.14]于是学着蟑螂到处爬着墙\r\n[03:17.60]不怕黑也不怕脏\r\n[03:18.95]大便也舔上 为了要前往\r\n[03:20.30]光鲜的监房\r\n[03:21.40]活在摩天动物园\r\n[03:24.25]文明和野兽周旋\r\n[03:26.99]我看着黑白的脸\r\n[03:29.09]一张张变色就在一念间\r\n[03:32.59]人的心太莫测幻变\r\n[03:35.39]纠缠在爱与恨之间\r\n[03:37.81]天使与魔鬼都在身边\r\n[03:40.54]画着没终点的圆圈\r\n[03:43.71]活在摩天动物园\r\n[03:46.53]我只能祈求上天\r\n[03:49.36]赐我清澈一双眼\r\n[03:51.40]一点点识破美丽的谎言\r\n[03:54.88]当你站在欲望边缘\r\n[03:57.65]突然间善恶难分辨\r\n[04:00.11]天使与魔鬼都在身边\r\n[04:02.89]这时候你跪在谁跟前\r\n[04:05.83]谁迷失在 水泥的 森林里面\r\n[04:08.76]谁一直踩 最低的 人性底线\r\n[04:11.51]谁一直还 随意地 任凭病变\r\n[04:14.29]谁其实在 回忆着 认命以前\r\n[04:17.08]谁迷失在 水泥的 森林里面\r\n[04:19.87]谁一直踩 最低的 人性底线\r\n[04:22.67]谁一直还 随意地 任凭病变\r\n[04:25.47]谁其实在 回忆着 认命以前\"",
    __v: NumberInt("0")
} ]);
db.getCollection("lyrics").insert([ {
    _id: ObjectId("5ea6dd94a19d17eb7abe9833"),
    song: ObjectId("5ea6dc4aa19d17eb7abe982e"),
    content: "\"[ti:光年之外 (《太空旅客（Passengers）》电影中国区主题曲)]\r\n[ar:G.E.M. 邓紫棋]\r\n[al:光年之外]\r\n[by:]\r\n[offset:0]\r\n[00:00.00]光年之外 - G.E.M. 邓紫棋 (Gem Tang)\r\n[00:02.55]词：G.E.M. 邓紫棋\r\n[00:05.10]曲：G.E.M. 邓紫棋\r\n[00:07.66]编曲：Lupo Groinig\r\n[00:10.21]监制：Lupo Groinig\r\n[00:12.77]感受停在我发端的指尖\r\n[00:16.68]如何瞬间冻结时间\r\n[00:21.80]\r\n[00:23.58]记住望着我坚定的双眼\r\n[00:27.62]也许已经没有明天\r\n[00:32.66]\r\n[00:34.24]面对浩瀚的星海\r\n[00:36.19]\r\n[00:36.71]我们微小得像尘埃\r\n[00:39.27]漂浮在一片无奈\r\n[00:43.49]\r\n[00:45.13]缘分让我们相遇乱世以外\r\n[00:49.40]\r\n[00:50.50]命运却要我们危难中相爱\r\n[00:54.72]\r\n[00:55.92]也许未来遥远在光年之外\r\n[01:00.36]\r\n[01:01.48]我愿守候未知里为你等待\r\n[01:05.58]我没想到为了你我能疯狂到\r\n[01:09.69]\r\n[01:10.87]山崩海啸没有你根本不想逃\r\n[01:15.38]\r\n[01:16.36]我的大脑为了你已经疯狂到\r\n[01:20.68]\r\n[01:21.76]脉搏心跳没有你根本不重要\r\n[01:26.27]\r\n[01:29.07]一双围在我胸口的臂弯\r\n[01:33.17]足够抵挡天旋地转\r\n[01:38.49]\r\n[01:40.02]一种执迷不放手的倔强\r\n[01:44.05]足以点燃所有希望\r\n[01:49.25]\r\n[01:50.59]宇宙磅礴而冷漠\r\n[01:53.09]我们的爱微小却闪烁\r\n[01:55.63]颠簸却如此忘我\r\n[02:00.02]\r\n[02:01.44]缘分让我们相遇乱世以外\r\n[02:06.36]\r\n[02:06.90]命运却要我们危难中相爱\r\n[02:11.28]\r\n[02:12.37]也许未来遥远在光年之外\r\n[02:17.11]\r\n[02:17.80]我愿守候未知里为你等待\r\n[02:21.80]我没想到为了你我能疯狂到\r\n[02:26.07]\r\n[02:27.27]山崩海啸没有你根本不想逃\r\n[02:31.63]\r\n[02:32.71]我的大脑为了你已经疯狂到\r\n[02:37.06]\r\n[02:38.17]脉搏心跳没有你根本不重要\r\n[02:42.46]\r\n[02:44.17]也许航道以外是醒不来的梦\r\n[02:53.78]\r\n[02:56.71]乱世以外是纯粹的相拥\r\n[03:05.27]\r\n[03:05.86]我没想到为了你我能疯狂到\r\n[03:09.84]\r\n[03:10.92]山崩海啸没有你根本不想逃\r\n[03:15.36]\r\n[03:16.39]我的大脑为了你已经疯狂到\r\n[03:20.65]\r\n[03:21.82]脉搏心跳没有你根本不重要\r\n[03:26.12]\r\n[03:27.70]相遇乱世以外危难中相爱\r\n[03:37.72]\r\n[03:38.66]相遇乱世以外危难中相爱\r\n[03:48.53]\r\n[03:49.07]我没想到\"",
    __v: NumberInt("0")
} ]);
db.getCollection("lyrics").insert([ {
    _id: ObjectId("5ea6dda9a19d17eb7abe9834"),
    song: ObjectId("5ea6dc98a19d17eb7abe982f"),
    content: "\"[ti:我是如此相信]\r\n[ar:周杰伦]\r\n[al:我是如此相信]\r\n[by:v_emilylu]\r\n[offset:0]\r\n[00:00.00]我是如此相信 (I Truly Believe) - 周杰伦 (Jay Chou)\r\n[00:12.62]词：方文山\r\n[00:25.24]曲：周杰伦\r\n[00:37.87]鸟群离开了森林\r\n[00:40.42]\r\n[00:41.26]整座天空很灰心\r\n[00:44.21]\r\n[00:44.72]蝴蝶不再被吸引\r\n[00:47.46]\r\n[00:48.14]玫瑰盛开的很安静\r\n[00:50.99]\r\n[00:51.71]远方的风雨不停\r\n[00:55.21]城市苍白而孤寂\r\n[00:58.19]\r\n[00:58.70]徘徊无助的人群\r\n[01:01.44]\r\n[01:01.96]焦虑着何时放晴\r\n[01:04.39]\r\n[01:05.22]故事里能毁坏的只有风景\r\n[01:07.86]\r\n[01:08.66]谁也摧毁不了我们的梦境\r\n[01:11.32]\r\n[01:12.11]弦月旁的流星划过了天际\r\n[01:14.78]我许下 的愿望 该向谁 去说明\r\n[01:18.26]\r\n[01:19.11]陨石在浩瀚的宇宙间旅行\r\n[01:21.78]\r\n[01:22.57]璀璨的夜空里漫天的水晶\r\n[01:25.35]\r\n[01:25.99]我的祷告终于有了回音\r\n[01:29.49]\r\n[01:30.29]我是如此相信\r\n[01:33.35]在背后支撑的是你\r\n[01:36.75]一直与我并肩而行\r\n[01:40.21]仰望等太阳升起\r\n[01:42.60]听见鸟群回来的声音\r\n[01:47.23]为我守候的人是你\r\n[01:50.62]给了我坚定的信心\r\n[01:54.09]双手弹奏出黎明\r\n[01:56.38]原来爱如此的动听\r\n[02:01.84]\r\n[02:15.31]鸟群离开了森林\r\n[02:18.18]\r\n[02:18.72]整座天空很灰心\r\n[02:21.64]\r\n[02:22.23]蝴蝶不再被吸引\r\n[02:25.37]玫瑰盛开的很安静\r\n[02:28.43]\r\n[02:28.94]远方的风雨不停\r\n[02:31.78]\r\n[02:32.51]城市苍白而孤寂\r\n[02:36.08]徘徊无助的人群\r\n[02:38.77]\r\n[02:39.32]焦虑着何时放晴\r\n[02:41.72]\r\n[02:42.62]故事里能毁坏的只有风景\r\n[02:45.22]\r\n[02:46.03]谁也摧毁不了我们的梦境\r\n[02:48.71]\r\n[02:49.49]弦月旁的流星划过了天际\r\n[02:52.02]我许下 的愿望 该向谁 去说明\r\n[02:55.73]\r\n[02:56.43]陨石在浩瀚的宇宙间旅行\r\n[02:59.13]\r\n[02:59.90]璀璨的夜空里漫天的水晶\r\n[03:02.75]\r\n[03:03.36]我的祷告终于有了回音\r\n[03:06.86]\r\n[03:07.63]我是如此相信\r\n[03:10.62]在背后支撑的是你\r\n[03:14.12]一直与我并肩而行\r\n[03:17.52]仰望等太阳升起\r\n[03:20.03]听见鸟群回来的声音\r\n[03:24.49]为我守候的人是你\r\n[03:27.43]\r\n[03:27.97]给了我坚定的信心\r\n[03:31.47]双手弹奏出黎明\r\n[03:33.88]原来爱如此的动听\r\n[03:37.83]我是如此相信\r\n[03:38.77]在背后支撑的是你\r\n[03:41.94]一直与我并肩而行\r\n[03:45.37]仰望等太阳升起\r\n[03:47.62]听见鸟群回来的声音\r\n[03:52.35]为我守候的人是你\r\n[03:55.81]给了我坚定的信心\r\n[03:59.16]双手弹奏出黎明\r\n[04:01.48]原来爱如此的动听\"",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for recommends
// ----------------------------
db.getCollection("recommends").drop();
db.createCollection("recommends");

// ----------------------------
// Documents of recommends
// ----------------------------
db.getCollection("recommends").insert([ {
    _id: ObjectId("5ea6de93a19d17eb7abe9835"),
    song: ObjectId("5ea6dbd2a19d17eb7abe982b"),
    __v: NumberInt("0")
} ]);
db.getCollection("recommends").insert([ {
    _id: ObjectId("5ea6e3ff51903d0aaf6d5038"),
    song: ObjectId("5ea6dbfda19d17eb7abe982c"),
    __v: NumberInt("0")
} ]);
db.getCollection("recommends").insert([ {
    _id: ObjectId("5ea6e40251903d0aaf6d5039"),
    song: ObjectId("5ea6dc4aa19d17eb7abe982e"),
    __v: NumberInt("0")
} ]);
db.getCollection("recommends").insert([ {
    _id: ObjectId("5ea6e40551903d0aaf6d503a"),
    song: ObjectId("5ea6dc98a19d17eb7abe982f"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for singers
// ----------------------------
db.getCollection("singers").drop();
db.createCollection("singers");

// ----------------------------
// Documents of singers
// ----------------------------
db.getCollection("singers").insert([ {
    _id: ObjectId("5ea6daf6a19d17eb7abe9828"),
    name: "周杰伦",
    pic: "/uploads/image/1587480749277.png",
    __v: NumberInt("0")
} ]);
db.getCollection("singers").insert([ {
    _id: ObjectId("5ea6db30a19d17eb7abe9829"),
    name: "田馥甄",
    pic: "/uploads/image/1587397415841.jpg",
    __v: NumberInt("0")
} ]);
db.getCollection("singers").insert([ {
    _id: ObjectId("5ea6db63a19d17eb7abe982a"),
    name: "G.E.M.邓紫棋",
    pic: "/uploads/image/1587481573585.png",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for songs
// ----------------------------
db.getCollection("songs").drop();
db.createCollection("songs");

// ----------------------------
// Documents of songs
// ----------------------------
db.getCollection("songs").insert([ {
    _id: ObjectId("5ea6dbd2a19d17eb7abe982b"),
    updated: ISODate("2020-04-27T13:19:14.425Z"),
    created: ISODate("2020-04-27T13:19:14.425Z"),
    title: "你就不要想起我",
    url: "/uploads/music/C400002YNkp52IwhL8.m4a",
    type: ObjectId("5e9dadd0dde5c75323c563c5"),
    singer: ObjectId("5ea6db30a19d17eb7abe9829"),
    __v: NumberInt("0")
} ]);
db.getCollection("songs").insert([ {
    _id: ObjectId("5ea6dbfda19d17eb7abe982c"),
    updated: ISODate("2020-04-27T13:19:57.731Z"),
    created: ISODate("2020-04-27T13:19:57.731Z"),
    title: "小幸运",
    url: "/uploads/music/1587472896116.mp3",
    type: ObjectId("5e9dadd0dde5c75323c563c5"),
    singer: ObjectId("5ea6db30a19d17eb7abe9829"),
    __v: NumberInt("0")
} ]);
db.getCollection("songs").insert([ {
    _id: ObjectId("5ea6dc2ca19d17eb7abe982d"),
    updated: ISODate("2020-04-27T13:20:44.616Z"),
    created: ISODate("2020-04-27T13:20:44.616Z"),
    title: "摩天动物园",
    url: "/uploads/music/C400000Fz7zP3FDuSz.m4a",
    type: ObjectId("5e9dadd0dde5c75323c563c5"),
    singer: ObjectId("5ea6db63a19d17eb7abe982a"),
    __v: NumberInt("0")
} ]);
db.getCollection("songs").insert([ {
    _id: ObjectId("5ea6dc4aa19d17eb7abe982e"),
    updated: ISODate("2020-04-27T13:21:14.958Z"),
    created: ISODate("2020-04-27T13:21:14.958Z"),
    title: "光年之外",
    url: "/uploads/music/C4000029Lt3K2XVP75.m4a",
    type: ObjectId("5e9dadd0dde5c75323c563c5"),
    singer: ObjectId("5ea6db63a19d17eb7abe982a"),
    __v: NumberInt("0")
} ]);
db.getCollection("songs").insert([ {
    _id: ObjectId("5ea6dc98a19d17eb7abe982f"),
    updated: ISODate("2020-04-27T13:22:32.869Z"),
    created: ISODate("2020-04-27T13:22:32.869Z"),
    title: "我是如此相信",
    url: "/uploads/music/C400001PLl3C4gPSCI.m4a",
    type: ObjectId("5e9dadd0dde5c75323c563c5"),
    singer: ObjectId("5ea6daf6a19d17eb7abe9828"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for types
// ----------------------------
db.getCollection("types").drop();
db.createCollection("types");

// ----------------------------
// Documents of types
// ----------------------------
db.getCollection("types").insert([ {
    _id: ObjectId("5e9dadd0dde5c75323c563c5"),
    name: "情歌",
    __v: NumberInt("0")
} ]);
db.getCollection("types").insert([ {
    _id: ObjectId("5e9db0f6eaf8bb62ed4b6543"),
    name: "电子",
    __v: NumberInt("0")
} ]);
db.getCollection("types").insert([ {
    _id: ObjectId("5ea100e50740998c3458464b"),
    name: "摇滚",
    __v: NumberInt("0")
} ]);
db.getCollection("types").insert([ {
    _id: ObjectId("5ea103ecf6733c04990f0f80"),
    name: "乡村",
    __v: NumberInt("0")
} ]);
db.getCollection("types").insert([ {
    _id: ObjectId("5ea10786f6733c04990f0f86"),
    name: "舞曲",
    __v: NumberInt("0")
} ]);
db.getCollection("types").insert([ {
    _id: ObjectId("5ea10795f6733c04990f0f87"),
    name: "民谣",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("5e9da48221aedcb5397f3485"),
    name: "jizai",
    password: "$2a$10$KTMBp5DLt24x5xzAtcHYueftFNw21yIxqekQSQu6L9sZLAv.VIlwi",
    role: "user",
    avatar: "/uploads/image/1587623063199.jpg",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("5e9eee78af98ae4be43d304e"),
    name: "admin",
    password: "$2a$10$xpjxDWwB1hYU/s43AEz0ZOhHlpmRwuz1c4eCu.eSRbH2g82AOgSAi",
    role: "admin",
    avatar: "/uploads/image/default.jpg",
    __v: NumberInt("0")
} ]);
