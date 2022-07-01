import condition from '../../../functions/condition/2.0';

const createReducer = (paths) => ({
  forEach: async (fn) =>
    paths.reduce(async (previous, { label, value, steps }) => {
      const halted = await previous;
      if (!halted) {
        let halt = false;
        return fn({ label, value: await value(), steps }, () => {
          halt = true;
        }).then(() => halt);
      }
      return halted;
    }, Promise.resolve(false)),
});

describe('Native condition 2.0', () => {
  test.only('The condition executes first truthy path', async () => {
    const firstPathSteps = jest.fn();
    const secondPathSteps = jest.fn();
    const elseSteps = jest.fn();

    const paths = createReducer([
      {
        label: 'Path 1',
        value: async () => false,
        steps: async () => firstPathSteps(),
      },
      {
        label: 'Path 2',
        value: async () => true,
        steps: async () => secondPathSteps(),
      },
      {
        label: 'Else',
        value: async () => true,
        steps: async () => elseSteps(),
      },
    ]);

    await condition({}, paths);
    expect(firstPathSteps).not.toHaveBeenCalled();
    expect(secondPathSteps).toHaveBeenCalled();
    expect(elseSteps).not.toHaveBeenCalled();
  });

  test.only('The condition executes the else path', async () => {
    const firstPathSteps = jest.fn();
    const secondPathSteps = jest.fn();
    const elseSteps = jest.fn();

    const paths = createReducer([
      {
        label: 'Path 1',
        value: async () => false,
        steps: async () => firstPathSteps(),
      },
      {
        label: 'Path 2',
        value: async () => false,
        steps: async () => secondPathSteps(),
      },
      {
        label: 'Else',
        value: async () => true,
        steps: async () => elseSteps(),
      },
    ]);

    await condition({}, paths);
    expect(firstPathSteps).not.toHaveBeenCalled();
    expect(secondPathSteps).not.toHaveBeenCalled();
    expect(elseSteps).toHaveBeenCalled();
  });
});
