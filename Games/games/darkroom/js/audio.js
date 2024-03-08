var AudioEngine={FADE_TIME:1,AUDIO_BUFFER_CACHE:{},_audioContext:null,_master:null,_currentBackgroundMusic:null,_currentEventAudio:null,_currentSoundEffectAudio:null,_initialized:!1,init:function(){AudioEngine._initAudioContext(),AudioEngine._initialized=!0},_preloadAudio:function(){for(var n in AudioLibrary)(n.toString().indexOf("MUSIC_")>-1||n.toString().indexOf("EVENT_")>-1)&&AudioEngine.loadAudioFile(AudioLibrary[n])},_initAudioContext:function(){AudioEngine._audioContext=new(window.AudioContext||window.webkitAudioContext),AudioEngine._createMasterChannel()},_createMasterChannel:function(){AudioEngine._master=AudioEngine._audioContext.createGain(),AudioEngine._master.gain.setValueAtTime(1,AudioEngine._audioContext.currentTime),AudioEngine._master.connect(AudioEngine._audioContext.destination)},_getMissingAudioBuffer:function(){for(var n=AudioEngine._audioContext.createBuffer(1,AudioEngine._audioContext.sampleRate,AudioEngine._audioContext.sampleRate),e=n.getChannelData(0),i=0;i<n.length/2;i++)e[i]=Math.sin(.05*i)/4;return n},_playSound:function(n){if(!AudioEngine._currentSoundEffectAudio||AudioEngine._currentSoundEffectAudio.source.buffer!=n){var e=AudioEngine._audioContext.createBufferSource();e.buffer=n,e.onended=function(e){AudioEngine._currentSoundEffectAudio&&AudioEngine._currentSoundEffectAudio.source.buffer==n&&(AudioEngine._currentSoundEffectAudio=null)},e.connect(AudioEngine._master),e.start(),AudioEngine._currentSoundEffectAudio={source:e}}},_playBackgroundMusic:function(n){var e=AudioEngine._audioContext.createBufferSource();e.buffer=n,e.loop=!0;var i=AudioEngine._audioContext.createGain();i.gain.setValueAtTime(0,AudioEngine._audioContext.currentTime);var u=AudioEngine._audioContext.currentTime+AudioEngine.FADE_TIME;if(AudioEngine._currentBackgroundMusic&&AudioEngine._currentBackgroundMusic.source&&0!==AudioEngine._currentBackgroundMusic.source.playbackState){var o=AudioEngine._currentBackgroundMusic.envelope.gain.value;AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime),AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(o,AudioEngine._audioContext.currentTime),AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(0,u),AudioEngine._currentBackgroundMusic.source.stop(u+.3)}e.connect(i),i.connect(AudioEngine._master),e.start(),i.gain.linearRampToValueAtTime(1,u),AudioEngine._currentBackgroundMusic={source:e,envelope:i}},_playEventMusic:function(n){var e=AudioEngine._audioContext.createBufferSource();e.buffer=n,e.loop=!0;var i=AudioEngine._audioContext.createGain();i.gain.setValueAtTime(0,AudioEngine._audioContext.currentTime);var u=AudioEngine._audioContext.currentTime+2*AudioEngine.FADE_TIME;if(null!=AudioEngine._currentBackgroundMusic){var o=AudioEngine._currentBackgroundMusic.envelope.gain.value;AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime),AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(o,AudioEngine._audioContext.currentTime),AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(.2,u)}e.connect(i),i.connect(AudioEngine._master),e.start(),i.gain.linearRampToValueAtTime(1,u),AudioEngine._currentEventAudio={source:e,envelope:i}},_stopEventMusic:function(){var n=AudioEngine._audioContext.currentTime+2*AudioEngine.FADE_TIME;if(AudioEngine._currentEventAudio&&AudioEngine._currentEventAudio.source&&AudioEngine._currentEventAudio.source.buffer){var e=AudioEngine._currentEventAudio.envelope.gain.value;AudioEngine._currentEventAudio.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime),AudioEngine._currentEventAudio.envelope.gain.setValueAtTime(e,AudioEngine._audioContext.currentTime),AudioEngine._currentEventAudio.envelope.gain.linearRampToValueAtTime(0,n),AudioEngine._currentEventAudio.source.stop(n+1),AudioEngine._currentEventAudio=null}if(AudioEngine._currentBackgroundMusic){var i=AudioEngine._currentBackgroundMusic.envelope.gain.value;AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime),AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(i,AudioEngine._audioContext.currentTime),AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(1,n)}},isAudioContextRunning:function(){return"suspended"!==AudioEngine._audioContext.state},tryResumingAudioContext:function(){"suspended"===AudioEngine._audioContext.state&&AudioEngine._audioContext.resume()},playBackgroundMusic:function(n){AudioEngine._initialized&&AudioEngine.loadAudioFile(n).then((function(n){AudioEngine._playBackgroundMusic(n)}))},playEventMusic:function(n){AudioEngine._initialized&&AudioEngine.loadAudioFile(n).then((function(n){AudioEngine._playEventMusic(n)}))},stopEventMusic:function(){AudioEngine._initialized&&AudioEngine._stopEventMusic()},playSound:function(n){AudioEngine._initialized&&AudioEngine.loadAudioFile(n).then((function(n){AudioEngine._playSound(n)}))},loadAudioFile:function(n){if(-1===n.indexOf("http")&&(n=window.location+n),AudioEngine.AUDIO_BUFFER_CACHE[n])return new Promise((function(e,i){e(AudioEngine.AUDIO_BUFFER_CACHE[n])}));var e=new Request(n);return fetch(e).then((function(n){return n.arrayBuffer()})).then((function(e){if(0===e.byteLength)return console.error("cannot load audio from "+n),AudioEngine._getMissingAudioBuffer();var i=AudioEngine._audioContext.decodeAudioData(e,(function(e){return AudioEngine.AUDIO_BUFFER_CACHE[n]=e,AudioEngine.AUDIO_BUFFER_CACHE[n]}));return i||new Promise((function(e,i){var u=setInterval((function(){AudioEngine.AUDIO_BUFFER_CACHE[n]&&(e(AudioEngine.AUDIO_BUFFER_CACHE[n]),clearInterval(u))}),20)}))}))},setBackgroundMusicVolume:function(n,e){if(null!=AudioEngine._master){void 0===n&&(n=1),void 0===e&&(e=1);var i=AudioEngine._currentBackgroundMusic.envelope.gain.value;AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime),AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(i,AudioEngine._audioContext.currentTime),AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(n,AudioEngine._audioContext.currentTime+e)}},setMasterVolume:function(n,e){if(null!=AudioEngine._master){void 0===n&&(n=1),void 0===e&&(e=1);var i=AudioEngine._master.gain.value;AudioEngine._master.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime),AudioEngine._master.gain.setValueAtTime(i,AudioEngine._audioContext.currentTime),AudioEngine._master.gain.linearRampToValueAtTime(n,AudioEngine._audioContext.currentTime+e)}}};