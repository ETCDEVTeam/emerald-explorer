import { Record } from 'immutable';
import { Contract } from './model';

type StateParams = {
  contracts: Array<Contract>;
  loading: boolean;
};

const defaultValues: StateParams = {
  contracts: [],
  loading: false,
};

export class State extends Record(defaultValues) {
  contracts: Array<Contract>;
  loading: boolean;

  constructor() {
    super(defaultValues);
  }
}
