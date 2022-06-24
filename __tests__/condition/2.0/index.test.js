import condition from '../../../functions/condition/2.0';

const createReducer = (branches) => ({
  forEach: async (fn) =>
    branches.reduce(async (previous, { label, value, steps }) => {
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
  test.only('The condition executes first truthy branch', async () => {
    const firstBranchSteps = jest.fn();
    const secondBranchSteps = jest.fn();
    const elseSteps = jest.fn();

    const branches = createReducer([
      {
        label: 'Branch 1',
        value: async () => false,
        steps: async () => firstBranchSteps(),
      },
      {
        label: 'Branch 2',
        value: async () => true,
        steps: async () => secondBranchSteps(),
      },
      {
        label: 'Else',
        value: async () => true,
        steps: async () => elseSteps(),
      },
    ]);

    await condition({}, branches);
    expect(firstBranchSteps).not.toHaveBeenCalled();
    expect(secondBranchSteps).toHaveBeenCalled();
    expect(elseSteps).not.toHaveBeenCalled();
  });

  test.only('The condition executes the else flow', async () => {
    const firstBranchSteps = jest.fn();
    const secondBranchSteps = jest.fn();
    const elseSteps = jest.fn();

    const branches = createReducer([
      {
        label: 'Branch 1',
        value: async () => false,
        steps: async () => firstBranchSteps(),
      },
      {
        label: 'Branch 2',
        value: async () => false,
        steps: async () => secondBranchSteps(),
      },
      {
        label: 'Else',
        value: async () => true,
        steps: async () => elseSteps(),
      },
    ]);

    await condition({}, branches);
    expect(firstBranchSteps).not.toHaveBeenCalled();
    expect(secondBranchSteps).not.toHaveBeenCalled();
    expect(elseSteps).toHaveBeenCalled();
  });
});
