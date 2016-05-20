import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Intl} from 'react-intl-es6';

import Hello from 'blocks/Hello/Hello.jsx';

class App extends Intl {
    constructor () {
        super (intlData.locales, intlData.messages);
    }

    render () {
        return (
            <div className='content'>
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
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Hello} />
        </Route>
        <Route path='*' component={NotFound} />
    </Router>,
    document.getElementById('content')
);
