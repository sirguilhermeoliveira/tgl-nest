export class User {
  id?: number;
  isAdmin?: boolean;
  forgot_password_token?: string;
  forgot_password_expirationTime?: Date;
  email: string;
  password: string;
  name: string;
}
