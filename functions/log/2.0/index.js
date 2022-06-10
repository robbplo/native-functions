const pushMessage = (variable, severity) => {
  switch (severity) {
    case 'log':
      // eslint-disable-next-line no-console
      console.log(`${variable.key} : ${JSON.stringify(variable.value)}`);
      break;
    case 'debug':
      // eslint-disable-next-line no-console
      console.debug(`${variable.key} : ${JSON.stringify(variable.value)}`);
      break;
    case 'info':
      // eslint-disable-next-line no-console
      console.info(`${variable.key} : ${JSON.stringify(variable.value)}`);
      break;
    case 'warn':
      // eslint-disable-next-line no-console
      console.warn(`${variable.key} : ${JSON.stringify(variable.value)}`);
      break;
    case 'error':
      // eslint-disable-next-line no-console
      console.error(`${variable.key} : ${JSON.stringify(variable.value)}`);
      break;
    default:
      // eslint-disable-next-line no-console
      console.error('Unknown severity type');
      break;
  }
};
const log = async ({ severity, variables }) => {
  variables.forEach((variable) => {
    pushMessage(variable, severity);
  });
};
export default log;
