import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, IndexRoute} from 'react-router';
import {IntlProvider} from 'react-intl';

import cookie from 'react-cookie';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Login from 'blocks/Login/Login.jsx';
import Registration from 'blocks/Registration/Registration/Registration.jsx';
import Init from 'blocks/Registration/Init/Init.jsx';

class App extends React.Component {
    constructor (props) {
        super(props);
    }

    logOutHandler () {
        cookie.remove('token');

        if (this.props.history) {
            this.props.history.pushState(null, '/');
        }
    }

    render () {
        var loggedIn = cookie.load('token'),
            content;

        if (!loggedIn) {
            content = (
                <ul>
                    <li>
                        <Link to='/login'>Sign in</Link>
                    </li>
                    <li>
                        <Link to='/registration'>Registration</Link>
                    </li>
                </ul>
            );
        } else {
            content = <a href='#' onClick={this.logOutHandler.bind(this)}>logout</a>;
        }

        return (
            <div>
                {content}
                {this.props.children}
            </div>
        );
    }
}

render(
    <IntlProvider locale='en'>
        <Router history={createBrowserHistory()}>
            <Route path='/' component={App}>
                <Route path='login' component={Login} />
                <Route path='registration'>
                    <IndexRoute component={Registration} />
                    <Route path='init/:type' component={Init} />
                </Route>
            </Route>
        </Router>
    </IntlProvider>,
    document.getElementById('content')
);
