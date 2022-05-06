import path from 'path';

//Path to folder where orginial images are stored
const fullImages = path.resolve('../image-processing-api/assets/full');

// Path to folder where thumb images are cached
const thumbImages = path.resolve('../image-processing-api/assets/thumb');

export default { fullImages, thumbImages };
