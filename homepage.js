let lyrics_texts = [];
let lyrics_changes = [];
let lyrics_durations = [];
let volume = 1;

const back_btn = document.querySelector(".back");

const song_choices = document.querySelectorAll(".song_choice");

const carousel_item = document.querySelector(".carousel_item");
const carousel_items = document.querySelectorAll(".carousel_item");

const qlx = document.querySelector(".qi-li-xiang");
const jxs = document.querySelector(".jia-xing-seng");
const hd = document.querySelector(".hong-dou");
const ghsy = document.querySelector(".guang-hui-sui-yue");
const lydia = document.querySelector(".lydia");
// const ajl = document.querySelector(".an-jing-le");
const lian = document.querySelector(".lian");
const sqbm = document.querySelector(".shen-qi-bai-ma");
// const tfl = document.querySelector(".tuo-fei-lun");

const mv_container = document.querySelector(".mv");
let mv = null;

let count = 4;
const countdown_carousel = document.querySelector(".countdown .carousel");
const cc_songchoice = countdown_carousel.querySelector(".song_choice");

let delay = 0,
    step = 10 / carousel_items.length; /* 5 is the animation duration */
carousel_items.forEach(function (carousel_item) {
    carousel_item.style.animationDelay = -delay + "s";
    delay += step;
});

//CHOOSING THE SONGS
song_choices.forEach(function (song_choice) {
    song_choice.addEventListener("click", function () {
        lyrics_durations = [];
        song_chosen = true;
        remove_black_screen();

        createStars();
    });
});

qlx.addEventListener("click", function () {
    countdown(qlx);
    volume = 0.6;
    lyrics_texts = [
        "...",
        "Chuangwai de ma que tsai tyan xien kan shang duo tsui",
        "Ni shuo tshe i tsyu hen yu xiatyan te kanjue",
        "Shoujung te tsyentsz p'izi tsai tsi tsop lai lai hwei hwei",
        "U yung tsi hang tz' tsz tsyong ni shi uo de szy",
        "Chiudao yu te tzywei",
        "Mao kun ni tu tsz liao tsie",
        "Tsulien te xiangwei tsu tseyang pei women sunhwei",
        "Na wunuan te yangkwang hsiang kang tsai te sienyin ts'owmei",
        "Ni shuo ni tse bu tse ts'u diau ts'e yi tsung kanjue",
        "Yu hsia tsengye uo de ai yitswuchiu hsiang yushwei",
        "Yen-tzu lo i kunni kun wo te sznyen houhwei yi tiie",
        "Tsyi tse szfei ye yu fa tsiang wo te jeqing lents'wu",
        "Ni ts'ianjen tsai uo sz te mo yi iie",
        "Yu hsia tsengye uo de ai yitswuchiu hsiang yushwei",
        "Chuangtai hudie hsiang sz li finfei te meilii tsyangtse",
        "U tsie tsz xie p'a yungyuan ai ni xie tsz te tsiehwei",
        "Ni sz wo weiyi ts'yangyau te liao-tsie",
        "...",
        "Yu hsia tsengye uo de ai yitswuchiu hsiang yushwei",
        "Yen-tzu lo i kunni kun wo te sznyen houhwei yi tiie",
        "Tsyi tse szfei ye yu fa tsiang wo te jeqing lents'wu",
        "Ni ts'ianjen tsai uo sz te mo yi iie",
        "Na paoman te tau suy hsinfu le tse ku tsechie",
        "Er ni te lienk'e hsiang tsienli su tou te fanche",
        "Ni tut'san tu uo tsiu tsilixiang te mingtz' hsin mei",
        "U ts'i k'o ts'ie ch'i hsiang chinwen ni k'uatssiang te tsui",
        "Yu hsia tsengye uo de ai yitswuchiu hsiang yushwei",
        "Yen-tzu lo i kunni kun wo te sznyen houhwei yi tiie",
        "Tsyi tse szfei ye yu fa tsiang wo te jeqing lents'wu",
        "Ni ts'ianjen tsai uo sz te mo yi iie",
        "Tsengye wo te ai yitswuchiu hsiang yushwei",
        "Chuangtai hudie hsiang sz li finfei te meilii tsyangtse",
        "U tsie tsz xie p'a yungyuan ai ni xie tsz te tsiehwei",
        "Ni sz wo weiyi ts'yangyau te liao-tsie",
        "...",
    ];
    lyrics_changes = [
        0,
        30,
        37,
        44,
        50,
        57,
        60,
        64,
        71,
        77,
        60 + 24,
        60 + 31,
        60 + 37,
        60 + 45,
        60 + 51,
        60 + 57,
        120 + 4,
        120 + 12,
        120 + 18,
        120 + 45,
        120 + 51,
        120 + 58,
        180 + 6,
        180 + 12,
        180 + 19,
        180 + 26,
        180 + 32,
        180 + 39,
        180 + 45,
        180 + 52,
        240,
        240 + 6,
        240 + 12,
        240 + 19,
        240 + 26,
        240 + 34,
        60 * 5 + 4,
    ];
    calc_lyrics_durations(lyrics_changes);
    add_mv(qlx);
});

hd.addEventListener("click", function () {
    countdown(hd);
    lyrics_texts = [
        "...",
        "Han mei haw haw di kan su",
        "Sywe hua jan fat di k'i ho",
        "Wo mun i chi ts'an du",
        "Hwui kung ming pe, sen mu si wen rou",
        "Han mei kun ni ch'ien choh shou",
        "Tsou koh hwang fu di sha ch'iu",
        "K'en nung ts'ung tz'u yi ho, haw wei jen hsi",
        "T'ien ch'ang huo di chiu",
        "Yu si haw, yu si haw",
        "Wo hui siang shin yi ch'ieh yu jin tou",
        "Siang chu li k'ai, tu yu si haw",
        "Mei yu sen mu hui yung ch'ui pu hsiu",
        "K'o shih wo, yu si haw",
        "Ning yuan sen tso liu lien pu fang shou",
        "Teng tau fong king tu kan tou",
        "Yeh hsu ni hui p'ei wo, kan si shui ch'ang liu",
        "...",
        "Han mei wei ni pa hong tou",
        "Ao ch'eng chien mien di shang k'ou",
        "Yan ho i chi fen siang",
        "Hwui kung ming pe, siang si di ai ch'ou",
        "Han mei haw haw di kan su",
        "Hsing cho ch'in wun di wen rou",
        "K'en nung tsai wo tso yu",
        "Ni ts'ai tsui ch'iu, ku tu di tzu yu",

        "Yu si haw, yu si haw",
        "Wo hui siang shin yi ch'ieh yu jin tou",
        "Siang chu li k'ai, tu yu si haw",
        "Mei yu sen mu hui yung ch'ui",
        "K'o shih wo, yu si haw",
        "Ning yuan sen tso liu lien pu fang shou",
        "Teng tau fong king tu kan tou",
        "Yeh hsu ni hui p'ei wo, kan si shui ch'ang liu",
        "...",
        "Yu si haw, yu si haw",
        "Wo hui siang shin yi ch'ieh yu jin tou",
        "Siang chu li k'ai, tu yu si haw",
        "Mei yu sen mu hui yung ch'ui",
        "K'o shih wo, yu si haw",
        "Ning yuan sen tso liu lien pu fang shou",
        "Teng tau fong king tu kan tou",
        "Yeh hsu ni hui p'ei wo, kan si shui ch'ang liu",
        "",
    ];
    lyrics_changes = [
        0,
        15,
        19,
        23,
        26,
        32,
        36,
        40,
        43,
        49,
        53,
        57,
        60 + 1,
        60 + 5,
        60 + 10,
        60 + 15,
        60 + 19,
        60 + 27,
        60 + 41,
        60 + 44,
        60 + 49,
        60 + 54,
        60 + 57,
        60 * 2 + 2,
        60 * 2 + 6,
        60 * 2 + 9,
        60 * 2 + 17,
        60 * 2 + 21,
        60 * 2 + 25,
        60 * 2 + 30,
        60 * 2 + 34,
        60 * 2 + 38,
        60 * 2 + 42,
        60 * 2 + 47,
        60 * 2 + 54,
        60 * 3 + 6,
        60 * 3 + 10,
        60 * 3 + 14,
        60 * 3 + 19,
        60 * 3 + 23,
        60 * 3 + 27,
        60 * 3 + 32,
        60 * 3 + 36,
        60 * 3 + 46,
        60 * 4 + 14,
    ];
    calc_lyrics_durations(lyrics_changes);
    add_mv(hd);
});

ghsy.addEventListener("click", function () {
    countdown(ghsy);
    volume = 0.6;
    lyrics_texts = [
        "...",
        "Zung sen syang chyi kuey jiar de shun ho",
        "Tsai t'a sheng ming li",
        "Fang fu dai dian hsi syu",
        "Hei se chi fu gei t'a te yi yi",
        "Shi i sheng feng syan, fu se tou jyung",
        "Nyen yue pa yung yu pyan tso shi chy",
        "P'i chyuan te shuang yen tai tse hsi wang",
        "Jin t'ien chih yu chan liu te k'yu k'o",
        "Ying jie kuang hui syu yue",
        "Fong yu chung bao chin tz'u",
        "I sheng ching kwuo fang wang te tsan chya",
        "Tzu hsin k'o ke pien wei lai",
        "Wen shui yu neng tso tao",
        "...",
        "K'o foh pu fen fu se te chieh hsien",
        "Yuan tse tu ti li",
        "Pu fen ni wo kau ti",
        "Pin fen se ts'ai shan ch'u te mei li",
        "Shi yin t'a mei yu",
        "Fen k'ai moh chong se ts'ai",
        "Nyen yue pa yung yu pyan tso shi chy",
        "P'i chyuan te shuang yen tai tse hsi wang",
        "Jin t'ien chih yu chan liu te k'yu k'o",
        "Ying jie kuang hui syu yue",
        "Fong yu chung bao chin tz'u",
        "I sheng ching kwuo fang wang te tsan chya",
        "Tzu hsin k'o ke pien wei lai",
        "Wen shui yu neng tso tao",
        "...",
        "Jin t'ien chih yu chan liu te k'yu k'o",
        "Ying jie kuang hui syu yue",
        "Fong yu chung bao chin tz'u",
        "I sheng ching kwuo fang wang te tsan chya",
        "Tzu hsin k'o ke pien wei lai",
        "Wen shui yu neng tso tao",
        "Ooh ... Ooh ...",
        "Jin t'ien chih yu chan liu te k'yu k'o",
        "Ying jie kuang hui syu yue",
        "Fong yu chung bao chin tz'u",
        "I sheng ching kwuo fang wang te tsan chya",
        "Tzu hsin k'o ke pien wei lai",
        "Wen shui yu neng tso tao",
        "Ooh ... Ooh ...",
        "Jin t'ien chih yu chan liu te k'yu k'o",
        "Ying jie kuang hui syu yue",
        "Fong yu chung bao chin tz'u",
        "I sheng ching kwuo fang wang te tsan chya",
        "Tzu hsin k'o ke pien wei lai",
        "...",
    ];
    lyrics_changes = [
        0,
        31,
        35,
        38,
        44,
        48,
        56,
        60 + 2,
        60 + 9,
        60 + 13,
        60 + 16,
        60 + 22,
        60 + 26,
        60 + 29,
        60 + 35,
        60 + 44,
        60 + 49,
        60 + 53,
        60 + 58,
        60 * 2 + 3,
        60 * 2 + 6,
        60 * 2 + 11,
        60 * 2 + 18,
        60 * 2 + 23,
        60 * 2 + 28,
        60 * 2 + 31,
        60 * 2 + 37,
        60 * 2 + 41,
        60 * 2 + 44,
        60 * 2 + 48,
        60 * 3 + 25,
        60 * 3 + 30,
        60 * 3 + 33,
        60 * 3 + 38,
        60 * 3 + 42,
        60 * 3 + 44,
        60 * 3 + 50,
        60 * 4 + 1,
        60 * 4 + 5,
        60 * 4 + 8,
        60 * 4 + 14,
        60 * 4 + 19,
        60 * 4 + 21,
        60 * 4 + 26,
        60 * 4 + 36,
        60 * 4 + 40,
        60 * 4 + 43,
        60 * 4 + 49,
        60 * 4 + 53,
        60 * 5 + 4,
    ];
    calc_lyrics_durations(lyrics_changes);
    add_mv(ghsy);
});

lydia.addEventListener("click", function () {
    countdown(lydia);
    volume = 0.5;
    lyrics_texts = [
        "...",
        "Lydia mi li de yan kuang",
        "Wwei ho liu lang hsin suei te hai yang",
        "Shou le shang lien wliuan hsiao tou fang huang",
        "Gypsy nü lang wei shei erh ch'ang",
        "Ni hui k'an chü yen k'an yün k'an t'ai yang",
        "Chün lieh te ta ti chou fu ch'ou",
        "T'a tsou le tai pu tsou ni ti t'ien t'ang",
        "Feng kan hou hui liu hsia ts'ai hung lei kuang",
        "T'a tsou le ni erh key ba meng liu hsia",
        "Tso hui yu ko ti ti fang deng tai ai fei hsüang",
        "...",
        "Lydia hsin fu pu tsai yen fang",
        "K'ai i shan ch'uang hsü yen yüan wang",
        "Ni hui kan shou ai kan shou hen kan shou yüan liang",
        "Sheng ming tsung pu hui ch'ung man pei shang",
        "T'a tsou le tai pu tsou ni ti t'ien t'ang",
        "Feng kan hou hui liu hsia ts'ai hung lei kuang",
        "T'a tsou le ni erh key ba meng liu hsia",
        "Tsung hui yu ko ti ti fang deng tai ai fei hsüang",
        "...",
        "T'a tsou le tai pu tsou ni ti t'ien t'ang",
        "Feng kan hou hui liu hsia ts'ai hung lei kuang",
        "T'a tsou le ni erh key ba meng liu hsia",
        "Tsung hui yu ko ti ti fang deng tai ai fei hsüang",
        "...",
        "Cai hong lei kuang",
        "",
    ];
    lyrics_changes = [
        0,
        19,
        25,
        31,
        37,
        43,
        48,
        54,
        60,
        60 + 6,
        60 + 12,
        60 + 22,
        60 + 37,
        60 + 43,
        60 + 48,
        60 + 54,
        60 * 2,
        60 * 2 + 6,
        60 * 2 + 12,
        60 * 2 + 18,
        60 * 2 + 26,
        60 * 2 + 48,
        60 * 2 + 53,
        60 * 2 + 59,
        60 * 3 + 5,
        60 * 3 + 13,
        60 * 3 + 18,
        60 * 3 + 23,
        60 * 3 + 55,
    ];
    calc_lyrics_durations(lyrics_changes);
    add_mv(lydia);
});

// ajl.addEventListener("click", function () {

// countdown(ajl);
//     lyrics_texts = [
//         "...",
//         "Chih sheng hsia kang ch'in pei wo ts'an tsai zhe li",
//         "Meng hsiang chung shu yu wo men ti hun li",
//         "Chüeh ch'eng le tan jen chieh hun ching ching chien ch'u",
//         "Tsai zhe ch'ang ai ch'ing chiao li de ba ho li",
//         "Ai wo hai shi ai ni",
//         "Ni hsüeh ze le tzu chi",
//         "Woo",
//         "Sa chiao te k'ai te nü jen te ai k'u te",
//         "Chao p'ien li ts'eng ching te tou shi ni hsi huan te",
//         "Ju chün wo hai tsai yuan ti",
//         "Ni chüeh tsou hui ni ti chi yi",
//         "Ni shuo wo ai ni t'ai duo",
//         "Chiu kuai yao ba ni yen mo",
//         "Ni hai pao hsing fu tuan yi miao chiu p'eng luo",
//         "Fen k'ai shih yi chung chieh t'o",
//         "Rang ni hao hao te hsiang kuo",
//         "Wo hsiang yao te na pian t'ien k'ung",
//         "Ni shih pu shih neng k'e k'i wo",
//         "Ni shuo wo k'e ni t'ai duo",
//         "Chüeh pu neng k'e wo shen me",
//         "Fen pu ch'ing ch'ing ch'i ch'ing",
//         "Ch'êng nu yung hêng huo mi huo",
//         "Ai ch'ing shih yi tao shang k'ou",
//         "Wo men ko tzu ku tung",
//         "Chên mo shih wo tsui hou te yao",
//         "Chih sheng hsia kang ch'in pei wo ts'an tsai zhe li",
//         "Meng hsiang chung shu yu wo men ti hun li",
//         "An ching le tsai wo chêng t'ien ti meng li",
//         "Wo chih tao hsiang ai gen pen chiu pu yung yi",
//         "Ai pu shih yi chia yi",
//         "Nü li chiu yü chieh chü",
//         "Woo",
//         "Sa chiao te k'ai te nü jen te ai k'u te",
//         "Chao p'ien li ts'eng ching te tou shi ai che ni ti",
//         "Lien chia tou mei huan wen je",
//         "Chüeh mei yu jen mo nan shou",
//         "Ni shuo wo ai ni t'ai duo",
//         "Chiu kuai yao ba ni yen mo",
//         "Ni hai pao hsing fu tuan yi miao chiu p'eng luo",
//         "Fen k'ai shih yi chung chieh t'o",
//         "Rang ni hao hao te hsiang kuo",
//         "Wo hsiang yao te na pian t'ien k'ung",
//         "Ni shih pu shih neng k'e k'i wo",
//         "Ni shuo wo k'e ni t'ai duo",
//         "Chüeh pu neng k'e wo shen me",
//         "Fen pu ch'ing ch'ing ch'i ch'ing",
//         "Ch'êng nu yung hêng huo mi huo",
//         "Ai ch'ing shih yi tao shang k'ou",
//         "Wo men ko tzu ku tung",
//         "Chên mo shih wo tsui hou te yao",
//     ];
//     lyrics_changes = [0, , , , , 60 + , 60 + , 60 + , 60 + , 60 + , 60*2 + , 60*2 + , 60*2 + , 60*2 + , 60*3 + , 60*3 + , 60*3 + , 60*3 + , 60*3 + , 60*3 + , 60*4 + , 60*4 + , 60*4 + , 60*4 + , 60*4 + , 60*5 + , 60*5 + , 60*5 + ,];
//     calc_lyrics_durations(lyrics_changes);
//     add_mv(ajl);
// });

lian.addEventListener("click", function () {
    countdown(lian);
    lyrics_texts = [
        "...",
        "Hu sy sz ni ti lian",
        "Ni cyu xyan cai man yan",
        "Putwan ien ban na he an xyan",
        "Canq cu le zue ai yen de xueqian",
        "Pan guo ni ti lian",
        "Xiang bu tao na me wyan yan",
        "Zai ni zuo bian de rong yan Uo guo cuo di",
        "Wo qie yu maosyan",
        "Zue bao mae yao xyni woi shmo",
        "Zho ny ting dong wo shang shmo",
        "Ni yi lian chen mo",
        "Shmo wo me shmo wo me shmo",
        "...",
        "Xi xi de xan sye bu zhi yi dian dian",
        "Ni mei tou syf pu xan huangmei tien",
        "Lai ba zuirun wo di cang hai sangtien",
        "Ni me yi lian shi wo yi nian",
        "Yi hao jiu bu jian",
        "Chou yan chou xiang de lian",
        "Yv mian mian jan wo shi mien",
        "I tieng i ti de cenden leicheng",
        "Wo zhouwen zai ni ti xiao lian",
        "Zue bao mae yao xyni woi shmo",
        "Zho ny ting dong wo shang shmo",
        "Ni yi lian chen mo",
        "Shmo wo me shmo wo me shmo",
        "",
    ];

    lyrics_changes = [
        0,
        16,
        24,
        31,
        36,
        46,
        52,
        60 + 1,
        60 + 7,
        60 + 15,
        60 + 23,
        60 + 30,
        60 + 36,
        60 + 44,
        60 + 51,
        60 + 58,
        60 * 2 + 6,
        60 * 2 + 10,
        60 * 2 + 15,
        60 * 2 + 20,
        60 * 2 + 27,
        60 * 2 + 35,
        60 * 2 + 41,
        60 * 2 + 50,
        60 * 2 + 57,
        60 * 3 + 7,
        60 * 3 + 11,
        60 * 3 + 26,
        60 * 3 + 38,
    ];
    calc_lyrics_durations(lyrics_changes);
    add_mv(lian);
});

sqbm.addEventListener("click", function () {
    countdown(sqbm);
    volume = 0.6;
    lyrics_texts = [
        "...",
        "Ngoh oi shei kua bu guo cong lai ye bu jue de cuo",
        "Tzu yi wei zhua che tung chung ne wang hui yi li to",
        "Pien chih siang sin choh su chu de shui ching chiu",
        "Tsuh tang koh lung hsin tung ti li yu",
        "Er ni chü koh ching le bi wo men shih hsien chiao choh",
        "Yuan ti pu tung huo hsiang ch'ien tsou",
        "Tu jan tsai i chih fen",
        "Yen pien huang sha mi man le tung hou",
        "Er pien chuan lai ts'an chiu de hu chiu",
        "Chui kan yao wo ai te pu pao liu",
        "Ngoh shen ch'i pai ma tsou san kwan",
        "Ngoh kai huan su i hui chung yüan",
        "Fang hsia hsi liang mei jen kuan",
        "Ngoh yi hsin chih siang wang pao chuan",
        "...",
        "Er ni chü koh ching le bi wo men shih hsien chiao choh",
        "Yuan ti pu tung huo hsiang ch'ien tsou",
        "Tu jan tsai i chih fen",
        "Yen pien huang sha mi man le tung hou",
        "Er pien chuan lai ts'an chiu de hu chiu",
        "Chui kan yao wo ai te pu pao liu",
        "Ngoh shen ch'i pai ma tsou san kwan",
        "Ngoh kai huan su i hui chung yüan",
        "Fang hsia hsi liang mei jen kuan",
        "Ngoh yi hsin chih siang wang pao chuan",
        "Man shen shang hen hen lei lei ye lai pu chi tung",
        "Na shih chih yin wo tsou hsiang ni te ch'ing chu kan sou",
        "O pu kuan wei pu wei hsiien tou yao fang hsin ch'i chung ni tsou",
        "Chih yao yi chi ch'eng tan chih yao ni pu fang shou",
        "Ngoh shen ch'i pai ma tsou san kwan",
        "Ngoh kai huan su i hui chung yüan",
        "Fang hsia hsi liang mei jen kuan",
        "Ngoh yi hsin chih siang wang pao chuan",
        "...",
        "Hei",
        "Ngoh kai huan su i hui chung yüan",
        "Fang hsia hsi liang mei jen kuan",
        "Ngoh yi hsin chih siang wang pao chuan",
        "",
    ];
    lyrics_changes = [
        0,
        37,
        44,
        51,
        59,
        60 + 7,
        60 + 14,
        60 + 18,
        60 + 21,
        60 + 24,
        60 + 29,
        60 + 38,
        60 + 45,
        60 + 52,
        60 * 2,
        60 * 2 + 8,
        60 * 2 + 22,
        60 * 2 + 29,
        60 * 2 + 33,
        60 * 2 + 36,
        60 * 2 + 40,
        60 * 2 + 44,
        60 * 2 + 52,
        60 * 2 + 59,
        60 * 3 + 7,
        60 * 3 + 14,
        60 * 3 + 22,
        60 * 3 + 29,
        60 * 3 + 37,
        60 * 3 + 44,
        60 * 3 + 52,
        60 * 4,
        60 * 4 + 7,
        60 * 4 + 15,
        60 * 4 + 23,
        60 * 4 + 30,
        60 * 4 + 37,
        60 * 4 + 47,
        60 * 5,
        60 * 5 + 17,
    ];
    calc_lyrics_durations(lyrics_changes);
    add_mv(sqbm);
});

// tfl.addEventListener("click", function () {
//     lyrics_texts = ["..."];
//     lyrics_durations = [];
//     add_mv(tfl);
// });

// jxs.addEventListener("click", function () {
//     lyrics_texts = [
//         "...",
//         "UAU IAUYAO CUN NAN CAU DAO PEI",
//         "UAU HAN TAO CUN BAI CAU DAO HEI",
//         "UAU IAUYAO REN MEN DOU KAN DAO UA",
//         "DAN BU ZHI DAO UA SHI SHEI",
//     ];
//     lyrics_durations = [74, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
//     add_mv(jxs);
// });

// ADD MV

function add_mv(song_choice) {
    mv = document.createElement("video");
    mv.loop = true;
    const source = document.createElement("source");
    if (song_choice == qlx)
        source.setAttribute("src", "assets/vids/qi_li_xiang.mp4");
    // else if (song_choice == jxs)
    //     source.setAttribute("src", "assets/vids/jia_xing_seng.mp4");
    else if (song_choice == hd)
        source.setAttribute("src", "assets/vids/hong_dou.mp4");
    else if (song_choice == ghsy)
        source.setAttribute("src", "assets/vids/guang_hui_sui_yue.mp4");
    else if (song_choice == lydia)
        source.setAttribute("src", "assets/vids/lydia.mp4");
    else if (song_choice == lian)
        source.setAttribute("src", "assets/vids/lian.mp4");
    else if (song_choice == sqbm)
        source.setAttribute("src", "assets/vids/shen_qi_bai_ma.mp4");

    source.setAttribute("type", "video/mp4");

    mv.appendChild(source);
    mv_container.appendChild(mv);

    setTimeout(() => {
        mv_container.style.opacity = 1;
        mv.style.opacity = 1;
    }, count * 1000);
}

function countdown(song_choice) {
    if (count == 0) {
        start_song();

        document.querySelector(".countdown").style.opacity = 0;
        setTimeout(() => {
            document.querySelector(".countdown").style.display = "none";
        }, 500);

        mv.play();
        mv.volume = volume;
        change_lyrics();
        init_audio();

        const stars = document.querySelectorAll(".background-star ");
        stars.forEach((star) => {
            star.style.zIndex = -10;
        });
    } else {
        count--;
        document.querySelector(".countdown .count").innerHTML = count;
        countdown_carousel.style.display = "block";
        if (song_choice == qlx) cc_songchoice.innerHTML = "Tsilixiang";
        else if (song_choice == hd) cc_songchoice.innerHTML = "Hong Tou";
        else if (song_choice == ghsy)
            cc_songchoice.innerHTML = "Kuang Hui Syu Yue";
        else if (song_choice == lydia) cc_songchoice.innerHTML = "Lydia";
        else if (song_choice == lian) cc_songchoice.innerHTML = "Lian";
        else if (song_choice == sqbm)
            cc_songchoice.innerHTML = "Shen Ch'i Pai Ma";
        setTimeout(() => countdown(song_choice), 1000);
    }
}

back_btn.addEventListener("click", () => {
    location.reload();
});

function calc_lyrics_durations(lyrics_changes) {
    for (var i = 0; i < lyrics_changes.length; i++) {
        let lyrics_duration = lyrics_changes[i + 1] - lyrics_changes[i];
        lyrics_durations.push(lyrics_duration);
    }
}

function remove_black_screen() {
    document.querySelector(".black_screen").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".black_screen").style.display = "none";
    }, 500);
}
