Contributing
Please feel free to file GitHub Issues or propose Pull Requests. We're always happy to discuss improvements to this library!

Testing
npm test
Releasing
Releases are supposed to be done from master, version bumping is automated through standard-version:

npm run release -- --dry-run  # verify output manually
npm run release               # follow the instructions from the output of this command