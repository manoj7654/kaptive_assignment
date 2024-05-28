const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const addCategory=async(req,res)=>{
    const { name } = req.body;

    try {
      const category = await prisma.category.create({
        data: { name },
      });
      res.status(201).send(category);
    } catch (err) {
      res.status(400).send(err);
    }
}

const getCategory=async(req,res)=>{
    try {
        const categories = await prisma.category.findMany();
        res.send(categories);
      } catch (err) {
        res.status(400).send(err);
      }
}

const updateCategory=async(req,res)=>{
    const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await prisma.category.update({
      where: { id: id },
      data: { name },
    });

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category" });
  }
}

const deleteCategory=async(req,res)=>{
    const  {id}  = req.params;

  try {
    await prisma.category.delete({
      where: { id: id },
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

module.exports={addCategory,getCategory,updateCategory,deleteCategory}