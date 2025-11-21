require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const checksRouter = require('./routes/checks');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/checks', checksRouter);

// health
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
