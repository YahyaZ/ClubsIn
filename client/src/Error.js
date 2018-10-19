/* Dictionary of Error Messages with associated code */
const Error = {
    USER_NOT_FOUND: 'User does not exist, please sign up to login as a user',
    PASSWORD_MISMATCH: 'Passwords do not match',
    EXISTING_USER: 'User already exists',
    MISSING_FIELDS: 'Please fill out all fields',
    INCORRECT_EMAIL_PASS: 'Incorrect email or password',
    TASK_NOT_FOUND: 'No task found',
    EVENT_NOT_FOUND: 'Event not found',
    CLUB_EXISTS: 'Club already exists',
    USER_IN_CLUB: 'You are already in that club',
    INVALID_LINK: 'Invite Link Invalid',
    NO_ID: 'ID not provided',
    INVALID_ERROR: 'Something has gone wrong. Please try again.',
};

const getErrorMessage = (errorCode) => {
    const message = Error[errorCode];
    if (message) return message;
    return Error.INVALID_ERROR;
}

export default { getErrorMessage };
