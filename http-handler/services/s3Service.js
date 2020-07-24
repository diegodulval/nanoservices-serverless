const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({
  region: "us-east-1",
});

const S3 = new AWS.S3();
const BUCKET = "dd-nanoservices-images";

const upload = (body) => {
  const id = uuidv4() + ".jpg";
  return new Promise((res, rej) => {
    S3.putObject(
      {
        Bucket: BUCKET,
        Key: id,
        Body: new Buffer(
          body.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        ),
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
      },
      (err) => {
        if (err) {
          console.log(":..... Error on put file to S3 ......:");
          return rej(err);
        }
        console.log(":..... Success on put file to S3 ......:");
        return res({
          bucket: BUCKET,
          key: id,
        });
      }
    );
  });
};

module.exports = {
  upload: upload,
};
