import { now, parseAssignedProperties, fetchRecord } from '../utils';

const create = async ({ model: { name: modelName }, mapping }) => {
  const assignProperties = parseAssignedProperties(mapping);

  const input = {
    ...assignProperties,
    createdAt: now(),
    updatedAt: now(),
  };

  const mutationName = `create${modelName}`;

  const mutation = `
    mutation($input: ${modelName}Input) {
      ${mutationName}(input: $input) {
        id
      }
    }
  `;

  const {
    data: {
      [mutationName]: { id },
    },
  } = await gql(mutation, { input });

  const properties = Object.keys(input);
  const createdRecord = await fetchRecord(modelName, properties, id);

  return {
    as: createdRecord,
  };
};

export default create;
