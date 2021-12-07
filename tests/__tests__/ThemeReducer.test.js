import theme from '../../src/context/reducers/theme';

describe('Theme context reducer', () => {
  it('should change the current theme', () => {
    const themeReducerResult = theme(false, { message: false });
    expect(themeReducerResult.light).toBeTruthy();
  });
});
