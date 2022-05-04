import sharp from 'sharp';
import { promises as fsPromises } from 'fs';

/**
 * @description Resize an image and cache it
 * @param pathFileSrcImage - The path and file name of the source file
 * @param pathFileDstImage - The path and file name used to save the new image
 * @param width - The desired width of the image
 * @param height - The desired height of the image
 */
const convert = async (
	pathFileSrcImage: string,
	pathFileDstImage: string,
	width: number,
	height: number
): Promise<void> => {
	const buffer = await sharp(pathFileSrcImage)
		.resize(width, height)
		.toBuffer();
	await fsPromises.writeFile(pathFileDstImage, buffer);
};

export default convert;
