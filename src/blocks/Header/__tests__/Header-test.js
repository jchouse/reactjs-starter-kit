jest.dontMock('../Header.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Header = require('../Header.jsx');

describe('Header', () => {
    var header = TestUtils.renderIntoDocument(
        <Header/>
    );

    var headerDomNode = ReactDOM.findDOMNode(header);


    it('should render a heading with the given text', () => {
        expect(headerDomNode).not.toBeNull();
    });

});
