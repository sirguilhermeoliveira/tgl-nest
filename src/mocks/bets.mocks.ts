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

export const betsMock = [
  {
    id: 1,
    user_id: 1,
    game_id: 1,
    bet_numbers: '1,2,3,4,5,6,7,8,9,10',
    created_At: new Date(),
  },
  {
    id: 2,
    user_id: 2,
    game_id: 2,
    bet_numbers: '1,2,3,4,5,6,7,8,9,10',
    created_At: new Date(),
  },
];

export const betsWithLastOlderthanOneWeekMock = [
  {
    id: 1,
    user_id: 1,
    game_id: 1,
    bet_numbers: '1,2,3,4,5,6,7,8,9,10',
    created_At: new Date(),
  },
  {
    id: 2,
    user_id: 2,
    game_id: 2,
    bet_numbers: '1,2,3,4,5,6,7,8,9,10',
    created_At: new Date('2022-04-23T10:20:30Z'),
  },
];
