const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

// Import Sequelize instance from models
const db = require('./models');

// Routes
const genreRouter = require("./routes/genreRouter.js");
const bookRouter = require("./routes/bookRouter.js");
const chapterRouter = require("./routes/chapterRouter.js");


app.get('/health', (req, res) => {
  res.json({ status: 'server is ok' });
});

app.use("/genres", genreRouter);
app.use("/books", bookRouter);
app.use("/", chapterRouter);

db.sequelize.authenticate()
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.error("❌ DB error", err));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
