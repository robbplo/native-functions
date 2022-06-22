test('condition 2.0', async () => {
  const forEachBranch = async (fn) =>
    [
      {
        label: 'Branch 1',
        value: false,
        steps: async () => {
          console.log('[Branch 1] false - not supposed to be logged!');
        },
      },
      {
        label: 'Branch 2',
        value: true,
        steps: async () => {
          console.log('[Branch 2] true - supposed to be logged!');
        },
      },
      {
        label: 'Else',
        value: true,
        steps: async () => {
          console.log('[Else] true - but not supposed to be logged!');
        },
      },
    ].reduce(async (previous, branch) => {
      const halted = await previous;
      if (!halted) {
        let halt = false;
        return fn(branch, () => {
          halt = true;
        }).then(() => halt);
      }
      return halted;
    }, Promise.resolve(false));

  await $app['condition 2.0']({}, { forEach: forEachBranch });
});
