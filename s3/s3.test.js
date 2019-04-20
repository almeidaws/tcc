const { upload, getBuffer, deleteObject } = require('./s3.js');

const fileName = 'TestFile';
const buffer = Buffer.from('My Super Awsome Buffer');

describe('Testing Amazon S3', async () => {
    it('Checks if buffers are uploaded', async () => {
        expect.assertions(1);  

        await upload(fileName, buffer, (uploadedBytes, totalBytes) => {
            const progress = uploadedBytes / totalBytes * 100;
            if (progress === 100)
                expect(progress).toBe(100);
        });
    });

    it('Checks if object are read', async () => {
        const downloadedBuffer = await getBuffer(fileName);
        expect(downloadedBuffer).toEqual(buffer);
    });

    it('Checks if object are deleted', async () => {
        await deleteObject(fileName);
    });
});
