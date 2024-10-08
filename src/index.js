import app from "./config/index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});
