import { ContractsAction, AddContract } from './actions';
import { Contract } from './model';
import { ADD_CONTRACT } from './constants';
import { State } from './state';

const initialState = new State();

// const initialContract = Map({
//   address: null,
//   name: null,
//   abi: null,
//   version: null,
//   options: [],
//   txhash: null,
// });

// function addContract(state: State, address, name, abi, version, options, txhash) {
//   return state.update('contracts', (contracts) =>
//     contracts.push(initialContract.merge({ address, name, abi, version, options, txhash }))
//   );
// }

// function onLoading(state: State, action) {
//   switch (action.type) {
//     case 'CONTRACT/LOADING':
//       return state
//         .set('loading', true);
//     default:
//       return state;
//   }
// }

// function onSetContractList(state: State, action) {
//   switch (action.type) {
//     case 'CONTRACT/SET_LIST':
//       return state
//         .set('contracts', fromJS(action.contracts || []))
//         .set('loading', false);
//     default:
//       return state;
//   }
// }

function onAddContract(state: State, action: AddContract): State {
  if (action.type === ADD_CONTRACT) {
    // return addContract(state,
    //   action.address,
    //   action.name,
    //   action.abi,
    //   action.version,
    //   action.options,
    //   action.txhash);
    const newContract: Contract = {
      address: action.address,
      name: action.name,
      abi: JSON.parse(action.abi),
    };
    state.contracts.push(newContract);
    return state.set('contracts', state.contracts) as State;
  }
  return state;
}

// function updateContract(state: State, txhash: string, f) {
//   return state.update('contracts', (contracts) => {
//     const pos = contracts.findKey((contract: Map<string, any>) => contract.get('txhash') === txhash);
//     if (pos >= 0) {
//       return contracts.update(pos, f);
//     }
//     return contracts;
//   });
// }

// function onUpdateContract(state: State, action) {
//   if (action.type === 'CONTRACT/UPDATE_CONTRACT') {
//     return updateContract(state, action.tx.hash, (contract) =>
//       contract.set('address', action.address)
//     );
//   }
//   return state;
// }

export default function reduce(state: State, action: ContractsAction): State {
  state = state || initialState;
  // state = onLoading(state, action);
  // state = onSetContractList(state, action);
  switch (action.type) {
    case ADD_CONTRACT:
      return onAddContract(state, action);
    default:
      return state;
  }
  // state = onUpdateContract(state, action);
}
