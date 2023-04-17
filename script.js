// define variables
const videoElement = document.getElementsByClassName("input_video")[0];
const mouthCanvasElement = document.getElementsByClassName("mouth_canvas")[0];
const mouthCanvasCtx = mouthCanvasElement.getContext("2d");
const textbox = document.querySelector(".textbox");
const screenshot = document.querySelector(".screenshot");
const bb = document.querySelector(".bouncing_ball");
const disco = document.querySelector(".disco_ball");

let words = "";
let wordcount = null;
let word_time = 600;
let word_num = 0;

let index = 0;
let time = 0;
let word_index = 0;

let screenshotted = true;

const lyrics_texts = [
    "UAU IAUYAO CUN NAN CAU DAO PEI",
    "UAU HAN TAO CUN BAI CAU DAO HEI",
    "UAU IAUYAO REN MEN DOU KAN DAO UA",
    "DAN BU ZHI DAO UA SHI SHEI",
];

let lyrics_index = 0;

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
    if (audioContext.state == "suspended") {
        console.log("suspended");
    }
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 512;
            source.connect(analyser);
            console.log(source);

            setInterval(() => {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);
                //??Why is average always returning 0? It worked for a bit??
                const average =
                    dataArray.reduce((sum, value) => sum + value) /
                    bufferLength;
                const size = Math.max(average / 6, 1);

                console.log("average is" + average);
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
        // onResults(results);
    });
});
//FACEMESH STUFF
// Results Handler
function onResults(results) {
    //need this if statement, or else video freezes when it can't find the multiFaceLandmarks (e.g. when user has turned their head away from the camera)
    if (results.multiFaceLandmarks && !ended) {
        //??This is logging when my webcam is covered??
        // console.log("sees landmarks");
        //??Is there a way to delay the song and karaoke ball starting for like 3 seconds to give singers prep time?
        if (song_chosen) {
            remove_black_screen();
            start_song();
        }
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

            //Using this right_eye_face_ratio to return the ratio as a percentage (percentage of face that eye takes up) rather than absolute values, and therefore right_eye_face_ratio won't change with the user's distance from the webcam
            let face_bottom_y = results.multiFaceLandmarks[0][152].y;
            let face_top_y = results.multiFaceLandmarks[0][10].y;

            mouthCanvasCtx.restore();
        }
    }
}

function bounce_ball(screenshot_data) {
    bb.style.backgroundImage = `url(${screenshot_data})`;
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
    console.log(wordcount);
    // line_time = wordcount * word_time;

    //??Why does the screenshotting not replace words when this works?
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

function log_beat() {
    //changing lyrics
    if (word_num >= wordcount) {
        word_num = 0;
        lyrics_index++;
        change_lyrics();
    } else if (screenshotted) {
        screenshotted = false;
        word_num++;

        setTimeout(() => (screenshotted = true), word_time);
    }
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
faceMesh.onResults(onResults);

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

function remove_black_screen() {
    document.querySelector(".black_screen").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".black_screen").style.display = "none";
    }, 500);
}

function start_song() {
    document.querySelector("audio").play();
}

function clear_canvas() {
    mouthCanvasCtx.clearRect(
        0,
        0,
        mouthCanvasElement.width,
        mouthCanvasElement.height
    );
}
