import express from 'express';

const images = express.Router();

// Endpoint for serving a scaled image
images.get('/', (req, res) => res.send('Serve an image'));

export default images;
