// routes/currencyRoutes.js

const express = require('express');
const { convertCurrency } = require('../controller/convertCurrencyControlle');
const currencyRouter = express.Router();
;

currencyRouter.get('/convert', convertCurrency);

module.exports = currencyRouter;
