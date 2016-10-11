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

test( 'COUNTRY SPECIFIED: parse number from other country', t => {
    const parsed = phoneparser.parse( '93712345678', 'USA' );
    t.ok( parsed.valid, 'number is valid' );
    t.equal( parsed.normalized, '+93712345678', 'number normalized correctly' );
    t.ok( parsed.country, 'detected country' );
    t.equal( parsed.country.iso3166.alpha3, 'AFG', 'correct country detected' );
    t.end();
} );

test( 'COUNTRY SPECIFIED: fail to parse a bad number', t => {
    const parsed = phoneparser.parse( '213-308-55555', 'USA' );
    t.notOk( parsed.valid, 'number is NOT valid' );
    t.end();
} );

test( 'COUNTRY SPECIFIED: ambiguous number defaults to preferred country', t => {

    const AMBIGUOUS_NUMBERS = [
        '2397073073',
        '2487562319',
        '4232313753',
        '4708752927',
        '4782476401',
        '5012869286',
        '5303045200',
        '5408154328',
        '5414148109',
        '6502789194',
        '6518085886',
        '6789938207',
        '9512189721',
        '9513488016',
        '9524522118',
        '9544391616',
        '9564078168'
    ];

    AMBIGUOUS_NUMBERS.forEach( ambiguous_number => {
        const parsed = phoneparser.parse( ambiguous_number, 'USA' );
        t.equal( parsed && parsed.country && parsed.country.iso3166.alpha3, 'USA', `${ ambiguous_number }: got preferred country` );
        if ( ( parsed && parsed.country && parsed.country.iso3166.alpha3 ) !== 'USA' ) {
            console.log( ambiguous_number );
            console.dir( parsed );
        }
    } );

    t.end();
} );