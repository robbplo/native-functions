import { now, parseAssignedProperties, fetchRecord } from '../utils';

const create = async ({ givenModel: { name: modelName }, mapping }) => {
  const properties = parseAssignedProperties(mapping);

  const input = {
    ...properties,
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

  try {
    const {
      data: {
        [mutationName]: { id },
      },
    } = await gql(mutation, { input });

    const createdRecord = await fetchRecord(modelName, mapping, id);

    return {
      output: createdRecord,
    };
  } catch (error) {
    throw error;
  }
};

export default create;
