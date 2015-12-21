import React from 'react';
import ReactDOM from 'react-dom';
import ibem from 'blocks/i/ibem/ibem.jsx';

const blockName = 'btn';

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
        var {mixCls, children, option: option = 'default'} = this.props,
            cls = [blockName, ibem.mod(blockName, option), 'waves-effect', 'waves-light'].join(' '),
            attributes = {
                disabled: this.props.disabled,
                name: this.props.name
            };

        if (mixCls) {
            cls = [cls, mixCls].join(' ');
        }

        if (attributes.disabled) {
            cls = [cls, ibem.mod(blockName, 'disabled')].join(' ');
        }

        return (
            <div className={ibem.cls(blockName, 'wrapper')}>
                <button {...attributes} className={cls}
                    onClick={this.clickHandler.bind(this)}>
                    {children}
                </button>
            </div>
        );
    }
}

Button.propTypes = {
    text: React.PropTypes.string
};

export default Button;
