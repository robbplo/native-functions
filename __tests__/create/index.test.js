import create from '../../functions/create';

describe('Native create', () => {
  test('It creates a record', async () => {
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

    const { as: result } = await create({ model: { name: 'User' }, mapping });

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
      await create({ model: { name: 'invalidModel' }, mapping: [] });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
