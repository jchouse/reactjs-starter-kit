import React from 'react';

import ibem from 'blocks/i/BEM/BEM';

/**
 * Button
 *
 * @property {String}  [name]               - array of additionals element
 * @property {String}  [option='default']   - options [default]|reject
 * @property {String}  [mixCls]             - css classes for mix
 * @property {Array}   [children]           - array of additionals element,
 *                                              placement befor text
 * @property {Boolean} [disabled=false]     - array of additionals element
 *
 * @property {function} [clickHandler]      - on click callback function
 */

class Button extends React.Component {
    clickHandler (event) {
        if (this.props.clickHandler) {
            this.props.clickHandler(event);
        }
    }

    render () {
        var {mixCls, children, option: option = 'default', bem} = this.props,
            cls = [bem.mods(option).cls(), 'waves-effect', 'waves-light'].join(' '),
            attributes = {
                disabled: this.props.disabled,
                name: this.props.name
            };

        if (mixCls) {
            cls = [cls, mixCls].join(' ');
        }

        if (attributes.disabled) {
            cls = [cls, bem.mods('disabled').cls()].join(' ');
        }

        return (
            <div className={bem.elem('wrapper').cls()}>
                <button {...attributes} className={cls}
                    onClick={::this.clickHandler}>
                    {children}
                </button>
            </div>
        );
    }
}

Button.defaultProps = {
    bem: new ibem('btn')
}

Button.propTypes = {
    text: React.PropTypes.string
};

export default Button;
