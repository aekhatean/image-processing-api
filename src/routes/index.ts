import express from 'express';
import path from 'path';
import fs, { promises as fsPromises } from 'fs';
import { processImage } from '../middlewares/processImage.mw';

const routes = express.Router();
const port = 3000;

routes.use(processImage);

routes.get('/', (): void => {
  console.log(
    `You can access image processing API from "http://localhost:${port}/api", Or you can read how to use it from "https://github.com/aekhatean/image-processing-api/blob/main/README.md"`
  );
});

routes.get(
  '/api',
  processImage,
  async (req: express.Request, res: express.Response): Promise<void> => {
    // A message to be sent if user entered wrong queries or did not enter anything at
    const noImageToProcessMessage =
      'Enter the details of image that you want to resize, and if you did make sure you entered query pramaters correctly';

    // Only start the process of resizing an image if user added 3 queries to the url
    if (
      Object.keys(req.query).length === 3 &&
      req.query.constructor === Object
    ) {
      const { imageName, height, width } = req.query;

      const sImageName = (imageName as unknown as string).trim();
      const sWidth = (width as unknown as string).trim();
      const sHeight = (height as unknown as string).trim();

      // Make sure user entered valid query names
      if (
        sImageName.length !== 0 &&
        sHeight.length !== 0 &&
        sWidth.length !== 0
      ) {
        const resPath = path.normalize(
          `${__dirname}/../../data/thumbnails/${width}-${height}-${imageName}`
        );

        // To handle response not finding on first attempt(Needs fixing: error object does not reconize error code)
        try {
          fsPromises.access(resPath, fs.constants.F_OK);
          res.sendFile(resPath);
        } catch {
          res.send(noImageToProcessMessage);
        }
      }
    } else {
      // To ask user to enter image details if no query is created
      res.send(noImageToProcessMessage);
    }
  }
);

export default routes;
