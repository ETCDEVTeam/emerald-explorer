import * as React from 'react';

import NodeList from '../../containers/NodeList';

export interface Props {

}

function Dashboard(props: Props) {

    return (
        <div>
            <div>Dashboard</div>
            <NodeList />
        </div>
    );
}

export default Dashboard;