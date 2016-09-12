class BufferLoader {
    constructor(context, soundSourceObjects, callback) {
        this.context = context;
        this.soundSourceObjects = soundSourceObjects;
        this.onload = callback;
        this.loadCount = 0;
    }

    loadBuffer(soundSource) {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        request.open('GET', soundSource.url, true);
        request.responseType = 'arraybuffer';

        var loader = this;

        request.onload = function() {
            // Asynchronously decode the audio file data in request.response
            loader.context.decodeAudioData(
                request.response,
                function(buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + soundSource.url);
                        return;
                    }
                    soundSource.setBuffer(buffer);

                    // when loaded all sources
                    if (++loader.loadCount == loader.soundSourceObjects.length) {
                        // kick the callback
                        loader.onload(loader.soundSourceObjects);
                    }
                },
                function(error) {
                    alert('decodeAudioData error', error);
                }
            );
        };

        request.onerror = function() {
            alert('BufferLoader: XHR error');
        };

        request.send();
    }

    load() {
        for (var i = 0; i < this.soundSourceObjects.length; ++i)
            this.loadBuffer(this.soundSourceObjects[i], i);
    }
}
