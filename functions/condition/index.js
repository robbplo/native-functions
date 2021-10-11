const condition = async ({ value }, steps) => {
  const result = !!value;

  if (result) {
    steps();
  }

  return result;
};

export default condition;
