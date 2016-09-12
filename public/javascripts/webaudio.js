/* required BufferLoader */

let context;
let bufferLoader;

let bufferObj = {};

// initialize
// AudioContextを初期化する
const initAudioContext = () => {
    try {
        // create Web Audio Context
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext;
    }
    catch (error) {
        alert(error);
    }
    loadSource();
};

const loadSource = () => {
    // define some music sources url
    bufferLoader = new BufferLoader(
        context,
        [
            new SoundSource('hihat', './sounds/Hi-Hats/Hi-Hat 01.wav'),
            new SoundSource('kick', './sounds/Kick/Kick 01.wav'),
            new SoundSource('snare', './sounds/Snare/Snare 01.wav'),
            new SoundSource('clap', './sounds/Clap/Clap 01.wav'),
            new SoundSource('percussion', './sounds/Percussion/Perc 01.wav'),
            new SoundSource('progression', './sounds/Chord Progressions/Progression 01.wav'),
        ],
        finishedLoading
    );
    // load some music sources
    // and kick callback
    bufferLoader.load();
};

// this is callback
// when load source is finished kicked it by BufferLoader
const finishedLoading = (soundSourceObjects) => {
    // get some loaded sources
    for (let index in soundSourceObjects) {
        bufferObj[soundSourceObjects[index].name] = soundSourceObjects[index].buffer;            
    }
};

const playSound = (buffer, time) => {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
};

const eightBeat = () => {
    // We'll start playing the rhythm 100 milliseconds from "now"
    let startTime = context.currentTime + 0.100;
    let tempo = document.getElementById('tempoSlider').value; // BPM (beats per minute)
    let eighthNoteTime = (60 / tempo) / 2;

    for (var bar = 0; bar < 2; bar++){
        let time = startTime + bar * 8 * eighthNoteTime;

        // Play the kick drum on beats 1, 5
        playSound(bufferObj['kick'], time + 0 * eighthNoteTime);
        playSound(bufferObj['kick'], time + 4 * eighthNoteTime);

        //  Play the snare drum on beats 3, 7
        playSound(bufferObj['snare'], time + 2 * eighthNoteTime);
        playSound(bufferObj['snare'], time + 6 * eighthNoteTime);

        //  Play the hihat on every beats
        playSound(bufferObj['hihat'], time + 0 * eighthNoteTime);
        playSound(bufferObj['hihat'], time + 1 * eighthNoteTime);
        playSound(bufferObj['hihat'], time + 2 * eighthNoteTime);
        playSound(bufferObj['hihat'], time + 3 * eighthNoteTime);
        playSound(bufferObj['hihat'], time + 4 * eighthNoteTime);
        playSound(bufferObj['hihat'], time + 5 * eighthNoteTime);
        playSound(bufferObj['hihat'], time + 6 * eighthNoteTime);
        playSound(bufferObj['hihat'], time + 7 * eighthNoteTime);
    }
};

const tapElement = (element) => {
    playSound(bufferObj[element.name], 0);
};
