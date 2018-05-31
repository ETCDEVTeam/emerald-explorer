import * as React from 'react';
import { CompileContract } from 'emerald-tool';
import { Node } from '../store/nodes/model';

export interface Props {
  node: Node;
}

export interface State {
  result: any;
}

export class CompileSolidity extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      result: null,
    };
  }

  handleCompile = async (code: string) => {
    // Call RPC method of node
    const result = await this.props.node.rpc!.eth.compile.solidity(code);
    this.setState({
      result,
    });
  }

  render() {
    const { result } = this.state;

    return (
      <React.Fragment>
        <div>
          <CompileContract onCompile={this.handleCompile} />
        </div>
        <div>
          {JSON.stringify(result)}
        </div>
      </React.Fragment>
    );
  }
}

export default CompileSolidity;