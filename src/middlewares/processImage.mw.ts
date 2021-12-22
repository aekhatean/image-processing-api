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
const createThumbnail = (
  image: string,
  width: string,
  height: string
): void => {
  const imagePath = `../../data/images/${image}.jpg`;
  const thumbnailPath = `../../data/thumbnails/${image}-${width}-${height}.jpg`;
  const iWidth = parseInt(width);
  const iHeight = parseInt(height);

  sharp(imagePath)
    .resize(iWidth, iHeight, { fit: 'contain' })
    .toFile(thumbnailPath);
};

/**
 * Function creates a resized version (thumbnail) of an image
 * @param req
 * @param res
 * @param next
 */
const processImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const { imageName, height, width } = req.query;
  if (imageExists(imageName as unknown as string)) {
    console.log('hellodd there');
    const thumbnailName = `${imageName}-${height}-${width}`;
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
