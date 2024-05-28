const express=require("express");
const { getReportCategoryWise, monthlyTranscation } = require("../controller/reportController");
const reportRouter=express.Router();




reportRouter.get("/categoryWise",getReportCategoryWise)
reportRouter.get("/monthly",monthlyTranscation)



module.exports={reportRouter}