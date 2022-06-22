const condition = async (_, branches) => {
  for await (let {result, steps} of branches()) {
    if (result) {
      await steps();
      return {result};
    }
  }
  return {result: false};
};

export default condition;