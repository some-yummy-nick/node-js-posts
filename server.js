const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const chalk = require('chalk');
require('dotenv').config();

const createPath = require('./helpers/create-path');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const handleError = require('./helpers/handle-error');

const postApiRoutes = require('./routes/api-post-routes');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log(successMsg('Connected to DB')))
    .catch(error => console.error(errorMsg(error)));


app.listen(process.env.PORT, error => {
    error ? console.error(errorMsg(error)) : console.log(successMsg(`listening port ${process.env.PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
});

app.use(postRoutes);

app.use(contactRoutes);

app.use(postApiRoutes);

app.use((req, res) => {
    handleError(res, 'Error Page')
});
