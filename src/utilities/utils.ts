/**
 * @description Build name of cached image based on supplied arguments
 * @param {string} fileName - The name of the original file with its extension
 * @param {number} width - The width of the resized image
 * @param {number} height - The height of the resized image
 * @returns {string} File name of the resized image
 */
export const buildCacheImageName = (
	fileName: string,
	width: number,
	height: number
): string => {
	// Get file extension
	const parts = fileName.split('.');
	const ext = parts[parts.length - 1];

	// Get file name without extension
	const endIndex = fileName.length - ext.length - 1;
	const mainPt = fileName.substring(0, endIndex);

	// Build file name for resized image
	return `${mainPt}-w${width}-h${height}.${ext}`;
};

/**
 * @description - Check whether provided string is a number
 * @param value - The string to be checked
 * @returns - Whether the string is a number
 */
export const isNumber = (value: string): boolean => {
	return !Number.isNaN(Number.parseInt(value));
};
