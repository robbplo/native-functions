import { RelationKind } from './contants';

export const now = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

const isRecord = (value) =>
  value && typeof value === 'object' && !Array.isArray(value);

const getQueryKeys = (properties) =>
  properties
    .map((property) => {
      const {
        key: [{ kind, name }],
        value,
      } = property;

      switch (true) {
        case kind === RelationKind.BELONGS_TO && typeof value === 'number':
        case kind === RelationKind.HAS_AND_BELONGS_TO_MANY &&
          Array.isArray(value) &&
          typeof value[0] === 'number':
        case kind === RelationKind.HAS_MANY &&
          Array.isArray(value) &&
          typeof value[0] === 'number':
          return `${name} {
            id\n
          }`;

        case kind === RelationKind.BELONGS_TO && isRecord(value): {
          const keys = Object.keys(value);
          return `${name} {
            ${keys.map((key) => key).join('\n')}
          }`;
        }

        case kind === RelationKind.HAS_AND_BELONGS_TO_MANY &&
          Array.isArray(value):
        case kind === RelationKind.HAS_MANY && Array.isArray(value): {
          const keys = Object.keys(value[0]);
          return `${name} {
            ${keys.map((key) => key).join('\n')}
          }`;
        }

        default:
          return name;
      }
    })
    .join('\n');

const getValueBasedOnPropertyKind = (kind, value) => {
  switch (true) {
    case kind === RelationKind.BELONGS_TO && isRecord(value):
      return value.id;

    case kind === RelationKind.HAS_AND_BELONGS_TO_MANY && Array.isArray(value):
    case kind === RelationKind.HAS_MANY && Array.isArray(value): {
      const recordIds = value.map((val) => (isRecord(val) ? val.id : val));
      return { id: recordIds };
    }

    default:
      return value;
  }
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

  const { data, errors } = await gql(query, { where: { id: { eq: id } } });

  if (errors) {
    throw new Error(errors);
  }

  const { [queryName]: record } = data;

  return record;
};
