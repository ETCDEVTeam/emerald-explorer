import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { match } from 'react-router';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { Contract } from '../store/contracts/model';
import ContractList from '../components/ContractList';
import AddContract from '../components/AddContract';
import Breadcrumbs from '../components/Breadcrumbs';
import { FormSubmitHandler } from 'redux-form';
import { AddContractFormData, AddContractProps } from '../components/AddContract/AddContract';
import * as actions from '../store/contracts/actions';
import { history } from '../store';

interface ContractListContainerProps {
  node: Node;
  contracts: Array<Contract>;
  addContractHandler: FormSubmitHandler<AddContractFormData, AddContractProps>;
}

function addContractHandler(
  values: AddContractFormData, dispatch: Dispatch<AppState>, props: AddContractProps) {
    dispatch(actions.addContractThunk(values.address, values.name, values.abi));
}

class ContractListContainer extends React.Component<ContractListContainerProps> {
  
  deployNewContractHandler = () => {
    const { node } = this.props;
    history.push(`/node/${node.id}/contracts/deploy`);
  }

  render() {
    const { node, contracts } = this.props;
    return (
      <React.Fragment>
        <Breadcrumbs nodeId={node.id} />
        <ContractList node={node} contracts={contracts} />
        <AddContract
          onSubmit={addContractHandler}
          onDeployNewContract={this.deployNewContractHandler}
        />
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

function mapDispatchToProps(dispatch: Dispatch<AppState>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractListContainer);
