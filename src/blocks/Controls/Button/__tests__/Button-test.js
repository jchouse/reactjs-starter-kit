jest.dontMock('../Button.jsx');
jest.dontMock('blocks/i/ibem/ibem.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Button = require('../Button.jsx').default;
const ibem = require('blocks/i/ibem/ibem.jsx').default;

describe('Button', () => {
    const text = 'testText',
          blockName = 'button';

    it('check default render', () => {
        var button = TestUtils.renderIntoDocument(
            <Button text={text}/>
        );
        var blockDomNode = ReactDOM.findDOMNode(button);
        var buttonElem = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
        var textElem = TestUtils.findRenderedDOMComponentWithTag(button, 'span');

        // Wrapper
        expect(blockDomNode.nodeName).toEqual('DIV');
        expect(blockDomNode.className).toEqual(blockName + '__wrapper');

        // Button
        expect(buttonElem.nodeName).toEqual('BUTTON');
        expect(buttonElem.className).toEqual('button button--default');
        expect(buttonElem.name).toEqual('');
        expect(buttonElem.disabled).toBeFalsy();

        // Text elem
        expect(textElem.nodeName).toEqual('SPAN');
        expect(textElem.className).toEqual('button__text');
        expect(textElem.innerHTML).toEqual(text);
    });

    it('on change with clickHandler', function () {
        var button = TestUtils.renderIntoDocument(<Button clickHandler={jest.genMockFunction()}/>),
            butonElem = TestUtils.findRenderedDOMComponentWithTag(button, 'button'),
            node = ReactDOM.findDOMNode(butonElem);

        TestUtils.Simulate.click(node);

        expect(button.props.clickHandler).toBeCalled();
    });

    it('check render with props', () => {
        var props = {
            name: 'name',
            disabled: true,
            mixCls: 'test'
        };
        var button = TestUtils.renderIntoDocument(
            <Button text={text} {...props}/>
        );
        var buttonElem = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));

        // Button
        expect(buttonElem.className).toEqual('button button--default test button--disabled');
        expect(buttonElem.getAttribute('name')).toEqual(props.name);
        expect(buttonElem.disabled).toBeTruthy();
    });

    it('run animate', () => {
        var button = TestUtils.renderIntoDocument(
                <Button text={text} />
            ),
            blockDomNode = ReactDOM.findDOMNode(button),
            butonElem = TestUtils.findRenderedDOMComponentWithTag(button, 'button'),
            node = ReactDOM.findDOMNode(butonElem);

        // Simulate block position in browser
        blockDomNode.offsetLeft = 0;
        blockDomNode.offsetTop = 0;

        TestUtils.Simulate.mouseDown(node, {
            pageX: 0,
            pageY: 0
        });

        expect(button.state.animate.animate).toBeTruthy();

        jest.runAllTimers();

        expect(button.state.animate.animate).toBeFalsy();
    });
});
