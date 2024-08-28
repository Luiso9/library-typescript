"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUsernameError = exports.UnableToSaveUserError = void 0;
class UnableToSaveUserError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnableToSaveUserError = UnableToSaveUserError;
class InvalidUsernameError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidUsernameError = InvalidUsernameError;
