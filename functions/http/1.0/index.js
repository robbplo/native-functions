const parseHeaders = (headers) =>
  headers.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

const parseQueryParameters = (queryParameters) =>
  queryParameters
    .map(({ key, value }, index) => {
      const paramKey = index === 0 ? `?${key}` : key;
      return `${paramKey}=${encodeURIComponent(value)}`;
    })
    .join('&');

const generateUrl = (url, protocol, queryParameters) =>
  `${protocol}://${url}${parseQueryParameters(queryParameters)}`;

const http = async ({
  url,
  method,
  body,
  headers = [],
  protocol,
  queryParameters = [],
}) => {
  const fetchUrl = generateUrl(url, protocol, queryParameters);
  const options = {
    method,
    headers: parseHeaders(headers),
    ...(method !== 'get' && { body }),
  };

  const response = await fetch(fetchUrl, options);
  const data = await response.text();

  return { as: data };
};

export default http;
