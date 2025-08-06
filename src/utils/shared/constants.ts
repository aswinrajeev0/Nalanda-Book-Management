export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,

    UNPROCESSABLE_ENTITY: 422,

    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};

export const ERROR_MESSAGES = {
    // Auth
    USER_ALREADY_EXISTS: "User with this email already exists.",
    USER_NOT_FOUND: "User not found.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    UNAUTHORIZED: "Unauthorized access.",
    TOKEN_EXPIRED: "Token has expired.",
    TOKEN_INVALID: "Invalid token.",

    // Validation
    VALIDATION_FAILED: "Validation failed. Please check your input.",

    // General
    INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",
    RESOURCE_NOT_FOUND: "Requested resource not found.",
    FORBIDDEN: "You do not have permission to access this resource.",
    BAD_REQUEST: "Bad request. Please check the input.",
}

export const SUCCESS_MESSAGES = {
    // Auth
    USER_REGISTERED: "User registered successfully.",
    USER_LOGGED_IN: "User logged in successfully.",
    USER_LOGGED_OUT: "User logged out successfully.",

    // General CRUD
    RESOURCE_CREATED: "Resource created successfully.",
    RESOURCE_FETCHED: "Resource fetched successfully.",
    RESOURCE_UPDATED: "Resource updated successfully.",
    RESOURCE_DELETED: "Resource deleted successfully.",
};