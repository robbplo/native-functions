const USERNAME_PASSWORD_KIND = 'usernamePassword';

const USERNAME_PASSWORD_MUTATION = `
    mutation($username: String!, $password: String!, $authenticationProfileId: String!) {
      login(username: $username, password: $password, authProfileUuid: $authenticationProfileId) {
        jwtToken
      }
    }
  `;
const CUSTOM_AUTHENTICATION_MUTATION = `
    mutation($userId: Int!, $authenticationProfileId: String!) {
      generateJwt(userId: $userId, authProfileUuid: $authenticationProfileId) {
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
  const mutationName =
    kind === USERNAME_PASSWORD_KIND ? 'login' : 'generateJwt';

  const mutation =
    kind === USERNAME_PASSWORD_KIND
      ? USERNAME_PASSWORD_MUTATION
      : CUSTOM_AUTHENTICATION_MUTATION;

  const userData =
    kind === USERNAME_PASSWORD_KIND ? { username, password } : { userId };

  const input = {
    authenticationProfileId,
    ...userData,
  };

  const { data, errors } = await gql(mutation, input);

  if (errors) {
    throw errors;
  }

  const {
    [mutationName]: { jwtToken: jwt },
  } = data;

  return {
    jwt,
  };
};

export default authenticateUser;
