import React from 'react';
import ReactDOM from 'react-dom';
import Input from 'blocks/Controls/Input/Input.jsx';
import ibem from 'blocks/i/ibem/ibem.jsx';

const blockName = 'tooltip';
/**
 * Select control
 *
 * @property {Object[]}      options               - options for dropdown list
 * @property {string}        options.text          - text for option item
 * @property {string}        options.value         - value for return in select handler
 * @property {string}        [name]                - control name
 * @property {string}        [selected]            - selected elem, if none shown first
 *
 * @property {function}      [selectHandler]      - on change callback function
 */
class Tooltip extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            defaultValue: this.props.defaultValue,
            list: []
        };
    }

    componentDidMount () {
        window.addEventListener('click', this.hadleOutsideClick.bind(this));
    }

    componentWillUnmount () {
        window.removeEventListener('click', this.hadleOutsideClick.bind(this));
    }

    hadleOutsideClick (e) {
        var elem = ReactDOM.findDOMNode(this),
            {list} = this.state;

        if (!elem.contains(e.target) && list && list.length) {
            ReactDOM.findDOMNode(this.refs.Input).children[0].value = this.props.defaultValue;

            this.setState({
                list: []
            });
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.list) {
            this.setState({
                list: nextProps.list
            });
        }
    }

    selectHandler (value) {
        var {selectHandler} = this.props;

        ReactDOM.findDOMNode(this.refs.Input).children[0].value = value.name;

        if (selectHandler) {
            selectHandler(value);
        }
    }

    render () {
        var {defaultValue} = this.props,
            {list} = this.state,
            cls = blockName;

        if (list.length) {
            cls = ibem.cls(blockName, null, 'shown');
        }

        return (
            <div className={cls}>
                <Input
                    ref='Input'
                    defaultValue={defaultValue}
                    changeHandler={this.props.changeHandler}/>
                <div className={ibem.elem(blockName, 'list')}>
                    {this.renderRows(list)}
                </div>
            </div>
        );
    }

    renderRows (list) {
        var that = this;

        return list.map(function (item, i) {
            return (
                <div key={i} className={ibem.elem(blockName, 'list-item')}
                        onClick={that.selectHandler.bind(that, item.value)}>
                    {item.text}
                </div>
            );
        });
    }
}

export default Tooltip;
