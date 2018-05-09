import { connect } from 'react-redux';

import { AppState } from '../store/types';

import NodeList from '../components/NodeList';

const mapStateToProps = (state: AppState) => ({
    nodes: state.nodes.nodes
});

export default connect(mapStateToProps)(NodeList);
