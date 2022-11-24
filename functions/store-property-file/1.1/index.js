const storePropertyFile = async ({
  model: { name: modelName },
  property: [{ name: propertyName }],
  url,
}) => {
  const reference = await storeFile(modelName, propertyName, url);

  return {
    reference,
  };
};

export default storePropertyFile;
