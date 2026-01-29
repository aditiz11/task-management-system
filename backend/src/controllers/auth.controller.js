import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log(`[AUTH][ERROR] Registration failed: Missing fields`);
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log(`[AUTH][ERROR] Registration failed: Email already registered (${email})`);
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? "ADMIN" : "USER";

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    console.log(`[AUTH][REGISTER] User Registered: { id: ${user.id}, name: "${user.name}", email: "${user.email}", role: "${user.role}" }`);
    
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(`[AUTH][ERROR] Registration failed: ${err.message}`);
    res.status(500).json({ message: err.message || "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log(`[AUTH][ERROR] Login failed: Missing email or password`);
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log(`[AUTH][ERROR] Login failed: Invalid credentials (${email})`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log(`[AUTH][ERROR] Login failed: Invalid credentials (${email})`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log(`[AUTH][LOGIN] User Logged In: ${user.email}, Role: ${user.role}`);
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error(`[AUTH][ERROR] Login failed: ${err.message}`);
    res.status(500).json({ message: err.message || "Login failed" });
  }
};
