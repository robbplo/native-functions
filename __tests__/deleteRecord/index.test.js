import deleteRecord from '../../functions/deleteRecord';

describe('Native delete', () => {
  test('It deletes a record', async () => {
    // const { as: result } = await deleteRecord({
    //   record: {
    //     data: { id: 1 },
    //     model: { name: 'User' },
    //   },
    // });
    const { as: result } = await deleteRecord({ id: 1 });

    expect(result).toBe('Record deleted');
  });

  test('It throws an error for non existing records', async () => {
    try {
      // await deleteRecord({
      //   record: {
      //     data: { id: 1 },
      //     model: { name: 'invalidModel' },
      //   },
      // });
      await deleteRecord({ id: 99 });
    } catch (errors) {
      expect(errors.length).toBeGreaterThan(0);
    }
  });
});
