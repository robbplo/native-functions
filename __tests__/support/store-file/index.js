const storeFile = async (modelName, _propertyName, _url, headers) => {
  switch (true) {
    case modelName === 'Error':
      throw new Error('Something went wrong.');

    case !!headers:
      return 'received headers';

    default:
      return 'my-awesome-reference';
  }
};

export default storeFile;
