import authenticateUser from '../../functions/authenticate-user';

describe('Native authenticate user using username/password', () => {
  test('It authenticates a user', async () => {
    const authenticationProfile = {
      authenticationProfile: {
        id: 'myAuthenticationProfile',
        kind: 'usernamePassword',
      },
      username: 'test@test.test',
      password: 'test123',
    };
    const { jwt } = await authenticateUser({ authenticationProfile });

    expect(jwt).toBe('my-awesome-token');
  });

  test('It handles errors for incorrect credentials', async () => {
    expect.assertions(2);

    const authenticationProfile = {
      authenticationProfile: {
        id: 'myAuthenticationProfile',
        kind: 'usernamePassword',
      },
      username: 'test@test.test',
      password: 'wrongPassword',
    };

    try {
      await authenticateUser({
        authenticationProfile,
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
