import { getRandomInt } from '../utils/getRandomInt';

export const betMock_1 = {
  user_id: 1,
  game_id: 1,
  bet_numbers: [1, 2, 3, 4, 5],
};

export const betMock_2 = {
  user_id: 1,
  game_id: 2,
  bet_numbers: [1, 2, 3, 4, 5],
};

export const betsMock = [
  {
    id: getRandomInt(100000, 100000000),
    user_id: 1,
    game_id: 1,
    bet_numbers: '1,2,3,4,5,6,7,8,9,10',
    created_At: new Date(),
  },
  {
    id: getRandomInt(100000, 100000000),
    user_id: 2,
    game_id: 2,
    bet_numbers: '1,2,3,4,5,6,7,8,9,10',
    created_At: new Date(),
  },
];

export const betsWithLastOlderthanOneWeekMock = [
  {
    id: getRandomInt(100000, 100000000),
    user_id: 1,
    game_id: 1,
    bet_numbers: '1,2,3,4,5,6,7,8,9,10',
    created_At: new Date(),
  },
  {
    id: getRandomInt(100000, 100000000),
    user_id: 2,
    game_id: 2,
    bet_numbers: '1,2,3,4,5,6,7,8,9,10',
    created_At: new Date('2022-04-23T10:20:30Z'),
  },
];
