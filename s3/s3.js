const aws = require('aws-sdk');
const s3 = new aws.S3({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });
const bucket = process.env.S3_BUCKET;

const upload = async (fileName, stream, progressCallback) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: stream,
    };

    const request = s3.putObject(params);
    request.on('httpUploadProgress', (progress) => progressCallback(progress.loaded, progress.total));

    const promise = new Promise((resolve, reject) => {
        request.on('success', response => { resolve(response.request.params.Key) });
        request.on('error', response => reject(response.error));
        request.send();
    });
    
    return promise;
};

module.exports = { upload };
