import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { DeployContractWizard } from 'emerald-tool';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  node: Node;
}

class DeployContractContainer extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }
  
  estimateGas = (callData: {from: string; data: string, gas: number}): Promise<number> => {
    const { node } = this.props;
    return node!.rpc!.eth.estimateGas({...callData, nonce: 0});
  }

  getAccountNonce = (address: string): Promise<number> => {
    const { node } = this.props;
    return node!.rpc!.eth.getTransactionCount(address);
  }

  broadcastTx = (signedRawTx: string): Promise<string> => {
    const { node } = this.props;
    return node.rpc!.eth.sendRawTransaction(signedRawTx);
  }

  render() {
    const { node } = this.props;
    const gasPrice = node && node.gasPrice ? node.gasPrice.toNumber() : 0;
    return (
      <React.Fragment>
      <Breadcrumbs nodeId={node.id} />
      <DeployContractWizard
        onEstimateGas={this.estimateGas}
        onGetAccountNonce={this.getAccountNonce}
        gasPrice={gasPrice}
        onSendTx={this.broadcastTx}
        chainId={node.chainId}
      />
      </React.Fragment>
    );
  }
}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const node = state.nodes.nodes.find(n => n.id === ownProps.match.params.id);
  return {
    node,
  };
};

function mapDispatchToProps(dispatch: any, ownProps: OwnProps) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployContractContainer);
