const deleteRecord = async ({ record }) => {
  try {
    const {
      data: { id },
      model: { name: modelName },
    } = record;
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
  } catch (error) {
    if (error.message === "Cannot read property 'id' of null") {
      throw new Error('Record not found');
    } else {
      throw error;
    }
  }
};

export default deleteRecord;
