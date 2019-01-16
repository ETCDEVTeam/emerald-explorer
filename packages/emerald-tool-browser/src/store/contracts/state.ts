import { Contract } from './model';

export interface IState {
  contracts: Array<Contract>;
  loading: boolean;
};

export class State implements IState {
  contracts: Array<Contract>;
  loading: boolean;

  constructor() {
      this.contracts = [];
      this.loading = false;
  }
}
