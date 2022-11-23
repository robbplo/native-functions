import storePropertyFile from '../../../functions/store-property-file/1.0';

describe('Native store property file', () => {
  test('It uploads a file', async () => {
    const model = {
      name: 'Product',
    };
    const propertyName = 'image';
    const url = 'http://my.awesome.image/test.png';

    const { reference } = await storePropertyFile({ model, propertyName, url });

    expect(reference).toBeDefined();
  });

  test('Will crash when storeFile throws errors.', async () => {
    expect.assertions(1);

    const model = {
      name: 'Error',
    };
    const propertyName = 'image';
    const url = 'http://my.awesome.image/test.png';

    try {
      await storePropertyFile({ model, propertyName, url });
    } catch ({ message }) {
      expect(message).toBe('Something went wrong.');
    }
  });
});
