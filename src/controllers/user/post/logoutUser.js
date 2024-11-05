import { maxAge } from "../../../helpers/authHelper.js";

export const logoutUser = async (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    });
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default logoutUser;
