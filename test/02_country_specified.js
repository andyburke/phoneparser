'use strict';

const phoneparser = require( '../index.js' );

const test = require( 'tape' );

test( 'COUNTRY SPECIFIED: parse complete number', t => {
    const parsed = phoneparser.parse( '1-213-308-5555', 'USA' );
    t.ok( parsed.valid, 'number is valid' );
    t.equal( parsed.normalized, '+12133085555', 'number normalized correctly' );
    t.end();
} );

test( 'COUNTRY SPECIFIED: parse complete but strangely formatted number', t => {
    const parsed = phoneparser.parse( '1(213) 308--5555', 'USA' );
    t.ok( parsed.valid, 'number is valid' );
    t.equal( parsed.normalized, '+12133085555', 'number normalized correctly' );
    t.end();
} );

test( 'COUNTRY SPECIFIED: parse complete number in format: XXX-XXX-XXXX', t => {
    const parsed = phoneparser.parse( '213-308-5555', 'USA' );
    t.ok( parsed.valid, 'number is valid' );
    t.equal( parsed.normalized, '+12133085555', 'number normalized correctly' );
    t.end();
} );

test( 'COUNTRY SPECIFIED: parse complete number in format: (XXX) XXX-XXXX', t => {
    const parsed = phoneparser.parse( '(213) 308-5555', 'USA' );
    t.ok( parsed.valid, 'number is valid' );
    t.equal( parsed.normalized, '+12133085555', 'number normalized correctly' );
    t.end();
} );

test( 'COUNTRY SPECIFIED: parse incomplete number', t => {
    const parsed = phoneparser.parse( '213-308-5555', 'USA' );
    t.ok( parsed.valid, 'number is valid' );
    t.equal( parsed.normalized, '+12133085555', 'number normalized correctly' );
    t.end();
} );

test( 'COUNTRY SPECIFIED: fail to parse a bad number', t => {
    const parsed = phoneparser.parse( '213-308-555', 'USA' );
    t.notOk( parsed.valid, 'number is NOT valid' );
    t.end();
} );

test( 'COUNTRY SPECIFIED: fail to parse a bad number', t => {
    const parsed = phoneparser.parse( '213-308-555', 'USA' );
    t.notOk( parsed.valid, 'number is NOT valid' );
    t.end();
} );