export const now = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

const getValueBasedOnPropertyKind = (kind, value) => {
  // eslint-disable-next-line no-console
  console.log({
    kind,
    value,
    result: kind === 'BELONGS_TO' && value ? value.id : value,
  });
  return kind === 'BELONGS_TO' && value ? value.id : value;
};

export const parseAssignedProperties = (properties) =>
  properties.reduce((output, property) => {
    const {
      key: [{ name, kind }],
      value,
    } = property;

    return {
      ...output,
      [name]: getValueBasedOnPropertyKind(kind, value),
    };
  }, {});

export const fetchRecord = async (modelName, properties, id) => {
  const queryName = `one${modelName}`;

  const query = `
    query($where: ${modelName}FilterInput) {
      ${queryName}(where: $where) {
        id
        ${properties.join('\n')}
      }
    }
  `;

  const { data, errors } = await gql(query, { where: { id: { eq: id } } });

  if (errors) {
    throw new Error(errors);
  }

  const { [queryName]: record } = data;

  return record;
};
