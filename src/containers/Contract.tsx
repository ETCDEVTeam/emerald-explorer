import * as React from 'react';
import { Redirect } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { match } from 'react-router';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { Contract } from '../store/contracts/model';
import ContractView from '../components/ContractView';

interface ContractContainerProps {
  node: Node;
  contract: Contract;
}

function ContractContainer(props: ContractContainerProps) {
  if (props.contract) {
    return (
      <ContractView contract={props.contract} node={props.node} />
    );
  }
  return (<Redirect to={`/node/${props.node.id}/contracts`}/>);
}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  node: state.nodes.nodes.find(n => n.id === ownProps.match.params.id),
  contract: state.contracts.contracts.find((c) => c.address === ownProps.match.params.address),
});

function mapDispatchToProps(dispatch: Dispatch<AppState>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractContainer);
