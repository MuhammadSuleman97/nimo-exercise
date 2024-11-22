const { dynamoDB } = require('../microservices/searchHistory/utils/dbConnection');

test('should connect to DynamoDB locally', async () => {
  const params = {
    TableName: 'CryptoSearchHistory',
    Item: { id: '1', cryptoName: 'bitcoin', price: 45000, timestamp: '2024-01-01' },
  };
  
  const result = await dynamoDB.put(params).promise();
  expect(result).toHaveProperty('ConsumedCapacity');
});
