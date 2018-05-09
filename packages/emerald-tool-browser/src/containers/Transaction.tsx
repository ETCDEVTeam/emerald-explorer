import * as React from 'react';
import { match, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { Transaction, TransactionReceipt } from 'emerald-js';
import TxView from '../components/TxView';

interface Props extends RouteComponentProps<void> {
  node: Node;
  hash: string;
}

interface State {
  tx: Transaction | null;
  receipt: TransactionReceipt | null;
}

class TransactionContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      tx: null,
      receipt: null,
    };
  }

  async componentWillMount() {
    const { node, hash } = this.props;
    const tx = await node.rpc!.eth.getTransaction(hash);
    const receipt = await node.rpc!.eth.getTransactionReceipt(hash);
    this.setState({
      tx: tx,
      receipt: receipt,
    });
  }

  render() {
    const { tx, receipt } = this.state;
    const baseUrl = `/node/${this.props.node.id!}`;
    return (
        <TxView tx={tx!} receipt={receipt} baseUrl={baseUrl}/>
    ); 
  }
}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  node: state.nodes.nodes.find(n => n.id === ownProps.match.params.id),
  hash: ownProps.match.params.hash,
});

export default (connect(mapStateToProps)(TransactionContainer));
