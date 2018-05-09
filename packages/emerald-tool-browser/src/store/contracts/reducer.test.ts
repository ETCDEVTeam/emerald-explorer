import reduce, { State } from './reducer';
import * as actions from './actions';

describe('contracts reducer', () => {
  it('should add contract to state', () => {
    const state = reduce(new State(), actions.addContract('0x123', 'erc20', '[]'));
    expect(state.contracts).toHaveLength(1);
  });
});