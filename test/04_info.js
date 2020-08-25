'use strict';

const phoneparser = require( '../index.js' );

const test = require( 'tape' );

test( 'INFO: parse complete number', ( t ) => {
	const parsed = phoneparser.parse( '1-213-308-5555', 'USA' );
	t.ok( parsed.valid, 'number is valid' );
	t.equal( parsed.normalized, '+12133085555', 'number normalized correctly' );
	t.ok( parsed.info, 'has info' );
	t.equal( parsed.info.prefix, '213', 'detected prefix' );
	t.ok( parsed.info.type, 'has type' );
	t.end();
} );