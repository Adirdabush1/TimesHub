"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
});
const User = mongoose_1.default.model('User', UserSchema);
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/TimesHubUsers')
    .then(() => {
    console.log("Connected to MongoDB!");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB", error);
});
app.post('/auth/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            name,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error during registration', error });
    }
});
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map