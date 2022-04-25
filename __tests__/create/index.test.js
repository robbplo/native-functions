import create from '../../functions/create';

const mapping = [
  {
    key: [
      {
        name: 'firstName',
        kind: 'STRING',
      },
    ],
    value: 'John',
  },
  {
    key: [
      {
        name: 'lastName',
        kind: 'STRING',
      },
    ],
    value: 'Doe',
  },
  {
    key: [
      {
        name: 'age',
        kind: 'INTEGER',
      },
    ],
    value: 30,
  },
];

describe('Native create', () => {
  test('It creates a record with primitive properties', async () => {
    const { as: result } = await create({ model: { name: 'User' }, mapping });

    expect(result).toHaveProperty('id');
    expect(result).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
  });

  test('It creates a record and sets a belongs to relation based on a record variable', async () => {
    const { as: result } = await create({
      model: { name: 'User' },
      mapping: [
        ...mapping,
        {
          key: [
            {
              name: 'city',
              kind: 'BELONGS_TO',
            },
          ],
          value: {
            id: 1,
            name: 'Amsterdam',
          },
        },
      ],
    });

    expect(result).toHaveProperty('id');
    expect(result).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      city: {
        id: 1,
        name: 'Amsterdam',
      },
    });
  });

  test('It creates a record and sets a belongs to relation based on a number variable', async () => {
    const { as: result } = await create({
      model: { name: 'User' },
      mapping: [
        ...mapping,
        {
          key: [
            {
              name: 'city',
              kind: 'BELONGS_TO',
            },
          ],
          value: 1,
        },
      ],
    });

    expect(result).toHaveProperty('id');
    expect(result).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      city: {
        id: 1,
      },
    });
  });

  test('It throws an error for invalid input', async () => {
  test.skip('It throws an error for invalid input', async () => {
    expect.assertions(1);

    try {
      await create({ model: { name: 'invalidModel' }, mapping: [] });
    } catch (errors) {
      expect(errors.length).toBeGreaterThan(0);
    }
  });
});
