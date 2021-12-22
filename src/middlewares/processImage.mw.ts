import express from 'express';

type imageObject = {
  imageName: string;
  height: string;
  width: string;
};

const getQueryParams = (req: express.Request): imageObject => {
  return {
    imageName: req.query.imageName as unknown as string,
    height: req.query.height as unknown as string,
    width: req.query.width as unknown as string
  };
};

const processImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const { imageName, height, width } = getQueryParams(req);
  next();
};

// checkExistantThumbname.util
// createThumbnail.util
export { processImage, getQueryParams };
