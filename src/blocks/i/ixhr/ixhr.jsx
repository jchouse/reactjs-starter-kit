import React from 'react';
import portals from 'portals';

class ixhr extends React.Component {
    constructor (props) {
        super(props);
    }

    static send (params, thenHandler, catchHandler) {
        var {
            method: method = 'GET',
            url: url = '/',
            headers: headers = {
                'Content-Type': 'application/vnd.movedin-v1+json'
            },
            body: body = ''
        } = params;

        return new portals.Portal().send({
            method: method,
            url: url,
            headers: headers,
            body: body
        }).then(function (res) {
            thenHandler(res);
        })
        .catch(function (res) {
            catchHandler(res);
        });
    }

    render () {}
}

export default ixhr;
