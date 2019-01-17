import * as React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { Contract, AbiFunction } from '../store/contracts/model';
import { ContractView } from 'emerald-tool';
import { EthRpc, contracts } from '@emeraldplatform/emerald-js';

export interface IProps {
  node?: Node;
  contract?: Contract;
}

/**
 * Call Contract without creating transaction
 * Result of eth_call should be the return value of executed contract.
 */
export async function callContract(
  rpc: EthRpc, contractAddress: string, func: AbiFunction, inputs: {}): Promise<contracts.OutputValue[]> {
  const data = contracts.functionToData(func, inputs as contracts.InputValues);
  const result = await rpc.eth.call({ to: contractAddress, data });
  console.log('eth_call result: ' + JSON.stringify(result));
  return contracts.dataToParams(func, result);
}

/**
 * Display contract info and handles calls to contract's methods
 */
class ContractContainer extends React.Component<IProps> {

  handleContractCall = (address: string, func: AbiFunction, inputs: {}) => {
    return callContract(this.props.node!.rpc!, address, func, inputs);
  }

  render() {
    if (this.props.contract) {
      return (
        <ContractView
          contract={this.props.contract}
          onContractCall={this.handleContractCall} 
        />
      );
    }
    return (<Redirect to={`/node/${this.props.node!.id}/contracts`}/>);
  }

}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  node: state.nodes.nodes.find(n => n.id === ownProps.match.params.id),
  contract: state.contracts.contracts.find((c) => c.address === ownProps.match.params.address),
});


export default connect(mapStateToProps)(ContractContainer);
