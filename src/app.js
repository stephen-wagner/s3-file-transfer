const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const s3 = new AWS.S3()

AWS.config.update({
  region: 'us-east-1'
  // credentials: {YOUR_CREDENTIALS}
})

const s3Bucket = process.argv[2]
const fileName = process.argv[3]
const fileData = fs.readFileSync(fileName)
const uploadParams = {
  Bucket: s3Bucket, /* e.g. bucket/folder */
  Key: fileName,  /* e.g. filename.ext */
  Body: fileData
}

s3.upload(uploadParams, function (err, data) {
  console.log(err, data)
})

// Steps to download files
// const getParams = {
//   Bucket: process.argv[2], /* e.g. bucket/folder */
//   Key: process.argv[3] /* e.g. filename.ext */
// }

// const downloadFile = s3.getObject(getParams, function (err, data) {
//   if (err) {
//   	console.log(err, err.stack) // an error occurred
//   } else {
//   	return data // successful response
//   }
// })

// // writes out the file
// fs.writeFileSync('filename.ext', downloadFile)
