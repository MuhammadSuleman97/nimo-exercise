const AWS = require('aws-sdk');

const isLocal = process.env.AWS_SAM_LOCAL;
AWS.config.update({
  region: 'us-east-1',
  ...(isLocal && { endpoint: 'http://127.0.0.1:8000' }),
});

const dynamoDB = new AWS.DynamoDB;

module.exports = { dynamoDB };
