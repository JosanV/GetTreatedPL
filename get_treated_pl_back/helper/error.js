class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}



const handleError = (err, res) => {
    if (!err.statusCode) {
        err.statusCode = 500
    }
    const { statusCode, message } = err;
    res.status(statusCode).send(err);
};



module.exports = {
    ErrorHandler,
    handleError
}

