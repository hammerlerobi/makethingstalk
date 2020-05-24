import * as child from 'child_process';

const videoPath = './uploads/'
const tumbnailPath = videoPath + 'thumbnails/'

const createThumbnail = (fileName:string) => {

    const video = videoPath + fileName;
    const strippedFileName = fileName.split('.')[0];
    const thumbnail = tumbnailPath + strippedFileName + '.png'
    const command = 'ffmpeg -i ' + video + ' -ss 00:00:03.000 -vframes 1 ' + thumbnail;

    // create thumbnail directory in case it doesn't exist
    child.exec('mkdir ' + tumbnailPath);
    // execute ffmpeg command
    child.exec(command, (error) => {
        if (error) {
          console.error(`error creating thumbnail: ${error}`);
          return;
        }
        console.log('thumbnail created');
      });

};

export {createThumbnail as createThumbnail};