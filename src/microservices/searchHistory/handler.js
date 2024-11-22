const { dynamoDB } = require('../../common/dbConnection');
const { DYNAMODB_TABLE } = require('../../common/config');

module.exports.getHistory = async () => {
  try {
    const result = await dynamoDB.scan({ TableName: DYNAMODB_TABLE }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error retrieving history:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
