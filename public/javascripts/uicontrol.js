
const updateTempoCount = () => {
    let tempoCounter = document.getElementById('tempoCounter');
    let tempoSlider = document.getElementById('tempoSlider');

    // set tempo
    tempoCounter.innerText = tempoSlider.value;
};
