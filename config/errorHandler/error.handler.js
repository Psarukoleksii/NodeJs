module.exports = class ErrorHandler extends Error{
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
};

// this function finds and warns of an error and indicates where the error was
