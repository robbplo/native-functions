import { parseAssignedProperties, fetchRecord } from '../utils';

const update = async ({
  selectedRecord: {
    data: { id },
    model: { name: modelName },
  },
  mapping,
}) => {
  const assignProperties = parseAssignedProperties(mapping);

  const input = {
    ...assignProperties,
  };

  const mutationName = `update${modelName}`;

  const mutation = `
    mutation($id: Int!, $input: ${modelName}Input) {
      ${mutationName}(id: $id, input: $input) {
        id
      }
    }
  `;

  const { errors } = await gql(mutation, { id, input });

  if (errors) {
    throw errors;
  }

  const properties = Object.keys(input);
  const updatedRecord = await fetchRecord(modelName, properties, id);

  return {
    as: updatedRecord,
  };
};

export default update;
