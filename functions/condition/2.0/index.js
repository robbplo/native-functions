const condition = async (_, branches) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = branches.next();
    if (done) {
      return;
    }
    if (value.result) {
      // eslint-disable-next-line no-await-in-loop
      await value.steps();
      return;
    }
  }
};

export default condition;
