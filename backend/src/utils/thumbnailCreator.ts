import * as child from 'child_process';

const videoPath = './uploads/'
const tumbnailPath = videoPath + 'thumbnails/'
const createThumbnail = (fileName:string) => {
    child.exec('ffmpeg -i ' + videoPath + fileName + ' -ss 00:00:10.000 -vframes 1 ' + tumbnailPath + fileName + '.png');
};

export {createThumbnail as createThumbnail};