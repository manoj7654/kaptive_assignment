
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.apiKey
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;


async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        console.log(`${BASE_URL}/${fromCurrency}`)
        const response = await axios.get(`${BASE_URL}/${fromCurrency}`);
        const rates = response.data.conversion_rates;
        const rate = rates[toCurrency];
        if (!rate) {
            throw new Error(`Unable to get currency conversion rate for ${toCurrency}`);
        }
        return rate;
    } catch (error) {
        throw new Error(`Error fetching exchange rates: ${error.message}`);
    }
}

async function convertCurrency(req, res) {
    const { from, to, amount } = req.query;
    if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Please provide from, to, and amount ' });
    }

    try {
        const rate = await getExchangeRate(from,to)
        console.log(rate)
        const convertedAmount = amount * rate;
        res.json({ from, to, amount, convertedAmount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    convertCurrency,
};
