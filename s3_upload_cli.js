require('dotenv').config()
var fs = require('fs');
const AWS = require ('aws-sdk')
// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
// const fileName = process.argv[2]
console.log('this is S3=============', s3)

// const readFilePromise = function (path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, function (err, data) {
//             if (err) reject(err)
//             resolve(data)
//         })
//     })
// }
const uploadParams = {Bucket: 'seir6-6-project3', Key: '', Body: ''}

const file = process.argv[2];
// readFilePromise(fileName)
//     .then(data => {
//         uploadParams.Body = data
//         return s3.upload(uploadParams).promise()
//         }) 
//     .then(console.log)
//     .catch(console.error)




/////////////////////////////////////////////

// call S3 to retrieve upload file to specified bucket
;


// Configure the file stream and obtain the upload parameters

var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});




