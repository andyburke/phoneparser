'use strict';

const countrydata = require( 'countrydata' );
const extend = require( 'extend' );

const allowLeadingZeroes = [
    'GAB',
    'CIV',
    'COG'
];

const phoneparser = module.exports = {
    strip: ( input ) => {
        const trimmed = input.trim();
        const nonNumbersRemoved = trimmed.replace( /\D/g, '' );
        return nonNumbersRemoved;
    },

    format: ( input, formatting ) => {
        let formatted = formatting.split( '' );
        let inputIndex = 0;
        for ( let index = 0, length = formatting.length; index < length; ++index ) {
            if ( formatting[ index ] === 'N' ) {
                formatted[ index ] = input[ inputIndex++ ];
            }
        }

        return formatted.join( '' );
    },

    parse: ( input, countryCode ) => {
        const stripped = phoneparser.strip( input );
        const country = countryCode ? countrydata.get( countryCode ) : countrydata.get( {
            test: ( _country ) => {
                const phoneInfo = _country.phone;
                if ( stripped.indexOf( phoneInfo.code ) === 0 ) {
                    const validLengths = phoneInfo.lengths.map( length => length + phoneInfo.code.length );
                    if ( validLengths.indexOf( stripped.length ) !== -1 ) {
                        return true;
                    }
                }

                return false;
            }
        } );

        if ( countryCode && !country ) {
            throw new Error( `no country found for country code: ${countryCode}` );
        }

        let normalized = stripped;

        if ( allowLeadingZeroes.indexOf( countryCode ) === -1 ) {
            normalized = normalized.replace( /^0+/, '' );
        }

        // if input 89234567890, RUS, remove the 8
        if ( countryCode === 'RUS' && normalized.length === 11 && normalized.indexOf( '89' ) === 0 ) {
            normalized = normalized.slice( 1 );
        }

        // if the phone number is the length of an in-country number for the selected country (ie:
        // it's missing the country code), add the country code on the front.
        if ( country && country.phone.lengths.indexOf( normalized.length ) !== -1 ) {
            normalized = country.phone.code + normalized;
        }

        let valid = !!country;
        let info = null;
        let localized = null;

        if ( country ) {
            localized = normalized.slice( country.phone.code.length );
            if ( country.phone.lengths.indexOf( localized.length ) === -1 ) {
                valid = false;
            }

            Object.keys( country.phone.prefixes ).some( prefix => {
                if ( localized.indexOf( prefix ) === 0 ) {
                    info = extend( true, {
                        prefix: prefix
                    }, country.phone.prefixes[ prefix ] );
                    return true;
                }

                return false;
            } );
        }

        return {
            valid: valid,
            normalized: valid ? `+${normalized}` : normalized,
            stripped: stripped,
            format: phoneparser.format.bind( null, stripped ),
            localized: {
                stripped: localized,
                format: phoneparser.format.bind( null, localized )
            },
            info: info,
            country: country
        };
    }
};