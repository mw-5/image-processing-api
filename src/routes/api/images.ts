import express from 'express';
import path from 'path';
import convert from '../../utilities/converter';
import dirs from '../../utilities/dirs';
import {
	buildCacheImageName,
	fileExists,
	isNumber,
} from '../../utilities/utils';

const images = express.Router();
export const PARAM_FILENAME = 'filename';
export const PARAM_WIDTH = 'width';
export const PARAM_HEIGHT = 'height';

/**
 * @description Information retrieved from query string
 */
interface ImageArgs {
	fileNameSrc: string;
	pathFileSrc: string;
	width: number;
	height: number;
	fileNameThumb: string;
	pathFileThumb: string;
}

/**
 * @description Validates the input for the endpoint GET /api/images
 * @param {express.Request} req - The incoming request
 * @returns - Returns a tuple consisting of whether the input is valid,
 * the status code to be returned if invalid and a description of the errors
 */
const validateInput = (req: express.Request): [boolean, number, string] => {
	let isValid = true;
	let statusCode = 0;
	let msg = '';
	const missingArgs: string[] = [];
	const MISSING = ' is missing';
	const NAN = ' is not a number';

	// Check filename
	if (req.query.filename === undefined) {
		missingArgs.push(PARAM_FILENAME + MISSING);
	}

	// Check width
	if (req.query.width === undefined) {
		missingArgs.push(PARAM_WIDTH + MISSING);
	} else if (!isNumber(<string>req.query.width)) {
		missingArgs.push(PARAM_WIDTH + NAN);
	}

	// Check height
	if (req.query.height === undefined) {
		missingArgs.push(PARAM_HEIGHT + MISSING);
	} else if (!isNumber(<string>req.query.height)) {
		missingArgs.push(PARAM_HEIGHT + NAN);
	}

	// If arguments are missing set info for user
	if (missingArgs.length > 0) {
		// Build message for user
		msg = 'Failed to serve image.\n' + 'These parameters caused errors:\n';
		missingArgs.forEach((param) => (msg += `- ${param}\n`));

		// Set status code to 400 bad request
		statusCode = 400;

		// Flag input as invalid
		isValid = false;
	}

	return [isValid, statusCode, msg];
};

/**
 * @description Extract information from query string
 * @param {express.Request} req - The http request
 * @returns {ImageArgs} - The extended data extracted from query string
 */
const extractQryArgs = (req: express.Request): ImageArgs => {
	// src file
	const fileNameSrc = <string>req.query.filename;
	const pathFileSrc = path.join(dirs.FullImages, fileNameSrc);
	// size
	const width = <number>(<unknown>req.query.width);
	const height = <number>(<unknown>req.query.height);
	// thumb file
	const fileNameThumb = buildCacheImageName(fileNameSrc, width, height);
	const pathFileThumb = path.join(dirs.ThumbImages, fileNameThumb);

	return {
		fileNameSrc,
		pathFileSrc,
		width,
		height,
		fileNameThumb,
		pathFileThumb,
	};
};

// Endpoint for serving a resized image
images.get('/', async (req, res): Promise<void> => {
	try {
		// Check input
		const [isValid, statusCode, errMsg] = validateInput(req);

		// Inform user if input is invalid
		if (!isValid) {
			res.statusCode = statusCode;
			res.send(errMsg);
			return;
		}

		// Extract input from query string
		const args = extractQryArgs(req);

		// Convert and cache image if not already cached
		if (!fileExists(args.pathFileThumb)) {
			await convert(
				args.pathFileSrc,
				args.pathFileThumb,
				args.width,
				args.height
			);
		}

		// Send image
		res.sendFile(args.pathFileThumb);
	} catch (err: unknown) {
		console.log(err);
		// Hide server internals from user
		res.statusCode = 500;
		res.send('Sorry, something went wrong.');
	}
});

export default images;
