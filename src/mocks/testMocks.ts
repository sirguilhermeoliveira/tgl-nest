export const user_1 = {
  id: 1,
  email: 'user1@example.com',
  name: 'User 1',
  isAdmin: false,
  forgot_password_token: '',
  forgot_password_expirationTime: new Date(),
  password: 'Abc123',
};

export const user_2 = {
  id: 2,
  email: 'user2@example.com',
  name: 'User 2',
  isAdmin: false,
  forgot_password_token: '',
  forgot_password_expirationTime: new Date(),
  password: 'Abc123',
};

export const bet_1 = {
  id: 1,
  user_id: 1,
  game_id: 1,
  bet_numbers: '1,2,3,4,5,6,7,8,9,10',
  created_At: new Date(),
};

export const bet_2 = {
  id: 2,
  user_id: 2,
  game_id: 2,
  bet_numbers: '1,2,3,4,5,6,7,8,9,10',
  created_At: new Date(),
};
