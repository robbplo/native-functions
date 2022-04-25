import { parseAssignedProperties, fetchRecord } from '../utils';

const create = async ({ model: { name: modelName }, mapping }) => {
  const assignProperties = parseAssignedProperties(mapping);

  const input = {
    ...assignProperties,
  };

  const mutationName = `create${modelName}`;

  const mutation = `
    mutation($input: ${modelName}Input) {
      ${mutationName}(input: $input) {
        id
      }
    }
  `;

  try {
    const { data, errors } = await gql(mutation, { input });
    if (errors) {
      throw errors;
    }

    const {
      [mutationName]: { id },
    } = data;
    const createdRecord = await fetchRecord(modelName, id, mapping);

    return {
      as: createdRecord,
    };
  } catch (error) {
    console.log({ input, error });

    return {
      as: error,
    };
  }
};

export default create;
