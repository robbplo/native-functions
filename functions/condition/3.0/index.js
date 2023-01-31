const condition = async (_, paths) => {
  await paths.forEach(async ({ value, steps }, halt) => {
    if (value) {
      await steps();
      halt();
    }
  });
};

export default condition;
