import React from 'react';
import {FormattedMessage} from 'react-intl';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import ibem from 'blocks/i/ibem/ibem.jsx';
import Button from 'blocks/Controls/Button/Button.jsx'

const blockName = 'registration';

class Registration extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        if (cookie.load('token')) {
            this.props.history.pushState(null, '/');
        }
    }

    render() {
        var content,
            rowCls = ibem.cls(blockName, 'row');

        content = (
            <div className={blockName}>
                <div className={rowCls}>
                    <Link className='link' to='/registration/init/user'>
                        <FormattedMessage
                            id='Registration.user'
                            defaultMessage='User'/>
                    </Link>
                </div>
                <div className={rowCls}>
                    <Link className='link' to='/registration/init/agent'>
                        <FormattedMessage
                            id='Registration.agent'
                            defaultMessage='Agent'/>
                    </Link>
                </div>
                {this.props.children}
            </div>
        );

        return content;
    }
}

export default Registration;
