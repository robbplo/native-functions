import uploadFile from '../../../functions/upload-file/1.2';

describe('Native upload file', () => {
  test('It uploads a file', async () => {
    const model = {
      name: 'Product',
    };
    const property = [{ name: 'image', kind: 'IMAGE' }];
    const url = 'http://my.awesome.image/test.png';

    const { reference } = await uploadFile({ model, property, url });

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
      await uploadFile({ model, property, url });
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

    const { reference } = await uploadFile({
      model,
      property,
      url,
      headers,
    });

    expect(reference).toEqual('received headers');
  });
});
