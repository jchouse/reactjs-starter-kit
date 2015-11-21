import React from 'react';
import Input from 'blocks/Controls/Input/Input.jsx';
import PasswordInput from 'blocks/Controls/PasswordInput/PasswordInput.jsx';

import cookie from 'react-cookie';
import ixhr from 'blocks/i/ixhr/ixhr.jsx';

class Login extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            error: null,
            token: !cookie.load('token')
        };
    }

    changeInput (name, value) {
        var data = {};

        data[name] = value;

        this.setState(data);
    }

    logeedInHandler (res) {
        cookie.save('token', res.xhr.getResponseHeader('X-AUTH-TOKEN'));

        if (this.props.history) {
            this.props.history.pushState(null, '/');
        }
    }

    logeedInErrorhandler (str) {
        var that = this,
            error = str || 'Bad credentials'; //TODO: i18n

        that.setState({
            error: error
        })
    }


    submitForm (e) {
        e.preventDefault();
        var params = {
            method: 'POST',
            url: '/api/users/login',
            body: {
                email: this.state.login,
                password: this.state.password
            }
        };

        ixhr.send(params, this.logeedInHandler.bind(this), this.logeedInErrorhandler.bind(this));
    }

    render () {
        var {blockName} = this.props,
            {error, token} = this.state,
            content;

        if (error) {
            error = (
                <div className={blockName + '__error'}>
                    {error}
                </div>
            );
        }

        if (token) {
            //TODO: i18n
            content = (
                <form className={blockName} onSubmit={this.submitForm.bind(this)}>
                    {error}
                    <div>
                        {'E-mail: '}
                        <Input
                            name='login'
                            placeholder='login@domen.com'
                            changeHandler={this.changeInput.bind(this)}/>
                    </div>
                    <div>
                        {'Password: '}
                        <PasswordInput
                            name='password'
                            changeHandler={this.changeInput.bind(this)}/>
                    </div>
                    <button name='submit'>Submit</button>
                </form>
            );
        } else {
            //TODO: i18n
            content = <div className={blockName}>
                You are already logged in
            </div>
        }

        return (content);
    }

}

Login.propTypes = { blockName: React.PropTypes.string };

Login.defaultProps = { blockName: 'login' };

export default Login;
