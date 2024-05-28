const express=require("express");
const { addCategory, getCategory, updateCategory, deleteCategory } = require("../controller/categoryController");
const { authenticate } = require("../middleware/authenticate");

const categoryRouter=express.Router();


categoryRouter.post("/add",authenticate,addCategory)

categoryRouter.get("/all",authenticate,getCategory)

categoryRouter.put("/edit/:id",authenticate,updateCategory)

categoryRouter.delete("/remove/:id",authenticate,deleteCategory)
module.exports={categoryRouter}