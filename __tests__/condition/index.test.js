import condition from '../../functions/condition';

describe('Native condition', () => {
  test('The condition returns true', async () => {
    const steps = jest.fn();
    await condition({ value: true }, steps);
    expect(steps).toHaveBeenCalled();
  });

  test('The condition returns false', async () => {
    const steps = jest.fn();
    await condition({ value: false }, steps);
    expect(steps).not.toHaveBeenCalled();
  });
});
