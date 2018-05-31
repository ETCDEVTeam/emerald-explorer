import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { Contract } from '../store/contracts/model';
import ContractList from '../components/ContractList';
import Breadcrumbs from '../components/Breadcrumbs';
import { Navigation, AddContract } from 'emerald-tool';
import * as actions from '../store/contracts/actions';
import { history } from '../store';
import CompileSolidity from './CompileSolidity';

interface ContractListContainerProps {
  navigation: Navigation;
  node: Node;
  contracts: Array<Contract>;
  handleAddContract: (address: string, name: string, abi: string) => void;
}

class ContractListContainer extends React.Component<ContractListContainerProps> {
  
  deployNewContractHandler = () => {
    const { node } = this.props;
    history.push(`/node/${node.id}/contracts/deploy`);
  }

  render() {
    const { node, contracts, handleAddContract } = this.props;
    return (
      <React.Fragment>
        <Breadcrumbs nodeId={node.id} />
        <ContractList node={node} contracts={contracts} />
        <AddContract
          onAddContract={handleAddContract}
          onDeployNewContract={this.deployNewContractHandler}
        />
        <CompileSolidity node={node} />
      </React.Fragment>
    );
  }
}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  node: state.nodes.nodes.find(n => n.id === ownProps.match.params.id),
  contracts: state.contracts.contracts,
});

function mapDispatchToProps(dispatch: any) {
  return {
    handleAddContract: (address: string, name: string, abi: string) => {
      dispatch(actions.addContractThunk(address, name, abi));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractListContainer);
