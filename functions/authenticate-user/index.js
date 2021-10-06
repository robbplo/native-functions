const USERNAME_PASSWORD_KIND = 'usernamePassword';

const MUTATION = `
    mutation($authenticationProfileId: String!, $userId: Int, $username: String, $password: String) {
      generateJwt(authProfileUuid: $authenticationProfileId, userId: $userId, username: $username, password: $password) {
        jwtToken
      }
    }
  `;

const authenticateUser = async ({
  authenticationProfile: {
    authenticationProfile: { id: authenticationProfileId, kind },
    username,
    password,
    userId,
  },
}) => {
  const userData =
    kind === USERNAME_PASSWORD_KIND ? { username, password } : { userId };

  const input = {
    authenticationProfileId,
    ...userData,
  };

  const { data, errors } = await gql(MUTATION, input);

  if (errors) {
    throw errors;
  }

  const {
    generateJwt: { jwtToken: jwt },
  } = data;

  return {
    jwt,
  };
};

export default authenticateUser;
