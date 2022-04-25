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

  const { data, errors } = await gql(mutation, { input });

  console.log({ input, data, errors });

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
};

export default create;
