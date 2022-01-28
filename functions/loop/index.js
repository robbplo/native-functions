/* eslint-disable no-await-in-loop */
const loop = async ({ collection: { data: collection } }, steps) => {
  for (let index = 0; index < collection.length; index += 1) {
    await steps({ iterator: collection[index] });
  }
};

export default loop;
