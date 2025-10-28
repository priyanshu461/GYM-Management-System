const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, roleId: user.roleId },
      "7c892230e8994de8b59b604e",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    roleId: "69005789c00a5b9674dc6cfe", // Assuming a default role, adjust as needed
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, roleId: newUser.roleId, name: newUser.name, email: newUser.email },
    "7c892230e8994de8b59b604e",
    { expiresIn: "1h" }
  );

  return res.status(200).json({ token, user: newUser }); ;
};

module.exports = { login, signup };
