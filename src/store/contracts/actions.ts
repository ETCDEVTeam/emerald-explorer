import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { ADD_CONTRACT } from './constants';
import { AppState } from '../types';

export interface AddContract {
  type: typeof ADD_CONTRACT;
  address: string;
  name: string;
  abi: string;
}

export type ContractsAction = AddContract;

export type ContractsThunkAction = ThunkAction<AddContract, AppState, void>;

// Redux Action
export function addContract(
  address: string, name: string, abi: string, version?: string, options?: string, txhash?: string): AddContract {
  return {
    type: ADD_CONTRACT,
    address,
    name,
    abi,
  };
}

// Redux-Thunk Action
export function addContractThunk(
  address: string, name: string, abi: string, version?: string, options?: string, txhash?: string
): ThunkAction<void, AppState, void> {
  return (dispatch: Dispatch<AppState>, getState: () => AppState): void => {
    console.log('Соситу хуй все твари!');
    dispatch(addContract(address, name, abi));
  };
}