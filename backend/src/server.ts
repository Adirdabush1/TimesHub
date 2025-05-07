import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';

// יצירת מודל למשתמש
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
});

const User = mongoose.model('User', UserSchema);

const app = express();
const port = 3000;
app.use(cors({
  origin: 'http://localhost:5173',  // הדומיין של ה-frontend
  methods: ['GET', 'POST'],  // שמור את השיטות המורשות
  allowedHeaders: ['Content-Type'],  // שמור את הכותרות המורשות
}));
// הגדרת ה-Express להשתמש ב-JSON
app.use(express.json());

// חיבור למסד נתונים MongoDB
mongoose.connect('mongodb://localhost:27017/TimesHubUsers')
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// רישום משתמש
app.post('/auth/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    // הצפנה של הסיסמא
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    // שמירה במסד הנתונים
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error during registration', error });
  }
});

// התחברות למערכת
app.post('/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // חיפוש המשתמש לפי האימייל
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // השוואת הסיסמאות
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
