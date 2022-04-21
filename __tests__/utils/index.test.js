import { fetchRecord, parseAssignedProperties } from '../../functions/utils';

const properties = [
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

describe('Utility functions', () => {
  test('parseAssignedProperties', () => {
    expect(parseAssignedProperties(properties)).toStrictEqual({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
  });

  test('fetchRecord returns an existing record', async () => {
    const result = await fetchRecord('User', 1, properties);

    expect(result).toMatchObject({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
  });

  test('fetchRecord returns an error when no record is found', async () => {
    const result = await fetchRecord('User', -1, properties);

    expect(result).toBeNull();
  });

  test('It throws an error for invalid input', async () => {
    expect.assertions(1);

    try {
      await fetchRecord('InvalidModel', 0);
    } catch ({ message }) {
      expect(message).toContain('Unknown type');
    }
  });
});
