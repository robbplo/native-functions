import storePropertyFile from '../../../functions/store-property-file/1.2';

describe('Native store property file', () => {
  test('It uploads a file', async () => {
    const model = {
      name: 'Product',
    };
    const property = [{ name: 'image', kind: 'IMAGE' }];
    const url = 'http://my.awesome.image/test.png';

    const { reference } = await storePropertyFile({ model, property, url });

    expect(reference).toBeDefined();
  });

  test('Will crash when storeFile throws errors.', async () => {
    expect.assertions(1);

    const model = {
      name: 'Error',
    };
    const property = [{ name: 'image', kind: 'IMAGE' }];
    const url = 'http://my.awesome.image/test.png';

    try {
      await storePropertyFile({ model, property, url });
    } catch ({ message }) {
      expect(message).toBe('Something went wrong.');
    }
  });

  test('It accepts headers', async () => {
    const model = {
      name: 'Product',
    };
    const property = [{ name: 'image', kind: 'IMAGE' }];
    const url = 'http://my.awesome.image/test.png';
    const headers = [
      {
        key: 'X-Auth-Token',
        value: 'test',
      },
    ];

    const { reference } = await storePropertyFile({
      model,
      property,
      url,
      headers,
    });

    expect(reference).toEqual('received headers');
  });
});
