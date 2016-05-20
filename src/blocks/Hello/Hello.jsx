import React from 'react';
import {FormattedMessage} from 'react-intl-es6';

import Button from 'blocks/Controls/Button/Button.jsx';
import ibem from 'blocks/i/BEM/BEM';

class Hello extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        var {bem} = this.props;

        return (
            <div className={bem.cls()}>
                <div className={bem.elem('content').cls()}>
                    <FormattedMessage
                        id='Hello.world'
                        message='Hello world'/>
                    <Button>
                        <FormattedMessage
                            id='Hello.button'
                            message='BUTTON'/>
                    </Button>
                </div>
            </div>
        );
    }
}

Hello.defaultProps = {
    bem: new ibem('hellow-world')
};

export default Hello;
