const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(err);
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).send("Email or password is wrong");
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      res.status(400).send("Invalid password");
    }
 
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.status(200).json({ msg: "login successful", token });
  } catch (error) {}
};

module.exports={register,login}