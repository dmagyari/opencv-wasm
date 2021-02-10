// modified code from https://docs.opencv.org/master/dc/de6/tutorial_js_nodejs.html

const Jimp = require('jimp');
const { cv } = require('../'); // replace with require('opencv-wasm') in prod

(async () => {
    const jimpSrc = await Jimp.read(__dirname + '/input/image-sample-1.jpg');

    const src = cv.matFromImageData(jimpSrc.bitmap);
    const descriptors = new cv.Mat();
    const kp = new cv.KeyPointVector();
    const sift = new cv.SIFT();
    sift.detectAndCompute(src, new cv.Mat(), kp, descriptors);
    
	const dst = new cv.Mat();
    cv.drawKeypoints(src, kp, dst, cv.DrawMatchesFlags_DRAW_RICH_KEYPOINTS);

    console.log('aaa')

    new Jimp({
        width: dst.cols,
        height: dst.rows,
        data: Buffer.from(dst.data)
    })
        .write(__dirname + '/test-output/image-sample-1.jpg');
})();