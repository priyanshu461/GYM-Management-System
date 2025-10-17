import User from "../../models/UserModel";


export const login = (req, res) => {
    // Login logic here
    const { email, password } = req.body;

    const user = User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Password verification logic here (e.g., using bcrypt)
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token });
}   

