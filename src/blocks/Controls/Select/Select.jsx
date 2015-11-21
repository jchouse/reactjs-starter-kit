import React from 'react';
import icls from 'blocks/i/icls/icls.jsx';

const blockName = 'select';
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
class Select extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            shown: false,
            selected: props.selected
        };
    }

    selectHandler (event) {
        var {selectHandler, name} = this.props,
            {selectValue} = event.target.dataset;

        if (selectValue) {
            this.setState({
                selected: selectValue,
                shown: false
            });
        }

        if (selectHandler) {
            selectHandler(name, selectValue);
        }
    }

    toggleShow () {
        this.setState({
            shown: !this.state.shown
        });
    }

    render () {
        var {options} = this.props,
            {selected, shown} = this.state,
            optionsArr,
            scrollToSelected = 0,
            styleList,
            cls = blockName,
            firstElem = {};

        if (options) {
            firstElem = options[0];

            if (selected) {
                firstElem = options.filter(opt => opt.value === selected)[0];
            }
            optionsArr = this.renderOptions(options);
        }

        styleList = {
            marginTop: scrollToSelected
        };

        if (shown) {
            cls = icls.cls(blockName, null, 'show');
        }

        return (
            <div className={cls}>
                <div className={icls.elem(blockName, 'content')}>
                    <div className={icls.elem(blockName, 'text')} onClick={this.toggleShow.bind(this)}>
                        {firstElem.text}
                        <span className={icls.elem(blockName, 'arrow')}>^</span>
                    </div>
                    <div className={icls.elem(blockName, 'popup')}>
                        <div style={styleList}
                             className={icls.elem(blockName, 'options')}
                             onClick={this.selectHandler.bind(this)}>
                            {optionsArr}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderOptions (optionsData) {
        var that = this;

        return optionsData.map(function (option, index) {
            let cls = icls.elem(blockName, 'option-elem');

            if (option.value === that.state.selected) {
                cls = icls.cls(blockName, 'option-elem', 'selected');
            }

            return (
                <div key={index} className={cls} data-select-value={option.value}>
                    {option.text}
                </div>
            );
        });
    }
}

Select.propTypes = {options: React.PropTypes.array};

export default Select;
