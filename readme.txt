Image processing API

This project sets up an endpoint which returns resized images.
These can be used e.g. as thumbnails.

API first checks whether the resized image is already available. 
If so it will use the cached image. Otherwise it will process the image and cache the resized image in folder assets/thumb for future requests.

Images available for resizing must be placed in the assets/full folder of the project.
Afterwards access the endpoint GET localhost:3000/api/images with a query string as
shown below to have it return the image in the size specified by you.

E.g. on how to use the API:
http://localhost:3000/api/images?filename=icelandwaterfall.jpg&width=100&height=200

To apply prettier and linting and check that TypeScript is valid run:
	npm run checks

To execute test suites run:
	npm run test

To compile TypeScript to JavaScript use:
	npm run build

To start the server for production execute the command:
	node build/.

For development purposes you can also use:
	npm run start
