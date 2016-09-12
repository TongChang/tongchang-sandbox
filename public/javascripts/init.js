const addUiEvents = () => {
    document.getElementById('tempoSlider').addEventListener('change', updateTempoCount, false);
    Array.prototype.map.call(document.getElementsByClassName('tap-button'), (element) => {
        element.addEventListener('click', () => {tapElement(element)}, false);
    });
};

const main = () => {
    // add init function when load of DOM
    window.addEventListener('load', addUiEvents, false);
    window.addEventListener('load', initAudioContext, false); 
};

// kick javascript main function
main();
