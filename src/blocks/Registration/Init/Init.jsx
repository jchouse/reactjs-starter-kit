import React from 'react';
import {FormattedMessage} from 'react-intl';
import cookie from 'react-cookie';
import ibem from 'blocks/i/ibem/ibem.jsx';
import Input from 'blocks/Controls/Input/Input.jsx';
import Button from 'blocks/Controls/Button/Button.jsx';

const blockName = 'Init';

class Init extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            formData: {},
            error: null,
            successInfo: null,
            errorInfo: null
        };
    }

    componentDidMount () {
        if (cookie.load('token')) {
            this.props.history.pushState(null, '/');
        }
    }

    validateEmail () {
        var {email} = this.state.formData,
            re = re = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i),
            error = false;

        console.log(email);

        if (!re.test(email)) {
            error = (
                <FormattedMessage
                    id='Registration.wrongEmail'
                    defaultMessage='Wrong format of email'/>
            );
        }

        return error;
    }

    sendedHandler () {
        this.setState({
            successInfo: <FormattedMessage
                            id='Registration.checkEmail'
                            defaultMessage='Check your email for invitation to continue registration'/>
        });
    }

    sendedHandlerError (res) {
        var messageProps = {
                id: 'Registration.goingWrong',
                defaultMessage: 'Sorry but something going wrong'
            },
            errorMsg = JSON.parse(res.body).errorMessages.registrationProblems || '';

        if (~errorMsg.indexOf('already registered')) {
            messageProps = {
                id: 'Registration.alreadyRegistered',
                defaultMessage: 'User with this email already registered'
            };
        }

        this.setState({
            errorInfo: <FormattedMessage {...messageProps}/>
        });
    }

    changeInput (name, value) {
        var {formData} = this.state;

        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    submitForm (e) {
        e.preventDefault();
        var error = this.validateEmail();

        if (error) {
            this.setState({
                error: error
            });

            return;
        } else {
            this.setState({
                error: null
            });
        }

        console.log(this.state.formData);
    }

    render () {
        var {type} = this.props.params,
            {error, successInfo, errorInfo} = this.state,
            rowCls = ibem.cls(blockName, 'row'),
            errorStr,
            content;

        if (error) {
            errorStr = (
                <div className={blockName + '__error'}>
                    {error}
                </div>
            );
        }

        if (type === 'user') {
            content = (
                <form className={blockName} onSubmit={this.submitForm.bind(this)}>
                    <div className={rowCls}>
                        <FormattedMessage
                            id='Registration.firstName'
                            defaultMessage='First name'/>
                        <Input
                            required={true}
                            name='firstName'
                            changeHandler={this.changeInput.bind(this)}/>
                    </div>
                    <div className={rowCls}>
                        <FormattedMessage
                            id='Registration.lastName'
                            defaultMessage='Last name'/>
                        <Input
                            name='lastName'
                            changeHandler={this.changeInput.bind(this)}/>
                    </div>
                    <div className={rowCls}>
                        <FormattedMessage
                            id='Registration.email'
                            defaultMessage='E-mail Adress'/>
                        <Input
                            name='email'
                            type='email'
                            changeHandler={this.changeInput.bind(this)}/>
                    </div>
                    <div className={rowCls}>
                        <FormattedMessage
                            id='Registration.password'
                            defaultMessage='Password'/>
                        <Input
                            name='password'
                            type='password'
                            changeHandler={this.changeInput.bind(this)}/>
                    </div>
                    {errorStr}
                    <Button text='Submit' />
                </form>
            );
        } else {
            content = (
                <div className={blockName}>
                    Agent registration comming soon
                </div>
            );
        }

        if (successInfo) {
            content = (
                <div className={blockName}>
                    {successInfo}
                </div>
            );
        } else if (errorInfo) {
            content = (
                <div className={blockName}>
                    {errorInfo}
                </div>
            );
        }

        return content;
    }
}

export default Init;
