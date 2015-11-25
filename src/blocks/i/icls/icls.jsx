import React from 'react';

class icls extends React.Component {
    /**
     * Make cls for block with elem and mod
     *
     * @param {string} blockName    - block name
     * @param {string} [elem]       - elem name, join with '__'
     * @param {string} [mod]        - mod name, join with '--'
     */
    static cls (blockName, elem, mod) {
        var that = this,
            str = blockName;

        if (elem) {
            str = blockName + '__' + elem;
        }

        if (mod && mod.map) {
            let mods = mod.map((m) => that.mod(str, m)).join(' ');
            str = [str, mods].join(' ');
        } else if (mod) {
            str = [str, that.mod(str, mod)].join(' ');
        }

        return str;
    }

    /**
     * Make cls elem name
     *
     * @param {string} name         - block name
     * @param {string} elem         - elem name, join with '__'
     */
    static elem (name, elem) {
        return name + '__' + elem;
    }

    /**
     * Make mod name
     *
     * @param {string} name         - block or elem name
     * @param {string} elem         - mod name, join with '--'
     */
    static mod (name, mod) {
        return name + '--' + mod;
    }

    render () {}
}

export default icls;
