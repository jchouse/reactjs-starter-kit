jest.dontMock('../Input.jsx');
jest.dontMock('blocks/i/icls/icls.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Input = require('../Input.jsx');
const icls = require('blocks/i/icls/icls.jsx');

describe('Input', () => {
    it('check default render', () => {
        var input = TestUtils.renderIntoDocument(
            <Input />
        );
        var blockDomNode = ReactDOM.findDOMNode(input);
        var inputElem = TestUtils.findRenderedDOMComponentWithTag(input, 'input');

        // Wrapper
        expect(blockDomNode.nodeName).toEqual('DIV');
        expect(blockDomNode.className).toEqual('input');

        // Input
        expect(inputElem.nodeName).toEqual('INPUT');
        expect(inputElem.className).toEqual('input__input');
        expect(inputElem.name).toEqual('');
        expect(inputElem.defaultValue).toEqual('');
        expect(inputElem.type).toEqual('text');
        expect(inputElem.disabled).toBeFalsy();
        expect(inputElem.placeholder).toBeUndefined('');
    });

    it('on change with onChangeHandler', function () {
        var input = TestUtils.renderIntoDocument(<Input name='testName' changeHandler={jest.genMockFunction()}/>),
            inputElem = TestUtils.findRenderedDOMComponentWithTag(input, 'input'),
            node = ReactDOM.findDOMNode(inputElem),
            str = 'testStr',
            name = input.props.name;

        TestUtils.Simulate.change(node, {target: {value: str}});

        expect(input.props.changeHandler).toBeCalledWith(name, str);
    });

    it('error from parent', function () {
        var errorString = 'That is ERROR';
        var errorString2 = 'That is ERROR 2';
        var TestParent = React.createFactory(React.createClass({
                            getInitialState: function () {
                                return {inputError: errorString};
                            },
                            render: function () {
                                return <Input ref='input' error={this.state.inputError}/>;
                            }
                        }));

        var parent = TestUtils.renderIntoDocument(TestParent());
        expect(parent.refs.input.props.error).toEqual(errorString);

        parent.setState({
            inputError: errorString2
        });
        expect(parent.refs.input.props.error).toEqual(errorString2);
    });

    it('error handler', function () {
        var error = 'Error',
            input = TestUtils.renderIntoDocument(
                <Input
                    name='testName'
                    changeHandler={jest.genMockFunction()}
                    errorHandler={jest.genMockFunction().mockReturnValue(error)}
                    />
            ),
            inputElem = TestUtils.findRenderedDOMComponentWithTag(input, 'input'),
            node = ReactDOM.findDOMNode(inputElem),
            str = 'testStr',
            name = input.props.name;

        TestUtils.Simulate.change(node, {target: {value: str}});

        expect(input.state.error).toEqual(error);
        expect(input.props.errorHandler).toBeCalledWith(name, str);
    });

    it('check render with props', () => {
        var props = {
            name: 'password',
            type: 'password',
            disabled: true,
            defaultValue: 'Passw0rd',
            placeholder: 'Set password',
            required: true
        };
        var input = TestUtils.renderIntoDocument(
            <Input {...props}/>
        );
        var blockDomNode = ReactDOM.findDOMNode(input);
        var inputElem = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(input, 'input'));

        expect(blockDomNode.className).toEqual('input input--required');

        // Input
        expect(inputElem.nodeName).toEqual('INPUT');
        expect(inputElem.className).toEqual('input__input');

        expect(inputElem.getAttribute('name')).toEqual(props.name);
        expect(inputElem.defaultValue).toEqual(props.defaultValue);
        expect(inputElem.getAttribute('placeholder')).toEqual(props.placeholder);
        expect(inputElem.getAttribute('type')).toEqual(props.type);
        expect(inputElem.disabled).toBeTruthy();
    });
});
