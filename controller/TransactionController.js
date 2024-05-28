const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const addTransaction=async(req,res)=>{
    const { amount, type, categoryId } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        categoryId,
        userId: req.userId,
      },
    });
    res.status(201).send(transaction);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

const allTransaction=async(req,res)=>{
    try {
        const transactions = await prisma.transaction.findMany({
          where: { userId: req.userId },
          include: { category: true },
        });
        res.send(transactions);
      } catch (err) {
        res.status(400).send(err);
      }
}

const updateTransaction=async(req,res)=>{
    const { id } = req.params;
    const { amount, type, categoryId } = req.body;
    const userId = req.userId;

    try {
      const transaction = await prisma.transaction.updateMany({
        where: { id: id, userId },
        data: { amount, type, categoryId },
      });

      if (transaction.count === 0) {
        return res
          .status(404)
          .json({ error: "Transaction not found " });
      }

      res.json({ message: "Transaction updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update transaction" });
    }
}


const deleteTransaction=async(req,res)=>{
    const { id } = req.params;
    const userId = req.userId;

    try {
      const transaction = await prisma.transaction.deleteMany({
        where: { id: id, userId },
      });

      if (transaction.count === 0) {
        return res
          .status(404)
          .json({ error: "Transaction not found " });
      }

      res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete transaction" });
    }
}

module.exports={addTransaction,allTransaction,updateTransaction,deleteTransaction}