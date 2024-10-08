import { User } from "../../../models/index.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).json(err);
  }
};
