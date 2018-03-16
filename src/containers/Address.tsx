import * as React from 'react';
import { match, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { BigNumber } from 'bignumber.js';
import AddressView from '../components/AddressView';

interface Props extends RouteComponentProps<void> {
  node: Node;
  address: string;
}

interface State {
  balance: BigNumber | null;
  txCount: number | null;
}

class Address extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      balance: null,
      txCount: null,
    };
  }

  async componentWillMount() {
    const { node, address } = this.props;
    const txCount = await node.rpc!.eth.getTransactionCount(address);
    const balance = await node.rpc!.eth.getBalance(address);
    this.setState({
      balance: balance,
      txCount: txCount,
    });
  }

  render() {
    const { address } = this.props;
    const { balance, txCount } = this.state;
    const baseUrl = `/node/${this.props.node.id!}`;
    return (
        <AddressView
          address={address!}
          txCount={txCount!}
          balance={balance!}
          baseUrl={baseUrl}
        />
    ); 
  }
}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  node: state.nodes.nodes.find(n => n.id === ownProps.match.params.id),
  address: ownProps.match.params.hex,
});

export default (connect(mapStateToProps)(Address));
