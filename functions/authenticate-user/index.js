const authenticateUser = async ({
  authenticationProfile: { id: authenticationProfileId },
  username,
  password,
}) => {
  const mutation = `
    mutation($username: String, $password: String, $authenticationProfileId: String) {
      login(username: $username, password: $password, authProfileUuid: $authenticationProfileId) {
        jwtToken
      }
    }
  `;

  const input = {
    username,
    password,
    authenticationProfileId,
  };

  const { data, errors } = await gql(mutation, input);

  if (errors) {
    throw new Error(errors);
  }

  const {
    login: { jwtToken: jwt },
  } = data;

  return {
    jwt,
  };
};

export default authenticateUser;
