import express from 'express';
import path from 'path';

const images = express.Router();

// Endpoint for serving a resized image
images.get('/', (req, res) =>
	res.sendFile(
		path.resolve(
			'../image-processing-api/assets/thumb/icelandwaterfall-w100-h200.jpg'
		)
	)
);

export default images;
