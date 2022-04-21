export const now = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

const getQueryKeys = (properties) =>
  properties
    .map((property) => {
      const {
        key: [{ kind, name }],
        value,
      } = property;

      if (kind === 'BELONGS_TO' && typeof value === 'number') {
        return `${name} {
          id\n
        }`;
      }

      if (kind === 'BELONGS_TO' && typeof value === 'object') {
        const keys = Object.keys(value);

        return `${name} {
          ${keys.map((key) => key).join('\n')}
        }`;
      }

      return name;
    })
    .join('\n');

const getValueBasedOnPropertyKind = (kind, value) =>
  kind === 'BELONGS_TO' && value ? value.id : value;

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

export const fetchRecord = async (modelName, id, properties = []) => {
  const queryName = `one${modelName}`;

  const query = `
    query($where: ${modelName}FilterInput) {
      ${queryName}(where: $where) {
        id
        ${getQueryKeys(properties)}
      }
    }
  `;

  console.log({ query });

  const { data, errors } = await gql(query, { where: { id: { eq: id } } });

  if (errors) {
    throw new Error(errors);
  }

  const { [queryName]: record } = data;

  return record;
};
