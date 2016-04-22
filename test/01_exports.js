'use strict';

const phoneparser = require( '../index.js' );

const test = require( 'tape' );

test( 'EXPORTS: exports as expected', t => {
    t.equal( typeof phoneparser, 'object', 'exports an object' );
    t.ok( phoneparser, 'exports defined value' );
    t.equal( typeof phoneparser.strip, 'function', 'has "strip" method' );
    t.equal( typeof phoneparser.format, 'function', 'has "format" method' );
    t.equal( typeof phoneparser.parse, 'function', 'has "parse" method' );
    t.end();
} );