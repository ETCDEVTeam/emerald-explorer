import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { AddressView } from 'emerald-tool';

interface Props {
  node: Node;
  address: string;
}

interface State {
  balance: string | null;
  txCount: number | null;
  code: string;
}

class Address extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      balance: null,
      txCount: null,
      code: '',
    };
  }

  async componentWillMount() {
    const { node, address } = this.props;
    const txCount = await node.rpc!.eth.getTransactionCount(address);
    const balance = await node.rpc!.eth.getBalance(address);
    const code = await node.rpc!.eth.getCode(address);

    this.setState({
      balance: balance.toFixed(),
      txCount: txCount,
      code: code,
    });
  }

  render() {
    const { address } = this.props;
    const { balance, txCount, code } = this.state;
    const baseUrl = `/node/${this.props.node.id!}`;
    return (
        <AddressView
          address={address!}
          txCount={txCount!}
          balance={balance || ''}
          baseUrl={baseUrl}
          code={code}
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

export default (connect(mapStateToProps, null)(Address));
