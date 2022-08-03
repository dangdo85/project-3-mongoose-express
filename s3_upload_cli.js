require('dotenv').config()
const AWS = require ('aws-sdk')

const s3 = new AWS.S3({apiVersion: '2006-03-01'})
console.log(s3)

const uploadParams = {
    Bucket: 'seir6-6-project3', 
    key: 'filename.txt', 
    body: 'Hello World'
}

const file = 'filename.txt'
const fs = require('fs');

const fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
    console.log('File Error', err);
  });
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

s3.upload(uploadParams, function (err, data) {
    console.log('error', err, 'data', data)
}) 