// Stephen Wagner
// (c) 2017

const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const program = require('commander')
const colors = require('colors')
const s3 = new AWS.S3()

AWS.config.update({
  region: (argv.r || argv.region || 'us-east-1')
  // credentials: {YOUR_CREDENTIALS}
})

program
  .version('v0.0.1 Alpha')
  .option('-b, --bucket', 'Enter S3 bucket location (e.g. bucket/folder)')
  .option('-f, --file', 'Enter file name (dn) or path (up) (e.g. filename.ext)')
  .option('-r, --region', '(optional) Enter S3 region (default of us-east-1)')
  .option('-u, --upload', 'Flag to upload file')
  .option('-d, --download', 'Flag to download file')
  // .option('-o, --output', 'Enter filename of downloaded file')
  .parse(process.argv)

function txtColor (txt) {
  return colors.yellow(txt)
}

// Error Messaging - exit if error found
if (!program.bucket || !program.file || (!program.upload && !program.download)) {
  console.error(txtColor('\nERROR: Arguments are missing. Ensure your command includes:'))
  program.outputHelp(txtColor)
  process.exit(1)
}

const s3Bucket = (argv.b || argv.bucket)
const fileName = (argv.f || argv.file)
const fileData = (program.upload ? fs.readFileSync(fileName) : '')

// Steps for uploading a file to S3
const uploadFile = (s3Bucket, fileName, fileData) => {
  const uploadParams = {
    Bucket: s3Bucket, // e.g. bucket/folder
    Key: fileName,  // e.g. filename.ext
    Body: fileData
  }

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log('\nERROR:\n' + err.message) // an error occurred
    } else {
      console.log('')
      console.log(data) // successful response
    }
  })
}

// Steps for downloading a file from S3
const downloadFile = function (s3Bucket, fileName) {
  return new Promise((resolve, reject) => {
    const getParams = {
      Bucket: s3Bucket, // e.g. bucket/folder
      Key: fileName  // e.g. filename.ext
    }

    s3.getObject(getParams, function (err, data) {
      if (err) {
        reject(console.log(err, err.stack)) // an error occurred
      } else {
        resolve(data)
      }
    })
  })
}

// Run function to upload or download file based on -u/--upload flag
program.upload ? uploadFile(s3Bucket, fileName, fileData) : downloadFile(s3Bucket, fileName).then((data) => { fs.writeFileSync(fileName, data.Body) })

