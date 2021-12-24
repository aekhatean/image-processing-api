import express from 'express';
import path from 'path';
import fs, { promises as fsPromises } from 'fs';
import { processImage } from '../middlewares/processImage.mw';

const routes = express.Router();
routes.use(processImage);

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.redirect('./api');
});

routes.get(
  '/api',
  processImage,
  async (req: express.Request, res: express.Response): Promise<void> => {
    // Only start the process of resizing an image if user added 3 queries to the url
    if (
      Object.keys(req.query).length === 3 &&
      req.query.constructor === Object
    ) {
      const image = req.query.imageName;
      const height = req.query.height;
      const width = req.query.width;

      // Make sure user entered valid query names
      if (image && height && width) {
        const resPath = path.normalize(
          `${__dirname}/../../data/thumbnails/${width}-${height}-${image}`
        );

        // To handle response not finding on first attempt(Needs fixing: error object does not reconize error code)
        fsPromises
          .access(resPath, fs.constants.F_OK)
          .then((): void => {
            res.sendFile(resPath);
          })
          .catch((): void => {
            res.redirect(req.originalUrl);
          });
      }
    } else {
      // To ask user to enter image details if no query is created
      res.send(
        'Enter the details of image that you want to resize, and if you did make sure you entered query pramaters correctly'
      );
    }
  }
);

export default routes;
