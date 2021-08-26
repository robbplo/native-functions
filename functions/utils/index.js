export const now = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

export const parseAssignedProperties = (properties) =>
  properties.reduce((output, property) => {
    const {
      key: { name: propertyName },
      value: value,
    } = property;

    output[propertyName] = value;

    return output;
  }, {});

export const fetchRecord = async (modelName, properties, id) => {
  const queryName = `one${modelName}`;

  const query = `
    query {
      ${queryName}(where: $where) {
        id
        ${properties}
      }
    }
  `;

  try {
    const {
      data: { [queryName]: record },
    } = await gql(query, { where: { id: { eq: id } } });

    return record;
  } catch (error) {
    throw error;
  }
};
