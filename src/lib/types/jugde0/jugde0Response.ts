export type Judge0Response = {
  token: string;
  std_out: string | null;
  std_err: string | null;
  compile_output: string | null;
  language_id: number;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: string | null;
  message?: string;
}

// {
//   "token": "string",
//   "std_out": "string",
//   "std_err": "string",
//   "compile_output": "string",
//   "language_id": "string",
//   "status": {
//     "id": 0,
//     "description": "string"
//   },
//   "time": "string",
//   "memory": "string",
//   "message": "string"
// }