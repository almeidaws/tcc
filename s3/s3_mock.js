const upload = async (fileS3Key, fileBuffer, callback) => { callback(1, 1); };
const deleteObject = async fileS3Key => { };
const fileURLForKey = async (fileS3Key) => "Mocked up";

module.exports = { upload, deleteObject, fileURLForKey };
