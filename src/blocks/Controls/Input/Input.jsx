import React from 'react';
import icls from 'blocks/i/icls/icls.jsx';

const blockName = 'input';
/**
 * Input control
 *
 * @param {(string|boolean)} [required]
 * @param {string}           [name]
 * @param {string}           [error]
 * @param {string}           [type=text]
 * @param {(string|boolean)} [disabled]
 * @param {string}           [placeholder]
 * @param {string}           [defaultValue]
 *
 * @property {function}      [changeHandler]      - on change callback function
 * @property {function}      [errorHandler]       - externals function for check value, set result to state error
 */
class Input extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            str: '',
            error: props.error || null
        };
    }

    errorHandler (str) {
        var {errorHandler, name} = this.props;

        if (errorHandler) {
            let error = errorHandler(name, str);

            if (error) {
                this.setState({
                    error: error
                });

                return error;
            }
        }
    }

    changeHandler (event) {
        var {changeHandler, name} = this.props,
            str = event.target.value;

        if (changeHandler && !this.errorHandler(str)) {
            changeHandler(name, str);
        }
    }

    /**
     * Fire when resive new props with errors
     */
    componentWillReceiveProps (nextProps) {
        var {error} = nextProps;

        if (error) {
            this.setState({
                error: error
            });
        }
    }

    render () {
        var {required} = this.props,
            {error} = this.state,
            props = {
                className: icls.elem(blockName, 'input'),
                name: this.props.name,
                type: this.props.type || 'text',
                disabled: this.props.disabled,
                placeholder: this.props.placeholder,
                defaultValue: this.props.defaultValue
            },
            cls = blockName;

        if (required) {
            cls = [cls, icls.mod(blockName, 'required')].join(' ');
        }

        if (error) {
            cls = [cls, icls.mod(blockName, 'error')].join(' ');
        }

        return (
            <div className={cls}>
                <input
                    {...props}
                    onChange={this.changeHandler.bind(this)}/>
                <div className={icls.elem(blockName, 'error')}>
                    {error}
                </div>
            </div>
        );
    }
}

export default Input;
