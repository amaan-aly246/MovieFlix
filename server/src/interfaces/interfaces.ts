export interface IResponse {
  success: Boolean;
  message: string;
  data?: object;
}

export interface User {
  name: string;
  email: string;
  password: string;
  userId: string;
}
