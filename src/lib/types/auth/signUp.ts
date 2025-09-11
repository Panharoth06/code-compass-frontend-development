export type SignUpRequest = {
    first_name: string;
    last_name: string;
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

// {
//   "first_name": "string",
//   "last_name": "string",
//   "username": "string",
//   "gender": "MALE",
//   "password": "string",
//   "confirmed_password": "string",
//   "email": "user@example.com"
// }