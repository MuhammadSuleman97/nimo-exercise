const { queryPrice } = require('../microservices/cryptoPrice/handler');
const { dynamoDB } = require('../common/dbConnection');

test('should fetch and send crypto price successfully', async () => {
  const event = {
    body: JSON.stringify({
      cryptoName: 'bitcoin',
      userEmail: 'user@example.com',
    }),
  };
  
  const result = await queryPrice(event);
  
  expect(result.statusCode).toBe(200);
  expect(result.body).toContain('Price for bitcoin');
});
