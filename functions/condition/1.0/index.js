const condition = async ({ value }, steps) => {
  const result = !!value;

  if (result) {
    await steps();
  }

  return result;
};

export default condition;
