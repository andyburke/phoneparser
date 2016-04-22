## phoneparser

A parser for phone numbers.

## Code Example

```javascript
const phoneparser = require( 'phoneparser' );

const phone = phoneparser.parse( '1 (800) 888-8888' );
console.log( JSON.stringify( phone, null, 4 ) );
```

Output:

```json
{
    "valid": true,
    "normalized": "+93712345678",
    "stripped": "93712345678",
    "localized": {
        "stripped": "712345678"
    },
    "info": {
        "prefix": "7",
        "type": "mobile"
    },
    "country": {
        "name": {
            "de": "Afghanistan",
            "es": "Afganistán",
            "fr": "Afghanistan",
            "ja": "アフガニスタン",
            "it": "Afghanistan",
            "en": "Afghanistan"
        },
        "iso3166": {
            "alpha2": "AF",
            "alpha3": "AFG",
            "independent": true,
            "name": "Afghanistan",
            "numeric": 4,
            "currency": {
                "name": "Afghani",
                "code": "AFN",
                "numeric": 971,
                "minor_unit": 2
            }
        },
        "phone": {
            "code": "93",
            "lengths": [
                9
            ],
            "prefixes": {
                "7": {
                    "type": "mobile"
                }
            }
        },
        "latitude": 33,
        "longitude": 65,
        "timezones": [
            "UTC+04:30"
        ],
        "area": 652230,
        "population": 26023100,
        "region": "Asia",
        "subregion": "Southern Asia"
    }
}
```

## Installation

```bash
npm install --save phoneparser
```

## Tests

```bash
npm run test
```

## Contributing

Contributions are encouraged and appreciated. To make the process as quick and painless as possible for everyone involved, here's a checklist that will make a pull request easily accepted:

1. Implement your new feature or bugfix
2. Add or update tests to ensure coverage
3. Ensure your code passes jshint according to the .jshintrc
4. Ensure your code is formatted according to the .jsbeautifyrc
5. Submit

## License

MIT

## Inspiration

https://github.com/aftership/phone

Inspired by the 'phone' library. Many thanks to aftership.com for a great example.