import express from 'express';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Function to get original image path from data/images directory
 * @param imageName image name with file extention
 * @returns path to original image in data/images directory
 */
const pathToImage = (imageName: string) => {
  return path.normalize(`${__dirname}../../../data/images/${imageName}`);
};

/**
 * Function to get processed image (thumbnail) path from data/thumbnails directory
 * @param thumbnailName thumbnail name saved for later use pn the format of width-height-imageName.extention
 * @returns path to processed image in data/thumbnails directory
 */
const pathToThumbnail = (thumbnailName: string) => {
  return path.normalize(
    `${__dirname}../../../data/thumbnails/${thumbnailName}`
  );
};

/**
 * Function checks if image exists in images directory
 * @param name original image name
 * @returns boolean
 */
const imageExists = async (name: string): Promise<boolean> => {
  const imagePath = pathToImage(name);
  let existanceStatus = true;
  fsPromises.access(imagePath, fs.constants.F_OK).catch(() => {
    existanceStatus = false;
  });

  return existanceStatus;
};

/**
 * Function checks if a thumbnail was created before
 * @param name thumbnail image name
 * @returns boolean
 */
const thumbnailDoesnotExist = async (name: string): Promise<boolean> => {
  const thumbnailPath = pathToThumbnail(name);
  let existanceStatus = true;
  fsPromises.access(thumbnailPath, fs.constants.F_OK).catch(() => {
    existanceStatus = false;
  });

  return existanceStatus;
};

/**
 * Function processess an image to another size
 * @param image original image name that will be processed
 * @param width Desired width value from user's query
 * @param height Desired height value
 */
const createThumbnail = async (
  image: string,
  width: number,
  height: number
): Promise<void> => {
  const imagePath = pathToImage(image);
  const thumbnailPath = pathToThumbnail(`${width}-${height}-${image}`);

  // Create thumbnail of desired size using sharp package
  sharp(imagePath)
    .resize(width, height, { fit: 'contain' })
    .toFile(thumbnailPath);
};

/**
 * Function creates a resized version (thumbnail) of an image
 * @param req image data
 * @param res
 * @param next Function to trigger the next middleware in the queue
 */
const processImage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  if (Object.keys(req.query).length === 3 && req.query.constructor === Object) {
    const { imageName, height, width } = req.query;
    const nWidth = parseInt(width as unknown as string);
    const nHeight = parseInt(height as unknown as string);

    // Make sure user entered valid query names
    if (imageName && height && width) {
      // Check if original image name exists in images directory
      if (await imageExists(imageName as unknown as string)) {
        // if the original image exists exists, check if a thumbnail of the same size was created before
        const thumbnailName = `${width}-${height}-${imageName}`;
        // If there is no thumbnail of this size for that image create one
        if (await thumbnailDoesnotExist(thumbnailName)) {
          createThumbnail(imageName as unknown as string, nWidth, nHeight);
        }
      }
    } else {
      next();
    }
  }
  next();
};

export default processImage;
