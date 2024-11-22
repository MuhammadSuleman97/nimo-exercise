const axios = require('axios');

const getCryptoPrice = async (cryptoName) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`, {
      headers: {
        'Content-Type': 'application/json',
        'x-cg-pro-api-key': process.env.COINGECKO_API_KEY,
      },

    });
    return response.data[cryptoName]?.usd || null;
  } catch (error) {
    console.error(`Error fetching price for ${cryptoName}:`, error);
    return null;
  }
};

module.exports = { getCryptoPrice };
