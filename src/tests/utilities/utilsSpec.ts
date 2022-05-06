import {
	buildCacheImageName,
	isNumber,
	fileExists,
} from '../../utilities/utils';
import dirs from '../../utilities/dirs';
import path from 'path';

describe('Function that builds names of resized images', () => {
	it('should build expected name', () => {
		// Arrange
		const originalFileName = 'Te.st.jpg';
		const width = 100;
		const height = 200;
		const expectedFileName = `Te.st-w${width}-h${height}.jpg`;

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

describe('Function that checks if string is a number', () => {
	it('expects input to be a number', () => {
		expect(isNumber('42')).toBeTrue();
	});

	it('expects input not to be a number', () => {
		expect(isNumber('a')).toBeFalse();
	});
});

describe('Function fileExists', () => {
	it('expects file to exist', async () => {
		// Arrange
		const testFile = path.resolve(dirs.fullImages, 'icelandwaterfall.jpg');

		// Act
		const isExisting = await fileExists(testFile);

		// Assert
		expect(isExisting).toBeTrue();
	});

	it('expects file to be missing', async () => {
		// Arrange
		const testFile = path.resolve(dirs.fullImages, 'notexisting.jpg');

		// Act
		const isExisting = await fileExists(testFile);

		// Assert
		expect(isExisting).toBeFalse();
	});
});
