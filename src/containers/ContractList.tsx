import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { match } from 'react-router';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { Contract } from '../store/contracts/model';
import ContractList from '../components/ContractList';
import AddContract from '../components/AddContract';
import { FormSubmitHandler } from 'redux-form';
import { AddContractFormData, AddContractProps } from '../components/AddContract/AddContract';
import * as actions from '../store/contracts/actions';

interface ContractListContainerProps {
  node: Node;
  contracts: Array<Contract>;
  addContractHandler: FormSubmitHandler<AddContractFormData, AddContractProps>;
}

function addContractHandler(
  values: Partial<AddContractFormData>, dispatch: Dispatch<AppState>, props: AddContractProps) {
    dispatch(actions.addContractThunk('', '', ''));
}

function ContractListContainer(props: ContractListContainerProps) {
  return (
    <React.Fragment>
      <ContractList node={props.node} contracts={props.contracts} />
      <AddContract onSubmit={addContractHandler} />
    </React.Fragment>
  );
}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  node: state.nodes.nodes.find(n => n.id === ownProps.match.params.id),
  contracts: new Array<Contract>(),
});

function mapDispatchToProps(dispatch: Dispatch<AppState>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractListContainer);
