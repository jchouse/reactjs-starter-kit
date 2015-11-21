import React from 'react';
import Input from 'blocks/Controls/Input/Input.jsx';

import cookie from 'react-cookie';

const blockName = 'login';

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
            error = str || 'Bad credentials'; // TODO: i18n

        that.setState({
            error: error
        });
    }

    submitForm (e) {
        e.preventDefault();

        console.log('Email: ', this.state.email);
        console.log('Password: ', this.state.password);
    }

    render () {
        var {error, token} = this.state,
            content;

        if (error) {
            error = (
                <div className={blockName + '__error'}>
                    {error}
                </div>
            );
        }

        if (token) {
            // TODO: i18n
            content = (
                <form className={blockName} onSubmit={this.submitForm.bind(this)}>
                    {error}
                    <div>
                        {'E-mail: '}
                        <Input
                            name='login'
                            changeHandler={this.changeInput.bind(this)}/>
                    </div>
                    <div>
                        {'Password: '}
                        <Input
                            name='password'
                            changeHandler={this.changeInput.bind(this)}/>
                    </div>
                    <button name='submit'>Submit</button>
                </form>
            );
        } else {
            // TODO: i18n
            content = (<div className={blockName}>
                You are already logged in
            </div>);
        }

        return (content);
    }

}

export default Login;
