jest.dontMock('../Hello.jsx');
jest.dontMock('blocks/i/ibem/ibem.jsx');
jest.mock('react-intl-es6/components/FormattedMessage.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const {FormattedMessage} = require('react-intl-es6');
const Hello = require('../Hello.jsx');
const blockName = 'hellow-world';

describe('Hello ', () => {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Hello />);
    var result = shallowRenderer.getRenderOutput();

    it('should render Hello world', () => {
        expect(result.props.className).toEqual(blockName);
        expect(result.props.children.props.className).toEqual(blockName + '__content');
        expect(result.props.children.props.children.type).toEqual(<FormattedMessage id='test' message='test'/>.type);
    });
});
