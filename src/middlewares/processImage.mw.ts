import express from 'express';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Function Validates non of query parameters are empty, and width and height are numbers
 * @param query query parameters from express get request to process image
 * @returns Boolean
 */

const queryParametersValidated = (req: express.Request): boolean => {
  const query = req.query;

  // Validate query only having 3 parameters
  if (Object.keys(query).length === 3 && query.constructor === Object) {
    const { imageName, height, width } = query;
    const sImageName = (imageName as unknown as string).trim();
    const sWidth = (width as unknown as string).trim();
    const sHeight = (height as unknown as string).trim();

    // Make sure user entered valid query names and none of them is empty
    if (
      sImageName.length !== 0 &&
      sHeight.length !== 0 &&
      sWidth.length !== 0
    ) {
      // Create regex patterns to use in order to validate height and width only contain digits
      const pattern = new RegExp(/^\d+$/);

      // Validate height and width are only digits
      if (pattern.test(sWidth) && pattern.test(sHeight)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Function to get original image path from data/images directory
 * @param imageName image name with file extention
 * @returns path to original image in data/images directory
 */
const pathToImage = (imageName: string): string => {
  return path.normalize(`${__dirname}../../../data/images/${imageName}`);
};

/**
 * Function to get processed image (thumbnail) path from data/thumbnails directory
 * @param thumbnailName thumbnail name saved for later use pn the format of width-height-imageName.extention
 * @returns path to processed image in data/thumbnails directory
 */
const pathToThumbnail = (thumbnailName: string): string => {
  return path.normalize(
    `${__dirname}../../../data/thumbnails/${thumbnailName}`
  );
};

/**
 * Function checks if image exists in images directory
 * @param name original image name
 * @returns boolean
 */
const imageExists = async (
  name: string,
  next: express.NextFunction
): Promise<boolean> => {
  const imagePath = pathToImage(name);
  let existanceStatus = true;

  try {
    if (fs.existsSync(imagePath)) {
      existanceStatus = true;
    } else {
      next();
    }
  } catch (err) {
    if (err) {
      existanceStatus = false;
      next();
    }
  }

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
 * Function processess an image to another size, and returns true if image is resized successfuly or false if processing failed
 * @param image original image name that will be processed
 * @param width Desired width value from user's query
 * @param height Desired height value
 * @returns boolean
 */
const createThumbnail = async (
  image: string,
  width: number,
  height: number
): Promise<boolean> => {
  const imagePath = pathToImage(image);
  const thumbnailPath = pathToThumbnail(`${width}-${height}-${image}`);

  // Create thumbnail of desired size using sharp package
  try {
    await sharp(imagePath)
      .resize(width, height, { fit: 'contain' })
      .toFile(thumbnailPath);
    return true;
  } catch {
    return false;
  }
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
  if (queryParametersValidated(req)) {
    const { imageName, height, width } = req.query;
    const nWidth = parseInt(width as unknown as string);
    const nHeight = parseInt(height as unknown as string);
    if (await imageExists(imageName as unknown as string, next)) {
      // Check if original image name exists in images directory
      // if the original image exists exists, check if a thumbnail of the same size was created before
      const thumbnailName = `${width}-${height}-${imageName}`;
      // If there is no thumbnail of this size for that image create one
      if (await thumbnailDoesnotExist(thumbnailName)) {
        await createThumbnail(imageName as unknown as string, nWidth, nHeight);
      }
    }
  } else {
    next();
  }
  next();
};

export {
  pathToImage,
  pathToThumbnail,
  imageExists,
  thumbnailDoesnotExist,
  createThumbnail,
  processImage
};
