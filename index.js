'use strict';

const countrydata = require( 'countrydata' );
const extend = require( 'extend' );

const ALLOW_LEADING_ZEROES = [
	'GAB',
	'CIV',
	'COG'
];

const phoneparser = module.exports = {
	strip: ( input ) => {
		const trimmed = input.trim();
		const non_numbers_removed = trimmed.replace( /\D/g, '' );
		return non_numbers_removed;
	},

	format: ( input, formatting ) => {
		const formatted = formatting.split( '' );
		let inputIndex = 0;
		for ( let index = 0, length = formatting.length; index < length; ++index ) {
			if ( formatting[ index ] === 'N' ) {
				formatted[ index ] = input[ inputIndex++ ];
			}
		}

		return formatted.join( '' );
	},

	parse: ( input, country_code ) => {
		const stripped = phoneparser.strip( input );
		const possible_countries = countrydata.all().filter( ( country ) => {
			const phone_info = country.phone;
			if ( stripped.indexOf( phone_info.code ) === 0 ) {
				const valid_lengths = phone_info.lengths.map( ( length ) => ( length + phone_info.code.length ) );
				const is_valid_length = valid_lengths.indexOf( stripped.length ) !== -1;
				const has_valid_prefix = Object.keys( phone_info.prefixes ).reduce( ( _has_valid_prefix, prefix ) => ( _has_valid_prefix || stripped.indexOf( phone_info.code + prefix ) === 0 ), false );
				if ( is_valid_length && has_valid_prefix ) {
					return true;
				}
			}

			const is_valid_length_forcountry = phone_info.lengths.some( ( length ) => ( length === stripped.length ) );

			if ( !is_valid_length_forcountry ) {
				return false;
			}

			const valid_prefix = Object.keys( phone_info.prefixes ).some( ( prefix ) => ( stripped.indexOf( prefix ) === 0 ) );

			return valid_prefix;
		} );

		const country = possible_countries.find( ( country ) => ( country && country.iso3166 && country.iso3166.alpha3 === country_code ) ) || possible_countries[ 0 ] || null;

		let normalized = stripped;

		if ( ALLOW_LEADING_ZEROES.indexOf( country_code ) === -1 ) {
			normalized = normalized.replace( /^0+/, '' );
		}

		// if input 89234567890, RUS, remove the 8
		if ( country_code === 'RUS' && normalized.length === 11 && normalized.indexOf( '89' ) === 0 ) {
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

			Object.keys( country.phone.prefixes ).some( ( prefix ) => {
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
			normalized: valid ? `+${ normalized }` : normalized,
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