const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

//routes
const genreRouter = require("./routes/genreRouter.js");
const bookRouter = require("./routes/bookRouter.js");
const chapterRouter = require("./routes/chapterRouter.js");


app.use("/genres", genreRouter);
app.use("/books", bookRouter);
app.use("/", chapterRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
