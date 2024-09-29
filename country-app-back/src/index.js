const express = require("express");
const cors = require("cors");
const countryRouter = require("./routes/country.router");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", countryRouter);

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
