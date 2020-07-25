"use strict";

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

const rekognition = new AWS.Rekognition();

module.exports.tag = async (event) => {
  const s3Info = JSON.parse(event.Records[0].Sns.Message);
  const s3DataInfo = s3Info.Records[0].s3;
  const bucket = s3DataInfo.bucket.name;
  const key = s3DataInfo.object.key;
  const labels = await new Promise((res, rej) => {
    rekognition.detectLabels(
      {
        Image: {
          S3Object: {
            Bucket: bucket,
            Name: key,
          },
        },
        MinConfidence: 80,
        MaxLabels: 6,
      },
      (err, data) => {
        if (err) return rej(err);
        return res(data);
      }
    );
  });
  console.log(labels.Labels);
  return {
    message: "Go Serverless v1.0! Your function executed successfully!",
  };
};
