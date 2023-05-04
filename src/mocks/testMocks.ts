export const userMock_1 = {
  id: 1,
  email: 'user1@example.com',
  name: 'User 1',
  isAdmin: false,
  forgot_password_token: '',
  forgot_password_expirationTime: new Date(),
  password: 'Abc123',
};

export const userMock_2 = {
  id: 2,
  email: 'user2@example.com',
  name: 'User 2',
  isAdmin: false,
  forgot_password_token: '',
  forgot_password_expirationTime: new Date(),
  password: 'Abc123',
};

export const betMock_1 = {
  id: 1,
  user_id: 1,
  game_id: 1,
  bet_numbers: '1,2,3,4,5,6,7,8,9,10',
  created_At: new Date(),
};

export const betMock_2 = {
  id: 2,
  user_id: 2,
  game_id: 2,
  bet_numbers: '1,2,3,4,5,6,7,8,9,10',
  created_At: new Date(),
};

export const gameMock_1 = {
  id: 1,
  title: 'Test Title',
  description: 'Test Description',
  color: 'Test Color',
  price: 3.2,
  max_bet_numbers: 10,
  bet_range: 60,
};

export const gameMock_2 = {
  id: 2,
  title: 'Test Title',
  description: 'Test Description',
  color: 'Test Color',
  price: 4,
  max_bet_numbers: 30,
  bet_range: 100,
};
