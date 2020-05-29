const {Storage} = require('@google-cloud/storage');
const path = require('path')

const GOOGLE_CLOUD_PROJECT_ID = 'fileuploadtest-272502'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = path.join(__dirname, './key.json')

const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});

exports.storage = storage

exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;