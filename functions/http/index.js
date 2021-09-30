const http = async ({
  url,
  method,
  body,
  headers,
  protocol,
  queryParameters,
}) => {
  const queryString = queryParameters
    .map(({ key, value }, index) => {
      const paramKey = index === 0 ? `?${key}` : key;
      return `${paramKey}=${encodeURIComponent(value)}`;
    })
    .join("&");
  const fetchUrl = `${protocol}://${url}${queryString}`;
  const fetchHeaders = headers.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {});

  const response = await fetch(fetchUrl, {
    method,
    headers: fetchHeaders,
    ...(method !== "get" && { body }),
  });

  const data = await response.text();

  return {
    as: data,
  };
};

export default http;
