import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// Add routes
app.use('/api', routes);

// Start server
app.listen(port, () => {
	console.log(`Server listens at http://localhost:${port}`);
});

export default app;
