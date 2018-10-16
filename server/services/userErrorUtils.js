function createError(message, code){
    const error = new Error(message);
    error.status = code;
    return error;
}

const successMessages = {
    EVENT_UPDATED: 'Event Updated',
}

const errorMessages = {
    USER_NOT_FOUND: 'User does not exist in the dBase, please sign up to login as a user',
    PASSWORD_MISMATCH: 'Passwords do not match',
    EXISTING_USER: 'User Already Exists',
    MISSING_FIELDS: 'Please fill out all fields',
    INCORRECT_EMAIL_PASS: 'Wrong email or password',
    TASK_NOT_FOUND: 'No task found',
    EVENT_NOT_FOUND: 'Event not found',
    CLUB_EXISTS: 'Club already exists',
    USER_IN_CLUB: 'User is already in club',
    INVALID_LINK: 'Invite Link Invalid',
    NO_ID: 'ID not provided'
}

module.exports = {
    createError,
    errorMessages,
    successMessages,

}