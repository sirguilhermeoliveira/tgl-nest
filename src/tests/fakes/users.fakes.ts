import { generateFakeEmail } from './utils';

export const user_EmailMock_1 = 'test_email@gmail.com';

export const adminMock_1 = {
  email: generateFakeEmail(),
  name: 'User 1',
  password: 'Abc123',
};

export const userMock_1 = {
  id: '8A90SJA0SJA90SAAKA_0',
  email: generateFakeEmail(),
  name: 'User 1',
  password: 'Abc123',
};

export const userMock_2 = {
  email: generateFakeEmail(),
  name: 'User 2',
  password: 'Abc123',
};

export const usersMock = [
  {
    email: generateFakeEmail(),
    name: 'User 1',
    password: 'password',
  },
  {
    email: generateFakeEmail(),
    name: 'User 2',
    password: 'password',
  },
];

export const changeUserPasswordMock = {
  password: 'password',
  newPassword: 'Abc123',
};

export const changeUserMock = {
  id: '1',
  name: 'User 1',
  email: 'user1@example.com',
  password: 'password',
  isAdmin: false,
  forgot_password_token: '',
  forgot_password_expirationTime: new Date(),
  created_At: new Date(),
  updated_At: new Date(),
};
