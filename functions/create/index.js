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
    mutation {
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

  const properties = Object.keys(input).join('\n');
  const createdRecord = await fetchRecord(modelName, properties, id);

  return {
    as: createdRecord,
  };
};

export default create;
