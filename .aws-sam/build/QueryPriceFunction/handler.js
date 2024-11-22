const { getCryptoPrice } = require('../../services/priceService');
const { sendEmail } = require('../../services/emailService');
const logger = require('../../common/logger');
const { AWS_DYNAMODB_TABLE } = require('../../common/config');
const { dynamoDB } = require('../../common/dbConnection');
const { v4: uuidv4 } = require('uuid');

module.exports.queryPrice = async (event) => {

  console.log("Inside queryPrice");
  const { cryptoName, userEmail } = JSON.parse(event.body);
  const price = await getCryptoPrice(cryptoName);
  console.log("price is ", price);

  
  if (!price) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Crypto not found or error fetching price.' }),
    };
  }

  const historyId = uuidv4();
  const timestamp = new Date().toISOString();
  const item = {
    id: { S: historyId },
    cryptoName: { S: cryptoName },
    userEmail: { S: userEmail },
    price: { N: price.toString() },
  };

  console.log("item is ", item);

  try {
    // Save the search history to DynamoDB
    try{
    await dynamoDB.putItem({
      TableName: AWS_DYNAMODB_TABLE,
      Item: item,
    }).promise();
  }catch(e){
    console.log("Error is ", e);
  }

    await sendEmail(userEmail, 'Crypto Price', `The current price of ${cryptoName} is $${price}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Price for ${cryptoName}: $${price}`, historyId }),
    };
  } catch (error) {
    logger.error('Error handling request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
