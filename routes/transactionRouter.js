const express=require("express");
const { authenticate } = require("../middleware/authenticate");
const { addTransaction, allTransaction, updateTransaction, deleteTransaction } = require("../controller/TransactionController");

const transcationRouter=express.Router();


transcationRouter.post("/add",authenticate,addTransaction)

transcationRouter.get("/all",authenticate,allTransaction)

transcationRouter.put("/edit/:id",authenticate,updateTransaction)

transcationRouter.delete("/remove/:id",authenticate,deleteTransaction)
module.exports={transcationRouter}