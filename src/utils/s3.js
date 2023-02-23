import AWS from 'aws-sdk';
import fs from 'fs';

async function uploadToS3 (options) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    bucket: process.env.AWS_BUCKET_NAME,
  }); 

  const fileStream = fs.createReadStream(options.path)

  let params = {};

    params = {
      Bucket: 'trinwoodart',
      Key: `masterwork/${ options.filename}`,
      Body:  fileStream,
      ACL: 'public-read'
};
 
  return s3.upload(params).promise();
};

export default uploadToS3;
