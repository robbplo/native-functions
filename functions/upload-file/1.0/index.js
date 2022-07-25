const uploadFile = async ({
  model: { name: modelName },
  propertyName,
  url,
}) => {
  const reference = storeFile(modelName, propertyName, url);

  return {
    reference,
  };
};

export default uploadFile;
