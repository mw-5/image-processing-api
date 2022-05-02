import supertest from 'supertest';
import app from '../../../index';

describe('Test for endpoint GET api/images', () => {
	const req = supertest(app);
	const route = 'api/images';
	const fileName = 'icelandwaterfall';
	const ext = 'jpg';
	const width = 100;
	const height = 200;
	const qry = `?filename=${fileName}.${ext}&width=${width}&height=${height}`;

	it('expects status code 200 on success', () => {
		req.get(route + qry).end((err, res) => {
			expect(res.status).toEqual(200);
		});
	});

	it('expects response to contain an image', () => {
		req.get(route + qry).end((err, res) => {
			expect(res.type).toEqual(`image/${ext}`);
		});
	});
});
