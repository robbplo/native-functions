export const now = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

export const parseAssignedProperties = (properties) =>
  properties.reduce((output, property) => {
    const {
      key: { name: propertyName },
      value,
    } = property;

    return {
      ...output,
      [propertyName]: value,
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

  const {
    data: { [queryName]: record },
  } = await gql(query, { where: { id: { eq: id } } });

  return record;
};
