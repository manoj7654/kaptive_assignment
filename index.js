const express = require("express");

// const prisma = new PrismaClient()
require("dotenv").config();
const app = express();
const bodyParser=require("body-parser");
const { userRouter } = require("./routes/userRouter");
const { categoryRouter } = require("./routes/categoryRouter");
const { budgetRouter } = require("./routes/budgetRouter");

const { transcationRouter } = require("./routes/transactionRouter");
const { reportRouter } = require("./routes/reportRouter");
const currencyRouter = require("./routes/convertCurrencyRouter");

app.use(express.json());
app.use(bodyParser.json())
app.use("/users",userRouter);
app.use("/categories",categoryRouter)
app.use("/budgets",budgetRouter)
app.use("/transactions",transcationRouter)
app.use("/reports",reportRouter)
app.use("/currency",currencyRouter)
app.get("/", (req, res) => {
  res.json("Welcome to This Api Home Page");
});

app.listen(process.env.port, () => {
  console.log(`Server is running on port no ${process.env.port}`);
});