import supertest from 'supertest';
import app from '../../../index';
import {
	PARAM_FILENAME,
	PARAM_WIDTH,
	PARAM_HEIGHT,
} from '../../../routes/api/images';

const request = supertest(app);

describe('Test for endpoint GET api/images', () => {
	const route = '/api/images';
	const fileName = 'icelandwaterfall.jpg';
	const width = 100;
	const height = 200;
	const qry = `?${PARAM_FILENAME}=${fileName}&${PARAM_WIDTH}=${width}&${PARAM_HEIGHT}=${height}`;

	it('expects status code 200 on success', async () => {
		const response = await request.get(route + qry);
		expect(response.statusCode).toEqual(200);
	});

	it('expects response to contain an image', async () => {
		const response = await request.get(route + qry);
		expect(response.type).toEqual('image/jpeg');
	});

	it('expects status code 404 if image is not found', async () => {
		const response = await request.get(
			route +
				`?${PARAM_FILENAME}=noimage.jpg&${PARAM_WIDTH}=1&${PARAM_HEIGHT}=1`
		);
		expect(response.statusCode).toEqual(404);
	});

	it('expects status code 400 for missing parameters', async () => {
		const response = await request.get(
			route + `?${PARAM_FILENAME}=${fileName}`
		);
		expect(response.statusCode).toEqual(400);
	});

	it('expects status code 400 for width or height not being a number', async () => {
		const response = await request.get(
			route +
				`?${PARAM_FILENAME}=${fileName}&${PARAM_WIDTH}=a&${PARAM_HEIGHT}=200px`
		);
		expect(response.statusCode).toEqual(400);
	});
});
