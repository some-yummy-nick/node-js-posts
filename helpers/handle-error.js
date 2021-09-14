const createPath = require("../helpers/create-path");

const handleError = (res, error) => {
    console.error(error);
    res.status(404);
    res.render(createPath('error'), {title: 'Error'});
};

module.exports = handleError;