// define variables
const videoElement = document.getElementsByClassName("input_video")[0];
const mouthCanvasElement = document.getElementsByClassName("mouth_canvas")[0];
const mouthCanvasCtx = mouthCanvasElement.getContext("2d");
const textbox = document.querySelector(".textbox");
const screenshot = document.querySelector(".screenshot");
// const bb = document.querySelector(".bouncing_ball");
let lyrics = document.querySelector(".lyrics");

const bg = document.querySelector(".bg");

let bg_texts = [
    "As a matter of fact, in our time the intense attachment to one's native land is often viewed as an unnecessary and anachronic feeling that tends to debilitate migrants. I would even argue that, for many displaced people, nostalgia is also blended with fear — the fear of uncertainty and of facing the challenges posed by the larger world and the fear of the absence of the clarity and confidence provided by the past.",

    "In essence, nostalgia is associated mostly with the experience of a particular type of migrants, namely, exiles. For most migrants, this attachment can become unreasonable and even unjustified, as the narrator of Salmon Rushdie's novel <em>Shame</em> refutes: &#8220; We know the force of gravity, but not its origins; and to explain why we become attached to our birthplaces we pretend that we are trees and speak of roots. Look under your feet. You will not find gnarled growths sprouting through the soles. Roots, I sometimes think, are a conservative myth, designed to keep us in places.&#8221;",

    "The debunking of the tree metaphor makes it clear that human beings are different from trees and should be rootless and entirely mobile. This is indeed a radical idea, which, in a way, the novel dramatizes, just as its protagonist Omar Khayyam is destroyed after he returns to his native place.",

    "But human beings are not always rational animals, and even the same narrator in <em>Shame</em> cannot help but feel shamefaced at times and admits, &#8220; And to come to the 'roots' idea, I should say that I haven't managed to shake myself free of it completely. Sometimes I do see myself as a tree, even, rather grandly, as the ash Yggdrasil, the mythical world-tree of Norse legend.&#8221;",

    "What is fundamental here is the playfulness manifested in the metaphor of the ash Yggdrasil, which, existing in the domain of Scandinavian mythology, has little to do with the narrator's native place, but which is transplanted into his being through artistic imagination.",

    "对 于 表 达 者 来 说， 你 离 开 母 语 世 界 会 意 味 这 种 新 的 语 言 去 表 达， 去 表 达 自 己。 就， 其 实 这 个 事 情 是 伴 随 着 一 些 这 种 状 态 独 有 的 挑 战 的。 我 们 都 算 是， 如 果 中 文 世 界 是 个 星 球， 我 们 就 是 外 面 那 个 小 行 星。 我 们 的 身 份 已 经 很， 已 经 离 这 个 中 心 非 常 非 常 的 远 了。",

    "It was probably meant to be like this. Each of us has a star to follow. So now what are you thinking of doing? <br> Do like the soldier, Toto! Go away! This land is cursed.",

    "When you're here every day you feel like you're at the center of the universe, it seems like nothing ever changes. Then you go away, one year, two... And when you come back, everything's different. The thread has broken. You don't find those you were looking for, your things no longer exist. Isn't that the case? ... You've got to go away a long time, for many, many years, before coming back and finding your people again, the land where you were born... But not now, it's impossible. Now you're blinder than I am.",

    "Don't come back any more, don't think about us, don't turn round, don't write, don't give in to nostalgia. Forget us all. If you can't hear it and come back, don't come looking for me, I won't let you into the house, you understand?",

    "It's just that I was scared of coming back. Now, after all these years, I thought I was strong, that I had forgotten lots of things. Instead, I find it's quite the opposite, as if I had never left. And yet, I look at Lia and feel as if I didn't know her, and you, Mamma... I abandoned you, ran away like a thief, thought only of myself, and never gave you an explanation...",

    "And I never asked for one! You have nothing to explain. I always thought that what you did was right, and that was that. With no beating around the bush... But your life's there. Here there are nothing but ghosts, Toto! Let it go.",
];

bg_texts = bg_texts.map(function (bg_words) {
    return bg_words.split(" ");
});

let l_index = 0;

let textHeight;
let textHeight_max = 90;

//global booleans
let song_chosen = false;
let ended = false;

//AUDIO CTX

function init_audio() {
    const audioContext = new AudioContext();

    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 512;
            source.connect(analyser);

            setInterval(() => {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);
                const average =
                    dataArray.reduce((sum, value) => sum + value) /
                    bufferLength;
                const size = map(average, 0, 80, 1, 5);
                let filter;
                let opacity;
                if (average <= 15) {
                    filter = map(average, 0, 15, 70, 5);
                    // filter = 0;
                    opacity = map(average, 0, 15, 0.6, 1);
                } else {
                    filter = 5;
                    opacity = 1;
                    console.log("volume maxed out");
                }

                // console.log("average is" + average);

                mv.style.filter = `blur(${filter}px)`;
                mv_container.style.opacity = opacity;
            }, 50);
        })
        .catch((err) => {
            console.error(err);
        });
}

function start_song() {
    if (!song_chosen) return;
}

function bounce_ball(screenshot_data) {
    bb.style.backgroundImage = `url(${screenshot_data})`;
}

function change_lyrics() {
    const lyrics_span = document.querySelector(".span_lyrics");

    //restarting run-text animation
    lyrics_span.classList.remove("span_lyrics");
    lyrics_span.style.animation = "none";
    lyrics_span.offsetHeight; /* trigger reflow */
    lyrics_span.style.animation = null;
    lyrics_span.classList.add("span_lyrics");

    lyrics = document.querySelector(".lyrics");
    // console.log(lyrics);
    if (l_index > lyrics_texts.length - 1) l_index = 0;
    lyrics.innerHTML = lyrics_texts[l_index];

    lyrics_span.dataset.text = lyrics_texts[l_index];

    //changing the speed of the blue lyrics animation
    // const lyrics_span_after = window.getComputedStyle(lyrics_span, "::after");

    lyrics_span.style.setProperty(
        "--lyrics_speed",
        lyrics_durations[l_index] + "s"
    );

    setTimeout(() => {
        change_lyrics();
    }, lyrics_durations[l_index] * 1000);
    l_index++;
}

// ===============================
//General / reusable functions
// https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
function map(in_val, in_min, in_max, out_min, out_max) {
    return (
        ((in_val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

function randomize(min, max) {
    return min + Math.random() * (max - min);
}

//function modified from https://laurelschwulst.github.io/nina-alan.world/
function createStars() {
    const starMaxSize = 30;
    const starMinSize = 10;
    const random_num = Math.floor(randomize(0, bg_texts.length));
    const random_bgtext = bg_texts[random_num];

    const character_count = random_bgtext.length;
    // console.log("character count", character_count);

    let margin_vertical = 100 - character_count / 1.5;
    let margin_horizontal = 100 - character_count / 1.5;

    //adjusting margins for larger or smaller browser sizes
    const window_area = window.innerWidth * window.innerHeight;
    // console.log("window area", window_area);
    if (window_area > 1624320) {
        margin_vertical = margin_vertical + (window_area - 1624320) / 20000;
    } else if (window_area < 1624320) {
        margin_vertical = margin_vertical - (1624320 - window_area) / 20000;
    }

    // console.log("margin vertical", margin_vertical);

    // console.log(random_num);
    // console.log(random_bgtext);

    for (let i = 0; i < random_bgtext.length; i++) {
        const fontsize = randomize(starMinSize, starMaxSize);

        const vertical_shift = randomize(-50, 50);

        const star = document.createElement("div");
        const p = document.createElement("p");

        star.appendChild(p);
        bg.appendChild(star);

        star.className = `star-${Math.ceil(Math.random() * 3)}`;
        p.innerHTML = random_bgtext[i];

        p.style.fontSize = fontsize + "px";
        star.style.margin = `${margin_vertical}px ${margin_horizontal}px`;
        // p.style.verticalAlign = vertical_shift + "px";
        star.style.transform = `translateY(${vertical_shift}px)`;
    }
}
