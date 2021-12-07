import { cleanNames } from '../../src/functions/globalFunctions';

describe('CleanNames function tests:', () => {
  it('should return an array of strings', () => {
    const testWords = 'testing_array_strings';
    const result = cleanNames(testWords);
    expect(['Testing', 'Array', 'Strings']).toEqual(
      expect.arrayContaining(result)
    );
  });
  it('should remove underscores and capitalize the first letter of each word', () => {
    const testWord = 'test_case_works';
    const result = cleanNames(testWord);
    expect(result).toEqual(['Test', 'Case', 'Works']);
  });
});
