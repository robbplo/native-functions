import authenticateUser from '../../functions/authenticate-user';

describe('Native authenticate user using username/password', () => {
  test('It authenticates a user', async () => {
    const { jwt } = await authenticateUser({
      authenticationProfile: {
        id: 'myAuthenticationProfile',
        kind: 'username_password',
      },
      username: 'test@test.test',
      password: 'test123',
    });

    expect(jwt).toBe('my-awesome-token');
  });

  test('It handles errors for incorrect credentials', async () => {
    expect.assertions(2);

    try {
      await authenticateUser({
        authenticationProfile: {
          id: 'myAuthenticationProfile',
          kind: 'username_password',
        },
        username: 'test@test.test',
        password: 'test1234',
      });
    } catch (errors) {
      const { message, extensions } = errors[0];
      expect(message).toBe('Wrong credentials, please try again');
      expect(extensions).toMatchObject({
        statusCode: 401,
      });
    }
  });
});

describe('Native authenticate user using record id', () => {
  test('It authenticates a user', async () => {
    const { jwt } = await authenticateUser({
      authenticationProfile: {
        id: 'myAuthenticationProfile',
        kind: 'custom_authentication',
      },
      record: 1,
    });

    expect(jwt).toBe('my-awesome-token');
  });

  test('It handles errors for incorrect credentials', async () => {
    expect.assertions(2);

    try {
      await authenticateUser({
        authenticationProfile: {
          id: 'myAuthenticationProfile',
          kind: 'custom_authentication',
        },
        record: 0,
      });
    } catch (errors) {
      const { message, extensions } = errors[0];
      expect(message).toBe('Wrong credentials, please try again');
      expect(extensions).toMatchObject({
        statusCode: 401,
      });
    }
  });
});
