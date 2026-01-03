const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/files", require("./routes/filesRoutes"));

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
