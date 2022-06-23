const condition = async (_, branches) => {
  await branches.forEach(async ({ value, steps }, halt) => {
    if (value) {
      await steps();
      halt();
    }
  });
};

export default condition;
