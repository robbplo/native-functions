const USERNAME_PASSWORD = `
    mutation($username: String!, $password: String!, $authenticationProfileId: String!) {
      login(username: $username, password: $password, authProfileUuid: $authenticationProfileId) {
        jwtToken
      }
    }
  `;
const CUSTOM_AUTHENTICATION = `
    mutation($userId: Int!, , $authenticationProfileId: String!) {
      generateJwt(userId: $userId, authenticationProfileId: $authenticationProfileId) {
        jwtToken
      }
    }
  `;

const authenticateUser = async ({
  authenticationProfile: { id: authenticationProfileId, kind },
  username,
  password,
  record,
}) => {
  const mutation =
    kind === 'username_password' ? USERNAME_PASSWORD : CUSTOM_AUTHENTICATION;

  const userData =
    kind === 'username_password' ? { username, password } : { userId: record };

  const input = {
    authenticationProfileId,
    ...userData,
  };

  const { data, errors } = await gql(mutation, input);

  if (errors) {
    throw errors;
  }

  const {
    login: { jwtToken: jwt },
  } = data;

  return {
    jwt,
  };
};

export default authenticateUser;
