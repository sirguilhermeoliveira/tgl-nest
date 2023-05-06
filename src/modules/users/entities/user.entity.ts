export class User {
  id?: string;
  isAdmin?: boolean;
  forgot_password_token?: string;
  forgot_password_expirationTime?: Date;
  email: string;
  password: string;
  name: string;
}
