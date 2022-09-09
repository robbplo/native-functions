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

const taskProperties = [
  {
    key: [
      {
        name: 'id',
        kind: 'INTEGER',
      },
    ],
    value: 1,
  },
  {
    key: [
      {
        name: 'name',
        kind: 'STRING',
      },
    ],
    value: 'First task',
  },
  {
    key: [
      {
        name: 'user',
        kind: 'BELONGS_TO',
      },
    ],
    value: { firstName: 'John', id: 1, lastName: 'Doe', age: 30 },
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

  test('fetchRecord returns an record with a belongs to relation', async () => {
    const result = await fetchRecord('Task', 1, taskProperties);
    expect(result).toMatchObject({
      id: 1,
      name: 'First task',
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
      },
    });
  });
});
