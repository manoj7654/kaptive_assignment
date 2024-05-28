const axios = require('axios');
const apiKey="695b50c8460d2f8c18490a02" 

  const convertCurrencyController=async(req,res)=>{
    try {
        const { amount, from, to } = req.query;
        if (!amount || !from || !to) {
          return res.status(400).json({ error: 'Please provide amount, from currency, and to currency' });
        }
    
        const response = await axios.get(`https://v6.exchangeratesapi.io/latest?access_key=${apiKey}&amount=${amount}&from=${from}&to=${to}`);
        const exchangeRate = response.data.rates[to];
        const convertedAmount = amount * exchangeRate;
    
        res.json({ amount, from, to, exchangeRate, convertedAmount });
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        res.status(500).json({ error: 'Failed to fetch exchange rate' });
      }
  }

module.exports = { convertCurrencyController };
