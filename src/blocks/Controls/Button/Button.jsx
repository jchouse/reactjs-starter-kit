import React from 'react';
import ReactDOM from 'react-dom';
import icls from 'blocks/i/icls/icls.jsx';

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
        }
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

    render() {
        var {blockName, mixCls, text, children, option: option = 'default' } = this.props,
            {animate, left, top} = this.state.animate,
            cls = [blockName, icls.mod(blockName, option)].join(' '),
            attributes = {
                disabled: this.props.disabled,
                name: this.props.name
            };


        if (mixCls) {
            cls = [cls, mixCls].join(' ');
        }

        if (attributes.disabled) {
            cls = [cls, icls.mod(blockName, 'disabled')].join(' ');
        }

        if (animate) {
            cls = [cls, icls.mod(blockName, 'animate')].join(' ');
        }

        return (
            <div className={icls.cls(blockName, 'wrapper')}>
                <button {...attributes} className={cls}
                    onClick={this.clickHandler.bind(this)}
                    onMouseDown={this.animate.bind(this)}>
                    {children}
                    <span className={icls.cls(blockName, 'text')}>{text}</span>
                    <i style={{top: top, left: left}} className={icls.cls(blockName, 'animate')}/>
                </button>
            </div>
        );
    }
}

Button.propTypes = {
    blockName: React.PropTypes.string,
    text: React.PropTypes.string
};
Button.defaultProps = { blockName: 'button' };

export default Button;
