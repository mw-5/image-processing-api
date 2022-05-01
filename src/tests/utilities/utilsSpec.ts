import { buildCacheImageName } from '../../utilities/utils';

describe('Function that builds names of resized images', () => {
	it('should build expected name', () => {
		// Arrange
		const originalFileName = 'Test.jpg';
		const width = 100;
		const height = 200;
		const expectedFileName = `Test-w${width}-h${height}.jpg`;

		// Act
		const newFileName = buildCacheImageName(
			originalFileName,
			width,
			height
		);

		// Assert
		expect(expectedFileName).toEqual(newFileName);
	});
});
