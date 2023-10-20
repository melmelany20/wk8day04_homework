Changelog
All notable changes to this project will be documented in this file. See standard-version for commit guidelines.

9.0.1 (2023-09-12)
build
Fix CI to work with Node.js 20.x
9.0.0 (2022-09-05)
⚠ BREAKING CHANGES
Drop Node.js 10.x support. This library always aims at supporting one EOLed LTS release which by this time now is 12.x which has reached EOL 30 Apr 2022.

Remove the minified UMD build from the package.

Minified code is hard to audit and since this is a widely used library it seems more appropriate nowadays to optimize for auditability than to ship a legacy module format that, at best, serves educational purposes nowadays.

For production browser use cases, users should be using a bundler. For educational purposes, today's online sandboxes like replit.com offer convenient ways to load npm modules, so the use case for UMD through repos like UNPKG or jsDelivr has largely vanished.

Drop IE 11 and Safari 10 support. Drop support for browsers that don't correctly implement const/let and default arguments, and no longer transpile the browser build to ES2015.

This also removes the fallback on msCrypto instead of the crypto API.

Browser tests are run in the first supported version of each supported browser and in the latest (as of this commit) version available on Browserstack.

Features
optimize uuid.v1 by 1.3x uuid.v4 by 4.3x (430%) (#597) (3a033f6)
remove UMD build (#645) (e948a0f), closes #620
use native crypto.randomUUID when available (#600) (c9e076c)
Bug Fixes
add Jest/jsdom compatibility (#642) (16f9c46)
change default export to named function (#545) (c57bc5a)
handle error when parameter is not set in v3 and v5 (#622) (fcd7388)
run npm audit fix (#644) (04686f5)
upgrading from uuid3 broken link (#568) (1c849da)
build
drop Node.js 8.x from babel transpile target (#603) (aa11485)

drop support for legacy browsers (IE11, Safari 10) (#604) (0f433e5)

drop node 10.x to upgrade dev dependencies (#653) (28a5712), closes #643

8.3.2 (2020-12-08)
Bug Fixes
lazy load getRandomValues (#537) (16c8f6d), closes #536
8.3.1 (2020-10-04)
Bug Fixes
support expo>=39.0.0 (#515) (c65a0f3), closes #375
8.3.0 (2020-07-27)
Features
add parse/stringify/validate/version/NIL APIs (#479) (0e6c10b), closes #475 #478 #480 #481 #180
8.2.0 (2020-06-23)
Features
improve performance of v1 string representation (#453) (0ee0b67)
remove deprecated v4 string parameter (#454) (88ce3ca), closes #437
support jspm (#473) (e9f2587)
Bug Fixes
prepare package exports for webpack 5 (#468) (8d6e6a5)
8.1.0 (2020-05-20)
Features
improve v4 performance by reusing random number array (#435) (bf4af0d)
optimize V8 performance of bytesToUuid (#434) (e156415)
Bug Fixes
export package.json required by react-native and bundlers (#449) (be1c8fe), closes ai/nanoevents#44 #444
8.0.0 (2020-04-29)
⚠ BREAKING CHANGES
For native ECMAScript Module (ESM) usage in Node.js only named exports are exposed, there is no more default export.

-import uuid from 'uuid';
-console.log(uuid.v4()); // -> 'cd6c3b08-0adc-4f4b-a6ef-36087a1c9869'
+import { v4 as uuidv4 } from 'uuid';
+uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
Deep requiring specific algorithms of this library like require('uuid/v4'), which has been deprecated in uuid@7, is no longer supported.

Instead use the named exports that this module exports.

For ECMAScript Modules (ESM):

-import uuidv4 from 'uuid/v4';
+import { v4 as uuidv4 } from 'uuid';
uuidv4();
For CommonJS:

-const uuidv4 = require('uuid/v4');
+const { v4: uuidv4 } = require('uuid');
uuidv4();
Features
native Node.js ES Modules (wrapper approach) (#423) (2d9f590), closes #245 #419 #342
remove deep requires (#426) (daf72b8)
Bug Fixes
add CommonJS syntax example to README quickstart section (#417) (e0ec840)
7.0.3 (2020-03-31)
Bug Fixes
make deep require deprecation warning work in browsers (#409) (4b71107), closes #408
7.0.2 (2020-03-04)
Bug Fixes
make access to msCrypto consistent (#393) (8bf2a20)
simplify link in deprecation warning (#391) (bb2c8e4)
update links to match content in readme (#386) (44f2f86)
7.0.1 (2020-02-25)
Bug Fixes
clean up esm builds for node and browser (#383) (59e6a49)
provide browser versions independent from module system (#380) (4344a22), closes #378
7.0.0 (2020-02-24)
⚠ BREAKING CHANGES
The default export, which used to be the v4() method but which was already discouraged in v3.x of this library, has been removed.
Explicitly note that deep imports of the different uuid version functions are deprecated and no longer encouraged and that ECMAScript module named imports should be used instead. Emit a deprecation warning for people who deep-require the different algorithm variants.
Remove builtin support for insecure random number generators in the browser. Users who want that will have to supply their own random number generator function.
Remove support for generating v3 and v5 UUIDs in Node.js<4.x
Convert code base to ECMAScript Modules (ESM) and release CommonJS build for node and ESM build for browser bundlers.
Features
add UMD build to npm package (#357) (4e75adf), closes #345
add various es module and CommonJS examples (b238510)
ensure that docs are up-to-date in CI (ee5e77d)
hybrid CommonJS & ECMAScript modules build (a3f078f)
remove insecure fallback random number generator (3a5842b), closes #173
remove support for pre Node.js v4 Buffer API (#356) (b59b5c5)
rename repository to github:uuidjs/uuid (#351) (c37a518), closes #338
Bug Fixes
add deep-require proxies for local testing and adjust tests (#365) (7fedc79)
add note about removal of default export (#372) (12749b7), closes #370
deprecated deep requiring of the different algorithm versions (#361) (c0bdf15)
3.4.0 (2020-01-16)
Features
rename repository to github:uuidjs/uuid (#351) (e2d7314), closes #338
3.3.3 (2019-08-19)
Bug Fixes
no longer run ci tests on node v4
upgrade dependencies
3.3.2 (2018-06-28)
Bug Fixes
typo (305d877)
3.3.1 (2018-06-28)
Bug Fixes
fix #284 by setting function name in try-catch (f2a60f2)
3.3.0 (2018-06-22)
Bug Fixes
assignment to readonly property to allow running in strict mode (#270) (d062fdc)
fix #229 (c9684d4)
Get correct version of IE11 crypto (#274) (153d331)
mem issue when generating uuid (#267) (c47702c)
Features
enforce Conventional Commit style commit messages (#282) (cc9a182)
3.2.1 (2018-01-16)
Bug Fixes
use msCrypto if available. Fixes #241 (#247) (1fef18b)
3.2.0 (2018-01-16)
Bug Fixes
remove mistakenly added typescript dependency, rollback version (standard-version will auto-increment) (09fa824)
use msCrypto if available. Fixes #241 (#247) (1fef18b)
Features
Add v3 Support (#217) (d94f726)
3.1.0 (2017-06-17)
Bug Fixes
(fix) Add .npmignore file to exclude test/ and other non-essential files from packing. (#183)
Fix typo (#178)
Simple typo fix (#165)
Features
v5 support in CLI (#197)
V5 support (#188)
3.0.1 (2016-11-28)
split uuid versions into separate files
3.0.0 (2016-11-17)
remove .parse and .unparse
2.0.0
Removed uuid.BufferClass
1.4.0
Improved module context detection
Removed public RNG functions
1.3.2
Improve tests and handling of v1() options (Issue #24)
Expose RNG option to allow for perf testing with different generators
1.3.0
Support for version 1 ids, thanks to @ctavan!
Support for node.js crypto API
De-emphasizing performance in favor of a) cryptographic quality PRNGs where available and b) more manageable code