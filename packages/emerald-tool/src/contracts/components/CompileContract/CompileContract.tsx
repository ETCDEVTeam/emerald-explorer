import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export interface Props {
  onCompile?: (code: string) => void;
}

export interface State {
  code: string;
}

export class CompileContract extends React.Component<Props, State> {

  state = {
    code: '',
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