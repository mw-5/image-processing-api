import express from 'express';
import images from './api/images';

const routes = express.Router();

// Add endpoints to routes
routes.use('/images', images);

export default routes;
