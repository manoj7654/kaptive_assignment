const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const monthlyTranscation=async(req,res)=>{
    const { month, year } = req.query;

    try {
        if (!month || !year) {
            return res.status(400).send('Month and year are required');
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: req.userId,
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            include: { category: true },
        });
        console.log(transactions)

        const report = transactions.reduce(
            (acc, ele) => {
                acc.total += ele.amount;
                acc.categories[ele.category.name] = (acc.categories[ele.category.name] || 0) + ele.amount;
               console.log(ele.category.name)
                return acc;
            },
            { total: 0, categories: {} }
        );
        console.log(report)

        res.send(report);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

const getReportCategoryWise=async(req,res)=>{
    const userId = req.userId;

  
    try {
      const transactions = await prisma.transaction.findMany({
        where: { userId },
        include: { category: true },
      });
  
      const categoryReport = transactions.reduce((acc, ele) => {
        const categoryName = ele.category.name;
        const type = ele.type;
  
        if (!acc[categoryName]) {
          acc[categoryName] = { income: 0, expense: 0 };
        }
  
        if (type === "income") {
          acc[categoryName].income += ele.amount;
        } else if (type === "expense") {
          acc[categoryName].expense += ele.amount;
        }
  
        return acc;
      }, {});
  
      res.json(categoryReport);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
}

module.exports={getReportCategoryWise,monthlyTranscation}