const log = async ({ severity, variables }) => {
  const severityTypes = ['log', 'info', 'debug', 'warn', 'error'];

  if (severityTypes.includes(severity)) {
    variables.forEach((variable) => {
      // eslint-disable-next-line no-console
      console[severity](`${variable.key} : ${JSON.stringify(variable.value)}`);
    });
  } else {
    // eslint-disable-next-line no-console
    console.error('Unknown severity type');
  }
};

export default log;
