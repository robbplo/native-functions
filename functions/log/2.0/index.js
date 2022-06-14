const log = async ({ severity, variables }) => {
  const severityTypes = ['info', 'debug', 'warn', 'error'];

  if (severityTypes.includes(severity)) {
    variables.forEach((variable) => {
      // eslint-disable-next-line no-console
      console[severity](`${variable.key} : ${JSON.stringify(variable.value)}`);
    });
  }
};

export default log;
