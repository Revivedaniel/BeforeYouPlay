import generateGame from './generateGame';

describe('generateGame', () => {
  // test('returns a string for a valid game title', async () => {
  //   const gameTitle = 'Super Mario Bros';
  //   const gameData = await generateGame(gameTitle);
  //   expect(typeof gameData).toBe('string');
  // }, 30000);

  test('throws an error for an empty game title', async () => {
    await expect(generateGame('')).rejects.toThrow();
  });

  test('throws an error for a null game title', async () => {
    await expect(generateGame(null)).rejects.toThrow();
  });

  test('throws an error for an undefined game title', async () => {
    await expect(generateGame(undefined)).rejects.toThrow();
  });
});