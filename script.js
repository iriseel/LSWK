// define variables
const videoElement = document.getElementsByClassName("input_video")[0];
const mouthCanvasElement = document.getElementsByClassName("mouth_canvas")[0];
const mouthCanvasCtx = mouthCanvasElement.getContext("2d");
const textbox = document.querySelector(".textbox");
const screenshot = document.querySelector(".screenshot");
const bb = document.querySelector(".bouncing_ball");
const disco = document.querySelector(".disco_ball");
const audio = document.querySelector("audio");
const mv = document.querySelector(".mv video");

let words = "";
let wordcount = null;
let word_num = 0;
let beat_time = null;

let index = 0;
let time = 0;

let beat_passed = true;

const lyrics_texts = [
    "UAU IAUYAO CUN NAN CAU DAO PEI",
    "UAU HAN TAO CUN BAI CAU DAO HEI",
    "UAU IAUYAO REN MEN DOU KAN DAO UA",
    "DAN BU ZHI DAO UA SHI SHEI",
];

// const words_per_lines = [];
// for (let i = 0; i < lyrics_texts.length; i++) {
//     const words_per_line = [word_count(lyrics_texts[i])];
//     words_per_lines.push(words_per_line);
// }
// console.log(words_per_lines);

let lyrics_index = -1;

let lyrics = document.querySelector(".lyrics");

let textHeight;
let textHeight_max = 90;
let filter = 8;
let filter_max = 8;
let bb_height_max = 100;

let song_chosen = false;
//global booleans
let ended = false;

//AUDIO CTX
document.addEventListener("click", init_audio);

function init_audio() {
    const audioContext = new AudioContext();

    //??Trying to calculate bpm
    // const song_source = audioContext.createMediaElementSource(audio);
    // song_source.connect(audioContext.destination);
    // // Create a new instance of a BPM detector
    // const detector = new window.BPM();

    // // Analyze the audio file and get the BPM
    // detector.on("bpm", function (bpm) {
    //     console.log(`BPM: ${bpm}`);
    // });
    // song_source.connect(detector);

    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 512;
            source.connect(analyser);
            // console.log(source);

            setInterval(() => {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);
                const average =
                    dataArray.reduce((sum, value) => sum + value) /
                    bufferLength;
                const size = map(average, 0, 80, 1, 5);

                // console.log("average is" + average);
                disco.style.transform = `scale(${(size, size)})`;
                bb.style.transform = `translateY(-${Math.floor(
                    map(average, 0, 80, 0, bb_height_max)
                )}vh)`;

                // disco.style.width = size * 10 + "px";
                // disco.style.height = size * 10 + "px";
            }, 50);
        })
        .catch((err) => {
            console.error(err);
        });

    document.removeEventListener("click", init_audio);
}

song_choices.forEach(function (song_choice) {
    song_choice.addEventListener("click", function () {
        song_chosen = true;

        remove_black_screen();
        countdown(4);
    });
});

function countdown(count) {
    if (count == 0) {
        faceMesh.onResults(onResults);
        document.querySelector(".countdown").style.opacity = 0;
        setTimeout(() => {
            document.querySelector(".countdown").style.display = "none";
        }, 500);
    } else {
        count--;
        document.querySelector(".countdown .count").innerHTML = count;
        setTimeout(() => countdown(count), 1000);
    }
}

//FACEMESH STUFF
// Results Handler
function onResults(results) {
    //need this if statement, or else video freezes when it can't find the multiFaceLandmarks (e.g. when user has turned their head away from the camera)
    if (results.multiFaceLandmarks && !ended) {
        if (!song_chosen) return;
        start_song();
        let bpm = 127;
        //??This beat time doesn't seem to be calculated correctly??
        beat_time = ((bpm / 60) * 1000) / 2;

        //needs [0] bc the array of results.multiFaceLandmarks has multiple things inside it, but facemesh points are stored in [0]
        if (results.multiFaceLandmarks[0]) {
            //Facemesh/mediapipe gives the x and y values of its landmarks as percentages of the total webcam view size (where 0 is leftmost, 1 is rightmost), rather than specific numerical coordinates.
            let crop_x_percent = results.multiFaceLandmarks[0][212].x;
            let crop_y_percent = results.multiFaceLandmarks[0][164].y;
            let crop_width_percent =
                results.multiFaceLandmarks[0][432].x - crop_x_percent;
            let crop_height_percent =
                results.multiFaceLandmarks[0][200].y - crop_y_percent;

            // multiply the percentages by the mouthCanvasElement to get their absolute x,y values, rather than just percentages
            let crop_x = crop_x_percent * mouthCanvasElement.width;
            let crop_y = crop_y_percent * mouthCanvasElement.height;
            let crop_width = crop_width_percent * mouthCanvasElement.width;
            let crop_height = crop_height_percent * mouthCanvasElement.height;

            mouthCanvasCtx.save();

            clear_canvas();

            mouthCanvasCtx.drawImage(
                results.image,
                crop_x,
                crop_y,
                crop_width,
                crop_height,
                0,
                0,
                mouthCanvasElement.width,
                mouthCanvasElement.height
            );

            let screenshot_data = mouthCanvasElement.toDataURL("image/png");
            bounce_ball(screenshot_data);
            log_beat();

            mouthCanvasCtx.restore();
        }
    }
}

function bounce_ball(screenshot_data) {
    bb.style.backgroundImage = `url(${screenshot_data})`;
}

function log_beat() {
    //changing lyrics
    if (word_num >= wordcount) {
        console.log("changing lyrics");
        word_num = 0;
        lyrics_index++;
        change_lyrics();
    } else if (beat_passed) {
        beat_passed = false;
        word_num++;
        console.log("wordnum", word_num);

        setTimeout(() => (beat_passed = true), beat_time);
    }
}

function change_lyrics() {
    const lyrics_span = document.querySelector(".span_lyrics");
    lyrics = document.querySelector(".lyrics");
    console.log(lyrics);

    if (lyrics_index > lyrics_texts.length - 1) lyrics_index = 0;
    lyrics.innerHTML = lyrics_texts[lyrics_index];

    lyrics.innerHTML = lyrics.textContent.replace(
        /\b\w+\b/g,
        "<span class='word' >$&</span>"
    );

    words = document.querySelectorAll(".word");
    wordcount = words.length;
    console.log("wordcount", wordcount);

    lyrics_span.dataset.text = lyrics_texts[lyrics_index];

    bouncing();
}

change_lyrics();
function bouncing() {
    const words = document.querySelectorAll(".word");
    const word_positions = [];
    if (!words) return;

    const time = 0.5;

    words.forEach(function (word) {
        const rect = word.getBoundingClientRect();
        const top = rect.top - rect.height / 2;
        const left = rect.left + rect.width / 2;

        word_positions.push({
            top: top,
            left: left,
        });
    });

    bounce_animation(word_positions);
}

//??Figure out animations
function bounce_animation(word_pos) {
    const arr = word_pos;
    let ind = 0;
    const animate = () => {
        if (arr.length <= 0) return;
        bb.style.top = arr[ind].top + "px";

        bb.style.left = arr[ind].left + "px";
        arr.shift();
        // console.log("animating");
        // requestAnimationFrame(animate);
        setTimeout(() => animate(), 500);
    };
    animate();
}

// Create Facemesh
const faceMesh = new FaceMesh({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
});

// Options
faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
});

// Event Listener
// faceMesh.onResults(onResults);

// Create Camera
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await faceMesh.send({ image: videoElement });
    },
    //These width and height are the dimensions of the original canvas, that then gets stretched to 100vw and 100vh to cover the whole screen in the css stylesheet
    width: 1280,
    height: 720,
});

// Start Cam
camera.start();

// ===============================
//General / reusable functions
// https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
function map(in_val, in_min, in_max, out_min, out_max) {
    return (
        ((in_val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

// function lerp(start, end, time) {
//     return start * (1 - time) + end * time;
// }

// const round = (val) => Math.ceil(val / 20) * 20;

function word_count(str) {
    return str.split(" ").length;
}

function remove_black_screen() {
    document.querySelector(".black_screen").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".black_screen").style.display = "none";
    }, 500);
}

function start_song() {
    audio.play();
    mv.play();
}

function clear_canvas() {
    mouthCanvasCtx.clearRect(
        0,
        0,
        mouthCanvasElement.width,
        mouthCanvasElement.height
    );
}

//making stars
function createStars() {
    const starTargetSize = 75;
    const starMinSize = 15;
    const starChance = 0.1;
    const scrollWidth = document.scrollingElement.scrollWidth;
    const scrollHeight = document.scrollingElement.scrollHeight;
    const rows = Math.round(scrollHeight / starTargetSize);
    const columns = Math.round(scrollWidth / starTargetSize);
    const w = Math.floor(scrollWidth / columns);
    const h = scrollHeight / rows;

    const fragment = document.createDocumentFragment();

    for (let y = 0; y < rows; ++y) {
        for (let x = 0; x < columns; ++x) {
            if (Math.random() < starChance) {
                const size =
                    starMinSize +
                    Math.random() * (starTargetSize - starMinSize);
                fragment.appendChild(getStar(x, y, w, h, size));
            }
        }
    }

    document.body.appendChild(fragment);
}

createStars();
function getStar(x, y, w, h, size) {
    const star = document.createElement("div");
    star.className = `background-star background-star-${Math.ceil(
        Math.random() * 3
    )}`;
    star.style.left = `${Math.floor(x * w)}px`;
    star.style.top = `${Math.floor(y * h)}px`;
    star.style.width = Math.floor(size) + "px";
    star.style.height = Math.floor(size) + "px";
    return star;
}
