'use strict';

const phoneparser = require( '../index.js' );

const test = require( 'tape' );

test( 'NO COUNTRY SPECIFIED: parse number', t => {
    const parsed = phoneparser.parse( '1-213-308-5555' );
    t.ok( parsed.valid, 'number is valid' );
    t.ok( parsed.country, 'detected country' );
    t.equal( parsed.country.iso3166.alpha3, 'USA', 'correct country detected' );
    t.end();
} );

test( 'NO COUNTRY SPECIFIED: detect country with 2 digit code', t => {
    const parsed = phoneparser.parse( '93712345678' );
    t.ok( parsed.valid, 'number is valid' );
    t.ok( parsed.country, 'detected country' );
    t.equal( parsed.country.iso3166.alpha3, 'AFG', 'correct country detected' );
    t.end();
} );