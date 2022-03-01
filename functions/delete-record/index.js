const deleteRecord = async ({
  record: {
    data: { id },
    model: { name: modelName },
  },
}) => {
  const mutationName = `delete${modelName}`;
  const mutation = `
      mutation($id: Int!) {
        ${mutationName}(id: $id) {
          id
        }
      }
    `;

  const { errors } = await gql(mutation, { id });

  if (errors) {
    throw errors;
  }
  return {
    result: 'Record deleted',
  };
};

export default deleteRecord;
