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

export type ContractsThunkAction = ThunkAction<void, AppState, AddContract>;

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
): ThunkAction<void, AppState, AddContract> {
  return (dispatch: Dispatch<AddContract>, getState: () => AppState): void => {
    dispatch(addContract(address, name, abi));
  };
}