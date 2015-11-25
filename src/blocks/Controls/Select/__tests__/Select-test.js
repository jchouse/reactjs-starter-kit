jest.dontMock('../Select.jsx');
jest.dontMock('blocks/i/ibem/ibem.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Select = require('../Select.jsx');
const ibem = require('blocks/i/ibem/ibem.jsx');

describe('Input', () => {
    var options = [
        {text: 'text0', value: 'value0'},
        {text: 'text1', value: 'value1'}
    ];
    var select = TestUtils.renderIntoDocument(
        <Select options={options}/>
    );
    var shallowRenderer = TestUtils.createRenderer();

    it('should render a select', () => {
        shallowRenderer.render(<Select options={options} />);
        var result = shallowRenderer.getRenderOutput();

        // Wrapper
        expect(result.type).toEqual('div');
        expect(result.props.className).toEqual('select');

        // Content
        var content = result.props.children;
        expect(content.type).toEqual('div');
        expect(content.props.className).toEqual('select__content');

        // Text elem
        var textElem = content.props.children[0];
        expect(textElem.type).toEqual('div');
        expect(textElem.props.className).toEqual('select__text');
        expect(textElem.props.children[0]).toEqual(options[0].text);
        expect(textElem.props.children[1].props.className).toEqual('select__arrow');
        expect(textElem.props.children[1].props.children).toEqual('^');

        // Popup elem
        var popupElem = content.props.children[1];
        expect(popupElem.type).toEqual('div');
        expect(popupElem.props.className).toEqual('select__popup');

        // Options elem
        var optionsElem = popupElem.props.children;
        expect(optionsElem.type).toEqual('div');
        expect(optionsElem.props.className).toEqual('select__options');

        // Options elems
        var optionElem0 = optionsElem.props.children[0],
            optionElem1 = optionsElem.props.children[1];
        expect(optionElem0.type).toEqual('div');
        expect(optionElem0.props.className).toEqual('select__option-elem');
        expect(optionElem0.props['data-select-value']).toEqual(options[0].value);
        expect(optionElem0.props.children).toEqual(options[0].text);
        expect(optionElem1.type).toEqual('div');
        expect(optionElem1.props.className).toEqual('select__option-elem');
        expect(optionElem1.props['data-select-value']).toEqual(options[1].value);
        expect(optionElem1.props.children).toEqual(options[1].text);
    });

    it('show popup', () => {
        var textNode = TestUtils.findRenderedDOMComponentWithClass(select, 'select__text');

        TestUtils.Simulate.click(textNode);

        expect(select.state).toBeTruthy();
    });

    it('select new value with changeHandler', function () {
        var select = TestUtils.renderIntoDocument(
                <Select name='testName' options={options} selectHandler={jest.genMockFunction()}/>
            ),
            selectElem = TestUtils.scryRenderedDOMComponentsWithClass(select, 'select__option-elem')[1],
            textElemNode =  TestUtils.findRenderedDOMComponentWithClass(select, 'select__text'),
            node = ReactDOM.findDOMNode(selectElem),
            str = options[1].value,
            text = options[1].text,
            name = select.props.name;

        expect(textElemNode.childNodes[0].innerHTML).toEqual(options[0].text);

        TestUtils.Simulate.click(node, {target: {dataset: {selectValue: str}}});

        expect(textElemNode.childNodes[0].innerHTML).toEqual(text);
        expect(select.state.selected).toEqual(str);
        expect(select.state.shown).toBeFalsy();
        expect(select.props.selectHandler).toBeCalledWith(name, str);
    });

    it('should render a select with predefine selected', () => {
        var str = options[1].value,
            text = options[1].text,
            select = TestUtils.renderIntoDocument(
                <Select selected={str} options={options}/>
            ),
            textElemNode =  TestUtils.findRenderedDOMComponentWithClass(select, 'select__text');

        expect(textElemNode.childNodes[0].innerHTML).toEqual(text);
    });
});
