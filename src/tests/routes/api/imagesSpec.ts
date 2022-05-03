import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);

describe('Test for endpoint GET api/images', () => {
	const route = '/api/images';
	const fileName = 'icelandwaterfall.jpg';
	const width = 100;
	const height = 200;
	const qry = `?filename=${fileName}&width=${width}&height=${height}`;

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
			route + '?filename=noimage.jpg&width=1&height=1'
		);
		expect(response.statusCode).toEqual(404);
	});

	it('expects status code 400 for missing parameters', async () => {
		const response = await request.get(route + `?filename=${fileName}`);
		expect(response.statusCode).toEqual(400);
	});

	it('expects status code 400 for width or height not being a number', async () => {
		const response = await request.get(
			route + `?filename=${fileName}&width=a&height=200px`
		);
		expect(response.statusCode).toEqual(400);
	});
});
