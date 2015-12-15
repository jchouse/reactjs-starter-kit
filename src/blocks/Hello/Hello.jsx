import React from 'react';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl-es6';

import ibem from 'blocks/i/ibem/ibem.jsx';

const blockName = 'hellow-world';

class Header extends React.Component {
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

export default Header;
