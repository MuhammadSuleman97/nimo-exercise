const AWS = require('aws-sdk');
const { SES_EMAIL } = require('../common/config');
const ses = new AWS.SES();

const sendEmail = async (recipient, subject, body) => {
  const params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: SES_EMAIL,
  };
  try {
    await ses.sendEmail(params).promise();
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

module.exports = { sendEmail };
