import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  const SECRET_KEY = process.env.SECRET_KEY;
  try {
    await mongoose.connect(
      `mongodb+srv://root:${SECRET_KEY}@db.l5lpk.mongodb.net/shoppingListDB?retryWrites=true&w=majority&appName=DB`,
    );
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
