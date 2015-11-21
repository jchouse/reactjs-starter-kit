jest.dontMock('../Login.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Login = require('../Login.jsx');
const Input = require('blocks/Controls/Input/Input.jsx');
const PasswordInput = require('blocks/Controls/PasswordInput/PasswordInput.jsx');
const ixhr = require('blocks/i/ixhr/ixhr.jsx');
const cookie = require('react-cookie');

describe('Login', () => {
    var login = TestUtils.renderIntoDocument(
        <Login history={{pushState: jest.genMockFunction()}}/>
    );
    var loginDomNode = ReactDOM.findDOMNode(login);
    var result;

    it('should render a div', () => {
        var login1 = TestUtils.renderIntoDocument(
            <Login history={{pushState: jest.genMockFunction()}}/>
        );
        login1.setState({token: false});
        var div = TestUtils.findRenderedDOMComponentWithTag(login1, 'div');

        expect(ReactDOM.findDOMNode(div).innerHTML).toEqual('You are already logged in');
    });

    beforeEach(function () {
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<Login />);
        result = shallowRenderer.getRenderOutput();
    });

    it('should render a form', () => {
        expect(loginDomNode.nodeName).toEqual('FORM');
    });

    it('should render login input row', () => {
        let loginRow = result.props.children[1],
            loginInput = loginRow.props.children[1];

        expect(loginRow.props.children[0]).toEqual('E-mail: ');
        expect(loginInput.type).toEqual(<Input />.type);
        expect(loginInput.props.name).toEqual('login');
    });

    it('should render password input row', () => {
        let passwordRow = result.props.children[2],
            passwordInput = passwordRow.props.children[1];

        expect(passwordRow.props.children[0]).toEqual('Password: ');
        expect(passwordInput.type).toEqual(<PasswordInput />.type);
        expect(passwordInput.props.name).toEqual('password');
    });

    it('should render submit button', () => {
        let submitButton = result.props.children[3];

        expect(submitButton.type).toEqual('button');
        expect(submitButton.props.children).toEqual('Submit');
    });

    it('submit form', function () {
        var body = {
            method: 'POST',
            url: '/api/users/login',
            body: {email: '', password: ''}
        };

        ixhr.send = jest.genMockFunction();
        login.submitForm = jest.genMockFunction();

        TestUtils.Simulate.submit(loginDomNode);

        expect(ixhr.send).toBeCalledWith(body, login.logedInHandler, login.logeedInErrorhandler);
    });

    it('logeed in', function () {
        var res = {xhr: {getResponseHeader: jest.genMockFunction()}},
            token,
            ps = login.props.history.pushState;

        cookie.save = jest.genMockFunction();

        login.logeedInHandler(res);

        expect(cookie.save).toBeCalledWith('token', token);
        expect(ps).toBeCalled();
    });

    it('set error', function () {
        let str = 'error';

        expect(login.state.error).toBeNull();

        login.logeedInErrorhandler(str);
        expect(login.state.error).toEqual(str);
    });

    it('change input', function () {
        var nameEmail = 'email',
            dataEmail = 'test@testing.com';

        login.changeInput(nameEmail, dataEmail);

        expect(login.state.email).toEqual(dataEmail);
    });
});
