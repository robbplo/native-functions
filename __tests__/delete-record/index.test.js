import deleteRecord from '../../functions/delete-record';
import { fetchRecord } from '../../functions/utils';

describe('Native delete', () => {
  test('It deletes a record', async () => {
    const { result } = await deleteRecord({
      record: {
        data: { id: 1 },
        model: { name: 'User' },
      },
    });

    const record = await fetchRecord('User', ['id'], 1);

    expect(result).toBe('Record deleted');
    expect(record).toBeNull();
  });

  test('It throws an error for non existing records', async () => {
    expect.assertions(2);

    try {
      await deleteRecord({
        record: {
          data: { id: -1 },
          model: { name: 'User' },
        },
      });
    } catch (errors) {
      expect(errors.length).toEqual(1);
      expect(errors[0].message).toBe('Record not found');
    }
  });

  test('It throws an error for non existing models', async () => {
    expect.assertions(1);

    try {
      await deleteRecord({
        record: {
          data: { id: 1 },
          model: { name: 'invalidModel' },
        },
      });
    } catch (errors) {
      expect(errors.length).toEqual(1);
    }
  });
});
