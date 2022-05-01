import supertest from 'supertest';
import app from '../../../index';

describe('Tests for endpoint GET api/images', () => {
	const req = supertest(app);
	const route = 'api/images?a=b';

	it('expects status code 200 on success', () => {
		req.get(route).end((err, res) => {
			expect(res.status).toEqual(200);
		});
	});
});
