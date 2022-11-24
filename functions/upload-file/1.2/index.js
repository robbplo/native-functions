const parseHeaders = (headers) =>
  headers.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

const uploadFile = async ({
  model: { name: modelName },
  property: [{ name: propertyName }],
  url,
  headers = [],
}) => {
  const reference = await storeFile(modelName, propertyName, url, {
    headers: parseHeaders(headers),
  });

  return {
    reference,
  };
};

export default uploadFile;
