const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE = "images";

const put = (item) => {
  return new Promise((res, rej) => {
    dynamodb.put(
      {
        TableName: TABLE,
        Item: {
          id: item.key,
          bucket: item.bucket,
        },
      },
      (err, data) => {
        if (err) {
          console.log(":..... Error on put file to DynamoDB ......:");
          return rej(err);
        }
        console.log(":..... Success on put file to DynamoDB ......:");
        return res(data);
      }
    );
  });
};

module.exports = {
  put: put,
};
