const storePropertyFile = async ({
  model: { name: modelName },
  propertyName,
  url,
}) => {
  const reference = await storeFile(modelName, propertyName, url);

  return {
    reference,
  };
};

export default storePropertyFile;
