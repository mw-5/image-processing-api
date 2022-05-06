import convert from '../../utilities/converter';
import path from 'path';
import dirs from '../../utilities/dirs';
import { buildCacheImageName, fileExists } from '../../utilities/utils';
import { promises as fsPromises } from 'fs';

describe('Test of function convert', () => {
	const fileName = 'icelandwaterfall.jpg';
	const pathFileSrcImage = path.join(dirs.FullImages, fileName);
	const width = 200;
	const height = 200;
	const dstImage = buildCacheImageName(fileName, width, height);
	const pathFileDstImage = path.join(dirs.ThumbImages, dstImage);

	// Delete image created by an earlier test
	beforeEach(async () => await cleanUp(pathFileDstImage));

	it('expects image to be written', async () => {
		await convert(pathFileSrcImage, pathFileDstImage, width, height);
		expect(await fileExists(pathFileDstImage)).toBeTrue();
	});

	it('expects to throw error for non-existing input path', async () => {
		const pathMissingFile = path.join(dirs.FullImages, 'missing.jpg');
		await expectAsync(
			convert(pathMissingFile, pathFileDstImage, width, height)
		).toBeRejectedWithError('Source file not found');
	});

	// Delete image created by test
	afterEach(async () => await cleanUp(pathFileDstImage));
});

/**
 * @description Remove test file produced by converter
 * @param pathTestFile - Test file which should be deleted
 */
const cleanUp = async (pathTestFile: string): Promise<void> => {
	if (await fileExists(pathTestFile)) {
		await fsPromises.unlink(pathTestFile);
	}
};
