'use strict';

const phoneparser = require( '../index.js' );

const test = require( 'tape' );

test( 'FORMATTING: format number without parsing', ( t ) => {
	const formatted = phoneparser.format( '2133085555', '(NNN) NNN-NNNN' );
	t.equal( formatted, '(213) 308-5555', 'formatted number correctly' );
	t.end();
} );

test( 'FORMATTING: format national number', ( t ) => {
	const parsed = phoneparser.parse( '1-213-308-5555', 'USA' );
	t.ok( parsed.valid, 'number is valid' );
	t.equal( parsed.normalized, '+12133085555', 'number normalized correctly' );

	const formatted = parsed.format( '+N (NNN) NNN-NNNN' );
	t.ok( formatted, 'got formatting result' );
	t.equal( formatted, '+1 (213) 308-5555', 'formatted correctly' );
	t.end();
} );

test( 'FORMATTING: format localized number', ( t ) => {
	const parsed = phoneparser.parse( '1-213-308-5555', 'USA' );
	t.ok( parsed.valid, 'number is valid' );
	t.equal( parsed.normalized, '+12133085555', 'number normalized correctly' );
	t.ok( parsed.localized, 'has localized information' );
	t.ok( parsed.localized.stripped, 'has localized stripped number' );

	const formatted = parsed.localized.format( '(NNN) NNN-NNNN' );
	t.ok( formatted, 'got formatting result' );
	t.equal( formatted, '(213) 308-5555', 'formatted correctly' );
	t.end();
} );