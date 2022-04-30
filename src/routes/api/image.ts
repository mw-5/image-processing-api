import express from 'express';

const image = express.Router();

// Endpoint for serving a scaled image
image.get('/', (req, res) => res.send('Serve an image'));

export default image;
