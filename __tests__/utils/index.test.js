import { fetchRecord, parseAssignedProperties } from '../../functions/utils';

describe('Utility functions', () => {
  test('parseAssignedProperties', () => {
    const properties = [
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

    expect(parseAssignedProperties(properties)).toStrictEqual({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
  });

  test('fetchRecord', async () => {
    const result = await fetchRecord(
      'User',
      ['firstName', 'lastName', 'age'],
      1,
    );

    expect(result).toMatchObject({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
  });
});
