import { parseAssignedProperties, fetchRecord, parseValidationSets } from '../../utils';

const create = async ({ model: { name: modelName }, mapping, validationSet }) => {
  const assignProperties = parseAssignedProperties(mapping);
  const validationSet = parseValidationSet(validationSet)

  const input = {
    ...assignProperties,
  };

  const mutationName = `create${modelName}`;

  const mutation = `
    mutation($input: ${modelName}Input${validationSets}) {
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
  const createdRecord = await fetchRecord(modelName, id, mapping);

  return {
    as: createdRecord,
  };
};

export default create;
