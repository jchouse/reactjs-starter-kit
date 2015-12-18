import React from 'react';
import {FormattedMessage} from 'react-intl-es6';

import ibem from 'blocks/i/ibem/ibem.jsx';

const blockName = 'hellow-world';

export class Hello extends React.Component {
    render () {
        return (
            <div className={blockName}>
                <div className={ibem.cls(blockName, 'content')}>
                    <FormattedMessage
                        id='Hello.world'
                        message='Hello world'/>
                </div>
            </div>
        );
    }
}
