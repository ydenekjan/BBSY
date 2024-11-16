import { User } from "../../../models/index.js";
import { createToken, maxAge } from "../../../helpers/authHelper.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const isProd = process.env.NODE_ENV === "production";

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", errors: err });
  }
};
