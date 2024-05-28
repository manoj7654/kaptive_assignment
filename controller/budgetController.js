const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addBudget=async(req,res)=>{
    const { amount, month, year } = req.body;
   const userId=req.userId
  try {
    const budget = await prisma.budget.create({
      data: {
        amount,
        month,
        year,
        userId
      },
    });
    res.status(201).send(budget);
  } catch (err) {
    res.status(400).send(err);
  }
}

const getBudget=async(req,res)=>{
    try {
        const budget = await prisma.budget.findMany();
        res.status(200).json(budget);
      } catch (err) {
        res.status(400).send(err);
      }
}

const updateBudget=async(req,res)=>{
    const { id } = req.params;
  const { amount, year,month } = req.body;
  const userId = req.userId;

  try {
    const budget = await prisma.budget.updateMany({
      where: { id: id, userId },
      data: {
        amount,
        year,
        month
      },
    });

    if (budget.count === 0) {
      return res
        .status(404)
        .json({ error: "Budget not found or not authorized" });
    }

    res.json({ message: "Budget updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

const deleteBudget=async(req,res)=>{
    const { id } = req.params;
  const userId = req.userId;

  try {
    const budget = await prisma.budget.deleteMany({
      where: { id: id, userId },
    });

    if (budget.count === 0) {
      res.status(404).json({ error: "Budget not found " });
    }

    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete budget" });
  }
}

module.exports={addBudget,getBudget,updateBudget,deleteBudget}