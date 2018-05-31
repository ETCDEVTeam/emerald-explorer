import * as React from 'react';
import { TextField, Button } from 'material-ui';

export interface Props {
  onCompile?: (code: string) => void;
}

export interface State {
  code: string;
}

export class CompileContract extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }


  handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      code: event.target.value,
    })
  }


  handleCompileClick = () => {
    if (this.props.onCompile) {
      this.props.onCompile(this.state.code);
    }
  }

  render() {
    const { code } = this.state;

    return (
      <div>
        <TextField
          multiline={true}
          rowsMax={10}
          rows={5}
          name="code"
          label="Source code"
          value={code}
          onChange={this.handleCodeChange}
        />
        <Button onClick={this.handleCompileClick}>Compile</Button>
      </div>
    );
  }

}

export default CompileContract;