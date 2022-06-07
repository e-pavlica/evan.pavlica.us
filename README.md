evan.pavlica.us
===============

This is the source for the current version of my personal website,
https://evan.pavlica.us.  It uses [Parcel](https://parceljs.org) for both
development and building a deployment package.

## Development

Dependencies:

- NodeJS 10+

After running `npm install`, `npx parcel serve source/index.pug` will start a
development server.

## Build

Running `npx parcel build source/index.pug` will build a production-ready site
into the `dist` directory.

## Deployment

Run `make` to build a container image and push it to Github's package repo.
