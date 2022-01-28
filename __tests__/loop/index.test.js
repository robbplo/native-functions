import loop from '../../functions/loop';

describe('Native loop', () => {
  test('It loops over a collection and execustes child steps', async () => {
    const collection = { data: [{ id: 1 }, { id: 2 }] };
    const childSteps = jest.fn();

    await loop({ collection }, childSteps);
    expect(childSteps).toHaveBeenCalledTimes(collection.data.length);
    expect(childSteps).toHaveBeenLastCalledWith({
      iterator: collection.data.slice(-1).pop(),
    });
  });

  test('It handles empty collections', async () => {
    const childSteps = jest.fn();

    await loop({ collection: { data: [] } }, childSteps);
    expect(childSteps).not.toHaveBeenCalled();
  });
});
