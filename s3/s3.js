if (!process.env.NODE_ENV) throw new Error('You must set the NODE_ENV environment variable');
if (!process.env.AWS_ACCESS_KEY) throw new Error('You must set the AWS_ACCESS_KEY environment variable');
if (!process.env.AWS_ACCESS_KEY) throw new Error('You must set the AWS_ACCESS_KEY environment variable');
if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error('You must set the AWS_SECRET_ACCESS_KEY environment variable');
if (!process.env.S3_BUCKET_PROD && !process.env.S3_BUCKET_TEST && !process.env.S3_BUCKET_DEV) 
    throw new Error('You must set the S3_BUCKET_PROD, S3_BUCKET_TEST or S3_BUCKET_DEV environment variable');

const aws = require('aws-sdk');
const { Readable } = require('stream');
const s3 = new aws.S3({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });
const testing = process.env.NODE_ENV === 'test';
const production = process.env.NODE_ENV === 'production';
const bucket = production ? process.env.S3_BUCKET_PROD : (testing ? process.env.S3_BUCKET_TEST : process.env.S3_BUCKET_DEV);

/**
 * Stores a file on Amazon S3 and returns the key that can be used to retrieve it.
 *
 * This method returns a promise, so you can used the async/await of Promise notation
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
const upload = (fileName, buffer, progressCallback) => {
    const params = {
        Bucket: bucket,
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
 * This method returns a promise, so you can used the async/await of Promise notation
 * to call this. This calls a callback to report downloading progress.
 *
 * @param {Function} a callback called to report downloading progress. The arguments of this
 * callback are two. The first 'loaded' of type Number tells how much
 * of the file was uploaded in bytes. The second 'total' of type Number tells the total 
 * file size also in bytes. You can divide the first by the second and multiply by 100 to
 * get the value as percentage.
 */
const getBuffer = (fileName, progressCallback) => {
    const params = {
        Bucket: bucket,
        Key: fileName,
    };

    const request = s3.getObject(params);
    if (progressCallback)
        request.on('httpDownloadProgress', (progress) => progressCallback(progress.loaded, progress.total));

    const promise = new Promise((resolve, reject) => {
        request.on('success', response => { 
            const buffer = response.data.Body;
            resolve(buffer);
        });

        request.on('error', response => reject(response));
        request.send();
    });

    return promise;
};

/**
 * Remove an object from Amazon S3 Storage. If key refers to a inexistent object, nothing occurs.
 *
 * This method returns a promise, so you can used the async/await of Promise notation
 * to call this. 
 *
 * @param {string} object's key. This normally is the S3 Key property is Music type.
 */
const deleteObject = key => {
     const params = {
         Bucket: bucket,
         Key: key,
     };
 
     const request = s3.deleteObject(params);
 
     const promise = new Promise((resolve, reject) => {
         request.on('success', response => resolve());
         request.on('error', response => reject(response));
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

module.exports = { upload, getBuffer, deleteObject, fileURLForKey };
