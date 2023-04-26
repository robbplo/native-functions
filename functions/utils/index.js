import { RelationKind, PropertyKind } from './contants';

export const now = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

const isRecord = (value) =>
  value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.keys(value).length > 0 &&
  value.id !== undefined;

const isCollection = (value) => Array.isArray(value) && isRecord(value[0]);

const parseBelongsTo = (name, value) => {
  if (isRecord(value)) {
    const keys = Object.keys(value);
    return `${name} {
      ${keys
        .map((key) => {
          if (isRecord(value[key])) {
            return `${key} {
              ${Object.keys(value[key]).join('\n')}
            }`;
          }
          return key;
        })
        .join('\n')}
    }`;
  }

  return `${name} {
    id\n
  }`;
};

const parseHasManyAndHasAndBelongsToMany = (name, value) => {
  if (isCollection(value)) {
    const keys = Object.keys(value[0]);
    return `${name} {
      ${keys.map((key) => key).join('\n')}
    }`;
  }

  return `${name} {
    id\n
  }`;
};

const getQueryKeys = (properties) =>
  properties
    .map((property) => {
      const {
        key: [{ kind, name }],
        value,
      } = property;

      switch (kind) {
        case PropertyKind.OBJECT:
          return `${name} {
                uuid
              }`;
        case RelationKind.BELONGS_TO:
          return parseBelongsTo(name, value);
        case RelationKind.HAS_MANY:
        case RelationKind.HAS_AND_BELONGS_TO_MANY:
          return parseHasManyAndHasAndBelongsToMany(name, value);

        default:
          return name;
      }
    })
    .join('\n');

const belongsToValue = (value) => (isRecord(value) ? value.id : value);

const hasManyOrHasAndBelongsToManyValue = (value) => {
  if (Array.isArray(value)) {
    const recordIds = value.map((val) => (isRecord(val) ? val.id : val));
    return { id: recordIds };
  }

  return value;
};

const getAssignedValue = (kind, value) => {
  switch (kind) {
    case RelationKind.BELONGS_TO:
      return belongsToValue(value);
    case RelationKind.HAS_MANY:
    case RelationKind.HAS_AND_BELONGS_TO_MANY:
      return hasManyOrHasAndBelongsToManyValue(value);
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
      [name]: getAssignedValue(kind, value),
    };
  }, {});

export const parseValidationSets = (validationSets) => {
  if (typeof validationSets == 'string') {
    return `validationSets: [${validationSets}]`
  }

  return null
}

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
