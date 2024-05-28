const express=require("express");
const { addBudget, getBudget, updateBudget, deleteBudget } = require("../controller/budgetController");
const { authenticate } = require("../middleware/authenticate");
const budgetRouter=express.Router();



budgetRouter.post("/add",authenticate,addBudget)
budgetRouter.get("/all",authenticate,getBudget)
budgetRouter.put("/edit/:id",authenticate,updateBudget)
budgetRouter.delete("/remove/:id",authenticate,deleteBudget)

module.exports={budgetRouter}