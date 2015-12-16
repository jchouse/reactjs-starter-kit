import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Intl} from 'react-intl-es6';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import iconfig from 'blocks/i/iconfig/iconfig';

import Hello from 'blocks/Hello/Hello.jsx';

class App extends Intl {
    constructor () {
        super (iconfig.intlData.locales, iconfig.intlData.messages);
    }

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

// TODO: Temporary Component
class NotFound extends React.Component {
    render () {
        return <h2>Воу воу полегче, еще не написали :)</h2>;
    }
}

render (
    <Router history={createBrowserHistory()}>
        <Route path='/' component={App}>
            <IndexRoute component={Hello} />
        </Route>
        <Route path='*' component={NotFound} />
    </Router>,
    document.getElementById('content')
);
