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

app.use("/genres", genreRouter);
app.use("/books", bookRouter);
app.use("/", chapterRouter);

// Sync DB and start server
db.sequelize.sync({ force: true })  // alter: true updates tables without dropping
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });
