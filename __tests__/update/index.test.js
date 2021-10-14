import update from '../../functions/update';

describe('Native update', () => {
  test('It updates a record', async () => {
    const mapping = [
      {
        key: {
          name: 'firstName',
        },
        value: 'John',
      },
      {
        key: {
          name: 'lastName',
        },
        value: 'Doe',
      },
      {
        key: {
          name: 'age',
        },
        value: 30,
      },
    ];

    const { as: result } = await update({ model: { name: 'User' }, mapping });

    expect(result).toHaveProperty('id');
    expect(result).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
  });

  test('It throws an error for invalid input', async () => {
    expect.assertions(1);

    try {
      await update({ model: { name: 'invalidModel' }, mapping: [] });
    } catch (errors) {
      expect(errors.length).toBeGreaterThan(0);
    }
  });
});
