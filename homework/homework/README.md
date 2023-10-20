uuid CI Browser
For the creation of RFC4122 UUIDs

Complete - Support for RFC4122 version 1, 3, 4, and 5 UUIDs
Cross-platform - Support for ...
CommonJS, ECMAScript Modules and CDN builds
NodeJS 12+ (LTS releases)
Chrome, Safari, Firefox, Edge browsers
Webpack and rollup.js module bundlers
React Native / Expo
Secure - Cryptographically-strong random values
Small - Zero-dependency, small footprint, plays nice with "tree shaking" packagers
CLI - Includes the uuid command line utility
Note Upgrading from uuid@3? Your code is probably okay, but check out Upgrading From uuid@3 for details.

Note Only interested in creating a version 4 UUID? You might be able to use crypto.randomUUID(), eliminating the need to install this library.

Quickstart
To create a random UUID...

1. Install

npm install uuid
2. Create a UUID (ES6 module syntax)

import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
... or using CommonJS syntax:

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
For timestamp UUIDs, namespace UUIDs, and other options read on ...

API Summary
uuid.NIL	The nil UUID string (all zeros)	New in uuid@8.3
uuid.parse()	Convert UUID string to array of bytes	New in uuid@8.3
uuid.stringify()	Convert array of bytes to UUID string	New in uuid@8.3
uuid.v1()	Create a version 1 (timestamp) UUID	
uuid.v3()	Create a version 3 (namespace w/ MD5) UUID	
uuid.v4()	Create a version 4 (random) UUID	
uuid.v5()	Create a version 5 (namespace w/ SHA-1) UUID	
uuid.validate()	Test a string to see if it is a valid UUID	New in uuid@8.3
uuid.version()	Detect RFC version of a UUID	New in uuid@8.3
API
uuid.NIL
The nil UUID string (all zeros).

Example:

import { NIL as NIL_UUID } from 'uuid';

NIL_UUID; // ⇨ '00000000-0000-0000-0000-000000000000'
uuid.parse(str)
Convert UUID string to array of bytes

str	A valid UUID String
returns	Uint8Array[16]
throws	TypeError if str is not a valid UUID
Note: Ordering of values in the byte arrays used by parse() and stringify() follows the left ↠ right order of hex-pairs in UUID strings. As shown in the example below.

Example:

import { parse as uuidParse } from 'uuid';

// Parse a UUID
const bytes = uuidParse('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');

// Convert to hex strings to show byte order (for documentation purposes)
[...bytes].map((v) => v.toString(16).padStart(2, '0')); // ⇨ 
  // [
  //   '6e', 'c0', 'bd', '7f',
  //   '11', 'c0', '43', 'da',
  //   '97', '5e', '2a', '8a',
  //   'd9', 'eb', 'ae', '0b'
  // ]
uuid.stringify(arr[, offset])
Convert array of bytes to UUID string

arr	Array-like collection of 16 values (starting from offset) between 0-255.
[offset = 0]	Number Starting index in the Array
returns	String
throws	TypeError if a valid UUID string cannot be generated
Note: Ordering of values in the byte arrays used by parse() and stringify() follows the left ↠ right order of hex-pairs in UUID strings. As shown in the example below.

Example:

import { stringify as uuidStringify } from 'uuid';

const uuidBytes = [
  0x6e, 0xc0, 0xbd, 0x7f, 0x11, 0xc0, 0x43, 0xda, 0x97, 0x5e, 0x2a, 0x8a, 0xd9, 0xeb, 0xae, 0x0b,
];

uuidStringify(uuidBytes); // ⇨ '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
uuid.v1([options[, buffer[, offset]]])
Create an RFC version 1 (timestamp) UUID

[options]	Object with one or more of the following properties:
[options.node ]	RFC "node" field as an Array[6] of byte values (per 4.1.6)
[options.clockseq]	RFC "clock sequence" as a Number between 0 - 0x3fff
[options.msecs]	RFC "timestamp" field (Number of milliseconds, unix epoch)
[options.nsecs]	RFC "timestamp" field (Number of nanoseconds to add to msecs, should be 0-10,000)
[options.random]	Array of 16 random bytes (0-255)
[options.rng]	Alternative to options.random, a Function that returns an Array of 16 random bytes (0-255)
[buffer]	Array | Buffer If specified, uuid will be written here in byte-form, starting at offset
[offset = 0]	Number Index to start writing UUID bytes in buffer
returns	UUID String if no buffer is specified, otherwise returns buffer
throws	Error if more than 10M UUIDs/sec are requested
Note: The default node id (the last 12 digits in the UUID) is generated once, randomly, on process startup, and then remains unchanged for the duration of the process.

Note: options.random and options.rng are only meaningful on the very first call to v1(), where they may be passed to initialize the internal node and clockseq fields.

Example:

import { v1 as uuidv1 } from 'uuid';

uuidv1(); // ⇨ '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'
Example using options:

import { v1 as uuidv1 } from 'uuid';

const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date('2011-11-01').getTime(),
  nsecs: 5678,
};
uuidv1(v1options); // ⇨ '710b962e-041c-11e1-9234-0123456789ab'
uuid.v3(name, namespace[, buffer[, offset]])
Create an RFC version 3 (namespace w/ MD5) UUID

API is identical to v5(), but uses "v3" instead.

⚠️ Note: Per the RFC, "If backward compatibility is not an issue, SHA-1 [Version 5] is preferred."

uuid.v4([options[, buffer[, offset]]])
Create an RFC version 4 (random) UUID

[options]	Object with one or more of the following properties:
[options.random]	Array of 16 random bytes (0-255)
[options.rng]	Alternative to options.random, a Function that returns an Array of 16 random bytes (0-255)
[buffer]	Array | Buffer If specified, uuid will be written here in byte-form, starting at offset
[offset = 0]	Number Index to start writing UUID bytes in buffer
returns	UUID String if no buffer is specified, otherwise returns buffer
Example:

import { v4 as uuidv4 } from 'uuid';

uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
Example using predefined random values:

import { v4 as uuidv4 } from 'uuid';

const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
  ],
};
uuidv4(v4options); // ⇨ '109156be-c4fb-41ea-b1b4-efe1671c5836'
uuid.v5(name, namespace[, buffer[, offset]])
Create an RFC version 5 (namespace w/ SHA-1) UUID

name	String | Array
namespace	String | Array[16] Namespace UUID
[buffer]	Array | Buffer If specified, uuid will be written here in byte-form, starting at offset
[offset = 0]	Number Index to start writing UUID bytes in buffer
returns	UUID String if no buffer is specified, otherwise returns buffer
Note: The RFC DNS and URL namespaces are available as v5.DNS and v5.URL.

Example with custom namespace:

import { v5 as uuidv5 } from 'uuid';

// Define a custom namespace.  Readers, create your own using something like
// https://www.uuidgenerator.net/
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

uuidv5('Hello, World!', MY_NAMESPACE); // ⇨ '630eb68f-e0fa-5ecc-887a-7c7a62614681'
Example with RFC URL namespace:

import { v5 as uuidv5 } from 'uuid';

uuidv5('https://www.w3.org/', uuidv5.URL); // ⇨ 'c106a26a-21bb-5538-8bf2-57095d1976c1'
uuid.validate(str)
Test a string to see if it is a valid UUID

str	String to validate
returns	true if string is a valid UUID, false otherwise
Example:

import { validate as uuidValidate } from 'uuid';

uuidValidate('not a UUID'); // ⇨ false
uuidValidate('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // ⇨ true
Using validate and version together it is possible to do per-version validation, e.g. validate for only v4 UUIds.

import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

const v1Uuid = 'd9428888-122b-11e1-b85c-61cd3cbb3210';
const v4Uuid = '109156be-c4fb-41ea-b1b4-efe1671c5836';

uuidValidateV4(v4Uuid); // ⇨ true
uuidValidateV4(v1Uuid); // ⇨ false
uuid.version(str)
Detect RFC version of a UUID

str	A valid UUID String
returns	Number The RFC version of the UUID
throws	TypeError if str is not a valid UUID
Example:

import { version as uuidVersion } from 'uuid';

uuidVersion('45637ec4-c85f-11ea-87d0-0242ac130003'); // ⇨ 1
uuidVersion('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // ⇨ 4
Command Line
UUIDs can be generated from the command line using uuid.

$ npx uuid
ddeb27fb-d9a0-4624-be4d-4615062daed4
The default is to generate version 4 UUIDS, however the other versions are supported. Type uuid --help for details:

$ npx uuid --help

Usage:
  uuid
  uuid v1
  uuid v3 <name> <namespace uuid>
  uuid v4
  uuid v5 <name> <namespace uuid>
  uuid --help

Note: <namespace uuid> may be "URL" or "DNS" to use the corresponding UUIDs
defined by RFC4122
ECMAScript Modules
This library comes with ECMAScript Modules (ESM) support for Node.js versions that support it (example) as well as bundlers like rollup.js (example) and webpack (example) (targeting both, Node.js and browser environments).

import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
To run the examples you must first create a dist build of this library in the module root:

npm run build
CDN Builds
ECMAScript Modules
To load this module directly into modern browsers that support loading ECMAScript Modules you can make use of jspm:

<script type="module">
  import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
  console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
</script>
UMD
As of uuid@9 UMD (Universal Module Definition) builds are no longer shipped with this library.

If you need a UMD build of this library, use a bundler like Webpack or Rollup. Alternatively, refer to the documentation of uuid@8.3.2 which was the last version that shipped UMD builds.

Known issues
Duplicate UUIDs (Googlebot)
This module may generate duplicate UUIDs when run in clients with deterministic random number generators, such as Googlebot crawlers. This can cause problems for apps that expect client-generated UUIDs to always be unique. Developers should be prepared for this and have a strategy for dealing with possible collisions, such as:

Check for duplicate UUIDs, fail gracefully
Disable write operations for Googlebot clients
"getRandomValues() not supported"
This error occurs in environments where the standard crypto.getRandomValues() API is not supported. This issue can be resolved by adding an appropriate polyfill:

React Native / Expo
Install react-native-get-random-values
Import it before uuid. Since uuid might also appear as a transitive dependency of some other imports it's safest to just import react-native-get-random-values as the very first thing in your entry point:
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
Note: If you are using Expo, you must be using at least react-native-get-random-values@1.5.0 and expo@39.0.0.

Web Workers / Service Workers (Edge <= 18)
In Edge <= 18, Web Crypto is not supported in Web Workers or Service Workers and we are not aware of a polyfill (let us know if you find one, please).

IE 11 (Internet Explorer)
Support for IE11 and other legacy browsers has been dropped as of uuid@9. If you need to support legacy browsers, you can always transpile the uuid module source yourself (e.g. using Babel).

Upgrading From uuid@7
Only Named Exports Supported When Using with Node.js ESM
uuid@7 did not come with native ECMAScript Module (ESM) support for Node.js. Importing it in Node.js ESM consequently imported the CommonJS source with a default export. This library now comes with true Node.js ESM support and only provides named exports.

Instead of doing:

import uuid from 'uuid';
uuid.v4();
you will now have to use the named exports:

import { v4 as uuidv4 } from 'uuid';
uuidv4();
Deep Requires No Longer Supported
Deep requires like require('uuid/v4') which have been deprecated in uuid@7 are no longer supported.

Upgrading From uuid@3
"Wait... what happened to uuid@4 thru uuid@6?!?"

In order to avoid confusion with RFC version 4 and version 5 UUIDs, and a possible version 6, releases 4 thru 6 of this module have been skipped.

Deep Requires Now Deprecated
uuid@3 encouraged the use of deep requires to minimize the bundle size of browser builds:

const uuidv4 = require('uuid/v4'); // <== NOW DEPRECATED!
uuidv4();
As of uuid@7 this library now provides ECMAScript modules builds, which allow packagers like Webpack and Rollup to do "tree-shaking" to remove dead code. Instead, use the import syntax:

import { v4 as uuidv4 } from 'uuid';
uuidv4();
... or for CommonJS:

const { v4: uuidv4 } = require('uuid');
uuidv4();
Default Export Removed
uuid@3 was exporting the Version 4 UUID method as a default export:

const uuid = require('uuid'); // <== REMOVED!
This usage pattern was already discouraged in uuid@3 and has been removed in uuid@7.

Markdown generated from README_js.md by 