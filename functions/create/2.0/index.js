import { parseAssignedProperties, fetchRecord } from '../../utils';

const create = async ({ model: { name: modelName }, mapping }) => {
  const assignProperties = parseAssignedProperties(mapping);
  const parsedValidationSet = parseValidationSet(validationSet)

  const input = {
    ...assignProperties,
  };

  const mutationName = `create${modelName}`;
  const mutationArguments = [
    'input: $input',
    parsedValidationSet
  ].join(', ')

  const mutation = `
    mutation($input: ${modelName}Input) {
      ${mutationName}(${mutationArguments}) {
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
