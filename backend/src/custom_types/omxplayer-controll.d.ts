declare module 'omxplayer-controll'{

 function addListener(type: any, listener: any): any;

 function emit(type: any, args: any): any;

 function eventNames(): any;

 function getDuration(cb: any): void;

 function getMaxListeners(): any;

 function getMaxRate(cb: any): void;

 function getMinRate(cb: any): void;

 function getPosition(cb: any): void;

 function getSource(cb: any): void;

 function getStatus(cb: any): void;

 function getVolume(cb: any): void;

 function hideSubtitles(cb: any): any;

 function hideVideo(cb: any): any;

 function increaceRate(cb: any): any;

 function listAudio(cb: any): void;

 function listSubtitles(cb: any): void;

 function listenerCount(type: any): any;

 function listeners(type: any): any;

 function nextAudio(cb: any): any;

 function nextSubtitle(cb: any): any;

 function off(type: any, listener: any): any;

 function on(type: any, listener: any): any;

 function once(type: any, listener: any): any;

 function open(path: any, options: any): void;

 function pause(cb: any): any;

 function playPause(cb: any): any;

 function prependListener(type: any, listener: any): any;

 function prependOnceListener(type: any, listener: any): any;

 function previousAudio(cb: any): any;

 function previousSubtitle(cb: any): any;

 function rawListeners(type: any): any;

 function reduceRate(cb: any): any;

 function removeAllListeners(type: any, ...args: any[]): any;

 function removeListener(type: any, listener: any): any;

 function seek(offset: any, cb: any): any;

 function selectAudio(audioStreamId: any, cb: any): any;

 function setAlpha(alpha: any, cb: any): any;

 function setAspectMode(aspect: any, cb: any): any;

 function setMaxListeners(n: any): any;

 function setPosition(pos: any, cb: any): any;

 function setVideoCropPos(x1: any, y1: any, x2: any, y2: any, cb: any): any;

 function setVideoPos(x1: any, y1: any, x2: any, y2: any, cb: any): any;

 function setVolume(vol: any, cb: any): any;

 function showSubtitles(cb: any): any;

 function stop(cb: any): any;

 function toggleSubtitles(cb: any): any;

 function unhideVideo(cb: any): any;

 function volumeDown(cb: any): any;

 function volumeUp(cb: any): any;
}