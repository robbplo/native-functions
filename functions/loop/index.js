const loop = async ({ collection: { data: collection } }, steps) => {
  for (let index = 0; index < collection.length; index++) {
    await steps({ iterator: collection[index] });
  }
};

export default loop;
