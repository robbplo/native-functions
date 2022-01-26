import update from '../../functions/update';

const mapping = [
  {
    key: [
      {
        name: 'firstName',
      },
    ],
    value: 'Hannah',
  },
  {
    key: [
      {
        name: 'lastName',
      },
    ],
    value: 'Brook',
  },
  {
    key: [
      {
        name: 'age',
      },
    ],
    value: 40,
  },
];

describe('Native update', () => {
  test('It updates the firstname, lastname and age of a record', async () => {
    const { as: result } = await update({
      selectedRecord: {
        data: { id: 1 },
        model: { name: 'User' },
      },
      mapping,
    });
    expect(result).toMatchObject({
      firstName: 'Hannah',
      lastName: 'Brook',
      age: 40,
    });
  });

  test('It updates a record without mapping', async () => {
    const { as: result } = await update({
      selectedRecord: {
        data: { id: 1 },
        model: { name: 'User' },
      },
      mapping: [],
    });
    expect(result).toMatchObject({
      id: 1,
    });
  });

  test('It throws an error for missing id', async () => {
    try {
      await update({
        selectedRecord: {
          data: {},
          model: { name: 'User' },
        },
        mapping,
      });
    } catch (errors) {
      expect(errors.length).toEqual(1);
    }
  });
});
