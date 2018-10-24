require('dotenv').load();
const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION
});
