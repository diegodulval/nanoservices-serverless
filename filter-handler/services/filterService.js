const jimp = require("jimp");

const s3Service = require("./s3Service");

const filter_black_and_white = async (event) => {
  const s3Info = JSON.parse(event.Records[0].Sns.Message);
  const s3DataInfo = s3Info.Records[0].s3;
  const bucket = s3DataInfo.bucket.name;
  const key = s3DataInfo.object.key;

  const s3Object = await s3Service.getObject(bucket, key);
  const image = await jimp.read(s3Object);
  const buffer = await image
    .grayscale()
    .quality(80)
    .getBufferAsync(jimp.MIME_JPEG);
  await s3Service.putObject(buffer, key);
};

module.exports = {
  filter_black_and_white: filter_black_and_white,
};
