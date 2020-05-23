import ffmpeg = require('ffmpeg');

const videoPath = './uploads'
const tumbnailPath = videoPath + '/thumbnails'
const createThumbnail = (fileName:string) => {
    try {
		const process = new ffmpeg(videoPath + '/' + fileName);
		process.then(video => {
			video.fnExtractFrameToJPG(tumbnailPath, {
                start_time: 10,
				frame_rate : 1,
				number : 1,
				file_name : fileName + '_thumb'
			}, (error, files) => {
				if (!error)
					console.log('created thumbnail: ' + files);
			});
		}, (err) => {
			console.log('Error: ' + err);
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}
};

export {createThumbnail as createThumbnail};