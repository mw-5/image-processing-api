import express from 'express';
import converter from '../../middleware/converter';
import {
	PARAM_FILENAME as CONVERTER_PARAM_FILENAME,
	PARAM_WIDTH as CONVERTER_PARAM_WIDTH,
	PARAM_HEIGHT as CONVERTER_PARAM_HEIGHT,
} from '../../middleware/converter';

const images = express.Router();
// Endpoint makes its query parameters visible to application
// e.g. for endpoint testing. It takes their names from the
// middleware plugged in because it won't use them here itself.
// That way middleware can easily be mounted to other endpoints.
export const PARAM_FILENAME = CONVERTER_PARAM_FILENAME;
export const PARAM_WIDTH = CONVERTER_PARAM_WIDTH;
export const PARAM_HEIGHT = CONVERTER_PARAM_HEIGHT;

// Manual for user if endpoint is accessed without query
const explaination =
	'This endpoint serves a resized image.\n' +
	'To use this endpoint please provide these parameters as a ' +
	'query string to a GET method:\n\n' +
	`${PARAM_FILENAME} - Name of the image which should be resized\n` +
	`${PARAM_WIDTH} - New width of the image\n` +
	`${PARAM_HEIGHT} - New height of the image\n\n` +
	`e.g.:\n?${PARAM_FILENAME}=myimage.jpg&${PARAM_WIDTH}=100` +
	`&${PARAM_HEIGHT}=200`;

// Endpoint GET /api/images
images.get(
	'/',
	converter,
	(req: express.Request, res: express.Response): void => {
		// Check for errors reported by middleware
		if (res.locals.errMsg !== undefined) {
			res.send(res.locals.errMsg);
			// Send resized image as response
		} else if (res.locals.pathFileThumb !== undefined) {
			res.sendFile(res.locals.pathFileThumb);
			// Endpoint is queried without relevant query string.
			// Send user an explaination on how to use this endpoint.
		} else {
			res.send(explaination);
		}
	}
);

export default images;
