# hotel-checkin-system

## What you'll need to install:
- express
- inquirer
Run `npm i express inquirer` to install the necessary dependencies

## The only things you should ever need to touch
- `config.js`
- `data/rooms.js`

## How to run
- Through CLI: `node .`
- Through web interface: `npm run start` or `node server`
- Decheckin all persons: `node decheckin` (this makes all rooms not occupied and gets rid of the occupant's name)

**Note**: Do not put real credit card information into any of the things, they are decorative and these are not designed to handle sensitive information. Any information sent without a signed SSL certificate from a Certificate Authority can and *will* be stolen by hackers if you deploy this out to the web.

(if you're wondering, yes, i did make chatgpt do the flexbox styling on `public/rooms.html`, i didnt feel like figuring it out
