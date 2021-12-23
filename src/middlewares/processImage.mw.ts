import express from 'express';
import fs from 'fs';
import sharp from 'sharp';

/**
 * Function checks if image exists in images directory
 * @param name original image name
 * @returns boolean
 */
const imageExists = (name: string): boolean => {
  const imagePath = `../../data/images/${name}.jpg`;
  if (fs.existsSync(imagePath)) {
    return true;
  }
  return false;
};

/**
 * Function checks if a thumbnail was created before
 * @param name thumbnail image name
 * @returns boolean
 */
const thumbnailExists = (name: string): boolean => {
  const thumbnailPath = `../../data/thumbnails/${name}.jpg`;
  if (fs.existsSync(thumbnailPath)) {
    return true;
  }
  return false;
};

/**
 * Function processess an image to another size
 * @param image original image name that will be processed
 * @param width Desired width value from user's query
 * @param height Desired height value
 */
const createThumbnail = async (
  image: string,
  width: string,
  height: string
): Promise<void> => {
  const imagePath = `../../data/images/${image}.jpg`;
  const thumbnailPath = `../../data/thumbnails/${image}-${width}-${height}.jpg`;
  const iWidth = parseInt(width),
    iHeight = parseInt(height);

  // Create thumbnail of desired size using sharp package
  sharp(imagePath)
    .resize(iWidth, iHeight, { fit: 'contain' })
    .toFile(thumbnailPath)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

/**
 * Function creates a resized version (thumbnail) of an image
 * @param req image data
 * @param res
 * @param next Function to trigger the next middleware in the queue
 */
const processImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const { imageName, height, width } = req.query;
  // Check if original image name exists in images directory
  if (imageExists(imageName as unknown as string)) {
    // if the original image exists exists, check if a thumbnail of the same size was created before
    const thumbnailName = `${imageName}-${height}-${width}`;
    // If there is no thumbnail of this size for that image create one
    if (!thumbnailExists(thumbnailName)) {
      createThumbnail(
        imageName as unknown as string,
        width as unknown as string,
        height as unknown as string
      );
    }
  }
  next();
};

export default processImage;
