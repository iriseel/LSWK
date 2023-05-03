let lyrics_texts = [];
let lyrics_durations = [];

const back_btn = document.querySelector(".back");

const song_choices = document.querySelectorAll(".song_choice");

const carousel_item = document.querySelector(".carousel_item");
const carousel_items = document.querySelectorAll(".carousel_item");

const qlx = document.querySelector(".qi-li-xiang");
const jxs = document.querySelector(".jia-xing-seng");
const ghsy = document.querySelector(".guang-hui-sui-yue");

const mv_container = document.querySelector(".mv");
let mv = null;

let count = 4;

let delay = 0,
    step = 10 / carousel_items.length; /* 5 is the animation duration */
carousel_items.forEach(function (carousel_item) {
    carousel_item.style.animationDelay = -delay + "s";
    delay += step;
});

//CHOOSING THE SONGS
song_choices.forEach(function (song_choice) {
    song_choice.addEventListener("click", function () {
        song_chosen = true;
        remove_black_screen();
        countdown();

        createStars();
    });
});

qlx.addEventListener("click", function () {
    lyrics_texts = [
        "...",
        "窗外的麻雀 在电线杆上多嘴",
        "你说这一句 很有夏天的感觉",
        "手中的铅笔 在纸上来来回回",
        "我用几行字形容你是我的谁",
        "秋刀鱼的滋味 猫跟你都想了解",
        "初恋的香味 就这样被我们寻回",
        "那温暖的阳光 像刚摘的鲜艳草莓",
        "你说你舍不得吃掉 这一种感觉",
        "雨下整夜 我的爱溢出就像雨水",
        "院子落叶 跟我的思念厚厚一叠",
        "几句是非 也无法将我的热情冷却",
        "你出现在我诗的每一页",
        "雨下整夜我的爱溢出就像雨水",
        "窗台蝴蝶 像诗里纷飞的美丽章节",
        "我接着写 把永远爱你写进诗的结尾",
        "你是我唯一想要的了解",
        "雨下整夜 我的爱溢出就像雨水",
        "院子落叶 跟我的思念厚厚一叠",
        "几句是非 也无法将我的热情冷却",
        "你出现在我诗的每一页",
        "那饱满的稻穗 幸福了这个季节",
        "而你的脸颊像田里熟透的蕃茄",
        "你突然对我说 七里香的名字很美",
        "我此刻却只想亲吻你倔强的嘴",
        "雨下整夜 我的爱溢出就像雨水",
        "院子落叶 跟我的思念厚厚一叠",
        "几句是非 也无法将我的热情冷却",
        "你出现在我诗的每一页",
        "整夜 我的爱溢出就像雨水",
        "窗台蝴蝶 像诗里纷飞的美丽章节",
        "我接着写 把永远爱你写进诗的结尾",
        "你是我唯一想要的了解",
    ];
    lyrics_durations = [29, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
    add_mv(qlx);
});

jxs.addEventListener("click", function () {
    lyrics_texts = [
        "...",
        "UAU IAUYAO CUN NAN CAU DAO PEI",
        "UAU HAN TAO CUN BAI CAU DAO HEI",
        "UAU IAUYAO REN MEN DOU KAN DAO UA",
        "DAN BU ZHI DAO UA SHI SHEI",
    ];
    lyrics_durations = [74, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
    add_mv(jxs);
});

ghsy.addEventListener("click", function () {
    lyrics_texts = [
        "...",
        "钟声响起归家的讯号",
        "在他生命里",
        "仿佛带点唏嘘",
        "黑色肌肤给他的意义",
        "是一生奉献 肤色斗争中",
        "年月把拥有变做失去",
        "疲倦的双眼带着期望",
        "今天只有残留的躯壳",
        "迎接光辉岁月",
        "风雨中抱紧自由",
        "一生经过彷徨的挣扎",
        "自信可改变未来",
        "问谁又能做到",
        "可否不分肤色的界限",
        "愿这土地里",
        "不分你我高低",
        "缤纷色彩闪出的美丽",
        "是因它没有",
        "分开每种色彩",
        "年月把拥有变做失去",
        "疲倦的双眼带着期望",
        "今天只有残留的躯壳",
        "迎接光辉岁月",
        "风雨中抱紧自由",
        "一生经过彷徨的挣扎",
        "自信可改变未来",
        "问谁又能做到",
        "今天只有残留的躯壳",
        "迎接光辉岁月",
        "风雨中抱紧自由",
        "一生经过彷徨的挣扎",
        "自信可改变未来",
        "问谁又能做到",
        "今天只有残留的躯壳",
        "迎接光辉岁月",
        "风雨中抱紧自由",
        "一生经过彷徨的挣扎",
        "自信可改变未来",
        "问谁又能做到",
        "今天只有残留的躯壳",
        "迎接光辉岁月",
        "风雨中抱紧自由",
        "一生经过彷徨的挣扎",
        "自信可改变未来",
    ];
    lyrics_durations = [28, 4, 9, 4, 8, 4, 9, 4, 9, 4, 9, 4];
    add_mv(ghsy);
});

// ADD MV
function add_mv(song_choice) {
    mv = document.createElement("video");
    mv.loop = true;
    const source = document.createElement("source");
    if (song_choice == qlx)
        source.setAttribute("src", "assets/vids/qi_li_xiang.mp4");
    else if (song_choice == jxs)
        source.setAttribute("src", "assets/vids/jia_xing_seng.mp4");
    else if (song_choice == ghsy)
        source.setAttribute("src", "assets/vids/guang_hui_sui_yue.mp4");
    source.setAttribute("type", "video/mp4");

    mv.appendChild(source);
    mv_container.appendChild(mv);

    setTimeout(() => {
        mv_container.style.opacity = 1;
        mv.style.opacity = 1;
    }, count * 1000);
}

function countdown() {
    if (count == 0) {
        // faceMesh.onResults(onResults);
        start_song();
        document.querySelector(".countdown").style.opacity = 0;
        setTimeout(() => {
            document.querySelector(".countdown").style.display = "none";
        }, 500);

        mv.play();
        change_lyrics();
        init_audio();

        const stars = document.querySelectorAll(".background-star ");
        stars.forEach((star) => {
            star.style.zIndex = -10;
        });
    } else {
        count--;
        document.querySelector(".countdown .count").innerHTML = count;
        setTimeout(() => countdown(), 1000);
    }
}

back_btn.addEventListener("click", () => {
    location.reload();
});
