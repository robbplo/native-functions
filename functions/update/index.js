import { now, parseAssignedProperties, fetchRecord } from '../utils';

const update = async ({ model: { name: modelName }, mapping }) => {
  const assignProperties = parseAssignedProperties(mapping);

  const input = {
    ...assignProperties,
    updatedAt: now(),
  };

  const mutationName = `update${modelName}`;

  const mutation = `
    mutation($input: ${modelName}Input) {
      ${mutationName}(input: $input) {
        id
      }
    }
  `;

  const { data, errors } = await gql(mutation, { input });

  if (errors) {
    throw errors;
  }

  const {
    [mutationName]: { id },
  } = data;
  const properties = Object.keys(input);
  const updatedRecord = await fetchRecord(modelName, properties, id);

  return {
    as: updatedRecord,
  };
};

export default update;
