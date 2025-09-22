export type SignUpRequest = {
    first_name: string | null;
    last_name: string | null;
    username: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    password: string;
    confirmed_password: string;
    email: string;
}

export type SignUpResponse = {
    firstName: string;
    lastName: string;
    email: string
}

export interface ErrorResponse {
  message: string;
  code: number;
  timeStamp: string;
  details: string;
}

export interface SerializedError {
  status: number;
  data: ErrorResponse;
}


export const OAUTH_DEFAULT_VALUES = {
  gender: "MALE" as const,
};

export const ERROR_MESSAGES = {
  DUPLICATE_USER:
    "Email or username already exists. Please use different credentials.",
  INVALID_DATA: "Invalid data provided. Please check your information.",
  SERVER_ERROR: "Server error. Please try again later.",
  REGISTRATION_FAILED: "Registration failed. Please try again.",
  AUTO_LOGIN_FAILED: "Auto-login failed",
  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again.",
  UNABLE_TO_COMPLETE: "Unable to complete login. Please try again.",
} as const;