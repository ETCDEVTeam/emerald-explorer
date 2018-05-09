import { State as NodesState } from './nodes/reducer';
import { State as ContractsState } from './contracts/reducer';

export interface AppState {
    nodes: NodesState;
    contracts: ContractsState;
}