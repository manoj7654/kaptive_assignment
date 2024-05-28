// routes/currencyRoutes.js

const express = require('express');
const { convertCurrencyController } = require('../controller/convertCurrencyControlle');
const currencyRouter = express.Router();
;

currencyRouter.get('/convert', convertCurrencyController);

module.exports = currencyRouter;
