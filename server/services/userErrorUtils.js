function createError(message, code) {
    const error = new Error(message);
    error.status = code;
    return error;
}

const successMessages = {
    EVENT_UPDATED: 'EVENT_UPDATED',
};

const errorMessages = {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    PASSWORD_MISMATCH: 'PASSWORD_MISMATCH',
    EXISTING_USER: 'EXISTING_USER',
    MISSING_FIELDS: 'MISSING_FIELDS',
    INCORRECT_EMAIL_PASS: 'INCORRECT_EMAIL_PASS',
    TASK_NOT_FOUND: 'TASK_NOT_FOUND',
    EVENT_NOT_FOUND: 'EVENT_NOT_FOUND',
    CLUB_EXISTS: 'CLUB_EXISTS',
    USER_IN_CLUB: 'USER_IN_CLUB',
    INVALID_LINK: 'INVALID_LINK',
    NO_ID: 'NO_ID',
};

module.exports = {
    createError,
    errorMessages,
    successMessages,
};
