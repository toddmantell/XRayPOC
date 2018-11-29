// var AWSXRay = require('aws-xray-sdk');
const dynamoose = require('dynamoose');

// dynamoose.AWS = AWSXRay.captureAWS(require('aws-sdk'));

dynamoose.AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1'
});
