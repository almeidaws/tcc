const aws = require('aws-sdk');
const { Readable } = require('stream');
const s3 = new aws.S3({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });
const bucket = process.env.S3_BUCKET;

/**
 * Stores a file on Amazon S3 and returns the key that can be used to retrieve it.
 *
 * This method is asynchronous, so you can used the async/await of Promise notation
 * to call this. This calls a callback to report uploading progress.
 *
 * @param {string} fileName unique file on S3 Storage Service. This name must be unique.
 * If a file with this file name already exists, it will be overrided.
 * @param {Buffer} a buffer with the file.
 * @param {Function} a callback called to report uploading progress. The arguments of this
 * callback are two. The first 'loaded' of type Number tells how much
 * of the file was uploaded in bytes. The second 'total' of type Number tells the total 
 * file size also in bytes. You can divide the first by the second and multiply by 100 to
 * get the value as percentage.
 */
const upload = async (fileName, buffer, progressCallback) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: buffer,
    };

    const request = s3.putObject(params);
    if (progressCallback)
        request.on('httpUploadProgress', (progress) => progressCallback(progress.loaded, progress.total));

    const promise = new Promise((resolve, reject) => {
        request.on('success', response => { resolve(response.request.params.Key) });
        request.on('error', response => { reject(response) });
        request.send();
    });
    
    return promise;
};

/**
 * Retrieve a file from S3 Storage Service using it's key.
 *
 * This method is asynchronous, so you can used the async/await of Promise notation
 * to call this. This calls a callback to report downloading progress.
 *
 * @param {Function} a callback called to report downloading progress. The arguments of this
 * callback are two. The first 'loaded' of type Number tells how much
 * of the file was uploaded in bytes. The second 'total' of type Number tells the total 
 * file size also in bytes. You can divide the first by the second and multiply by 100 to
 * get the value as percentage.
 */
const getStream = (fileName, progressCallback) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
    };

    const request = s3.getObject(params);
    if (progressCallback)
        request.on('httpDownloadProgress', (progress) => progressCallback(progress.loaded, progress.total));

    const promise = new Promise((resolve, reject) => {
        request.on('success', response => { 
            const buffer = response.Body;
            const readable = new Readable();
            readable.push(buffer);
            readable.push(null);
            resolve(readable);
        });

        request.on('error', response => reject(response.error));
        request.send();
    });

    return promise;
};

/**
 * Given some file key, this method returns the public URL
 * as string that can be used to downlaod it.
 */
const fileURLForKey = key => {
    return s3.endpoint.href + bucket + "/" + key;
};

module.exports = { upload, getStream, fileURLForKey };
