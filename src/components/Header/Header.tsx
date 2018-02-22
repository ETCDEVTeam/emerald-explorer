import * as React from 'react';
import { Logo } from 'emerald-js-ui/lib/icons';

import './Header.css';

interface Props {}

const styles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

function Header(prop: Props) {
  return (
    <div style={styles}>
      <div className="App-logo"><Logo /></div>
      <div>Emerald Browser</div>
    </div>
  );
}

export default Header;