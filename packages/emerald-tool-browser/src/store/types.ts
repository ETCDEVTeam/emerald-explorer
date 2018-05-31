import { State as NodesState } from './nodes/reducer';
import { State as ContractsState } from './contracts/state';

export interface AppState {
    nodes: NodesState;
    contracts: ContractsState;
}