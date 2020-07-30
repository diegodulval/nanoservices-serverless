"use strict";

const rekognitionService = require("./services/rekognitionService");
const sqsService = require("./services/sqsService");

module.exports.tag = async (event) => {
  const s3Info = JSON.parse(event.Records[0].Sns.Message);
  const s3DataInfo = s3Info.Records[0].s3;
  const bucket = s3DataInfo.bucket.name;
  const key = s3DataInfo.object.key;
  const labels = await rekognitionService.detectLabels(bucket, key);
  const item = {
    key,
    labels,
    eventType: "TAG_EVENT",
  };
  await sqsService.putMessage(item);
  return {
    message: "Go Serverless v1.0! Your function executed successfully!",
  };
};
