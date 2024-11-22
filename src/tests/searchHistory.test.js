const { getHistory } = require('../microservices/searchHistory/handler');

test('should retrieve search history', async () => {
  const result = await getHistory();
  
  expect(result.statusCode).toBe(200);
  expect(result.body).toContain('cryptoName');
});
