jest.dontMock('../icls.jsx');
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const icls = require('blocks/i/icls/icls.jsx');

describe('icls', () => {
    it('block name', () => {
        var block = 'name',
            className;

        className = icls.cls(block);

        expect(className).toEqual(block);
    });

    it('elem name', () => {
        var block = 'name',
            elem = 'elemName',
            className;

        className = icls.cls(block, elem);

        expect(className).toEqual(block + '__' + elem);
    });

    it('block name with mod', () => {
        var block = 'name',
            elem = null,
            mod = 'boolie',
            className;

        className = icls.cls(block, elem, mod);

        expect(className).toEqual(block + ' ' + block + '--' + mod);
    });

    it('block name with mod Array', () => {
        var block = 'name',
            elem = null,
            mod = ['boolie', 'boolie2'],
            className;

        className = icls.cls(block, elem, mod);

        expect(className).toEqual(block + ' ' + block + '--' + mod[0] + ' ' + block + '--' + mod[1]);
    });

    it('elem name with mod String', () => {
        var block = 'name',
            elem = 'elem',
            mod = 'boolie',
            elemName = block + '__' + elem,
            className;

        className = icls.cls(block, elem, mod);

        expect(className).toEqual(elemName + ' ' + elemName + '--' + mod);
    });

    it('elem name with mod Array', () => {
        var block = 'name',
            elem = 'elem',
            mod = ['boolie', 'boolie2'],
            elemName = block + '__' + elem,
            className;

        className = icls.cls(block, elem, mod);

        expect(className).toEqual(elemName + ' ' + elemName + '--' + mod[0] + ' ' + elemName + '--' + mod[1]);
    });

    it('only elem name', () => {
        var block = 'name',
            elem = 'elem',
            className;

        className = icls.elem(block, elem);

        expect(className).toEqual(block + '__' + elem);
    });

    it('only mod name', () => {
        var str = 'name',
            mod = 'elem',
            className;

        className = icls.mod(str, mod);

        expect(className).toEqual(str + '--' + mod);
    });

    it('no DOM elem', () => {
        var icls = TestUtils.renderIntoDocument(
            <icls/>
        );
        var loginDomNode = ReactDOM.findDOMNode(icls);

        expect(loginDomNode.nodeElem).toBeUndefined();
    });

});