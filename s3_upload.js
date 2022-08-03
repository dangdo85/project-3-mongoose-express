require('dotenv').config()
//var fs = require('fs');
const AWS = require ('aws-sdk')
// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'})

// Read the file elsewhere, accept it here
module.exports = function (file) {

const uploadParams = {
    Bucket: 'seir6-6-project3', 
    Key: file.originalname, 
    Body: file.buffer
}

return s3.upload(uploadParams).promise()
}

