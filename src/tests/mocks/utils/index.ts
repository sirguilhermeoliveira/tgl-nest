export const generateFakeEmail = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  let email = '';

  // Add a random combination of 5 letters
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    email += alphabet[randomIndex];
  }

  // Add a random combination of 3 numbers
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    email += numbers[randomIndex];
  }

  email += '@example.com';

  return email;
};
