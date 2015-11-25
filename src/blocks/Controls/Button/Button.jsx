import React from 'react';
import ReactDOM from 'react-dom';
import ibem from 'blocks/i/ibem/ibem.jsx';

const blockName = 'button';

/**
 * Button
 *
 * @property {String}  text                 - array of additionals element
 * @property {String}  [name]               - array of additionals element
 * @property {String}  [option='default']   - options [default]|reject
 * @property {String}  [mixCls]             - css classes for mix
 * @property {Array}   [children]     - array of additionals element, placement befor text
 * @property {Boolean} [disabled=false]     - array of additionals element
 *
 * @property {function} [clickHandler]      - on click callback function
 */

class Button extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            animate: {
                animate: false,
                top: 0,
                left: 0
            }
        };
    }

    animate (event) {
        if (!this.state.animate.animate) {
            var that = this,
                elem = ReactDOM.findDOMNode(this),
                left = event.pageX - elem.offsetLeft,
                top = event.pageY - elem.offsetTop;

            this.setState({
                animate: {
                    animate: true,
                    left: left,
                    top: top
                }
            });

            setTimeout(function () {
                that.setState({
                    animate: {
                        animate: false,
                        left: 0,
                        top: 0
                    }
                });
            }, 500);
        }
    }

    clickHandler (event) {
        if (this.props.clickHandler) {
            this.props.clickHandler(event);
        }
    }

    render () {
        var {mixCls, text, children, option: option = 'default'} = this.props,
            {animate, left, top} = this.state.animate,
            cls = [blockName, ibem.mod(blockName, option)].join(' '),
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

        if (animate) {
            cls = [cls, ibem.mod(blockName, 'animate')].join(' ');
        }

        return (
            <div className={ibem.cls(blockName, 'wrapper')}>
                <button {...attributes} className={cls}
                    onClick={this.clickHandler.bind(this)}
                    onMouseDown={this.animate.bind(this)}>
                    {children}
                    <span className={ibem.cls(blockName, 'text')}>{text}</span>
                    <i style={{top: top, left: left}} className={ibem.cls(blockName, 'animate')}/>
                </button>
            </div>
        );
    }
}

Button.propTypes = {
    text: React.PropTypes.string
};

export default Button;
