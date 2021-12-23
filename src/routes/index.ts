import express from 'express';
import path from 'path';
import processImage from '../middlewares/processImage.mw';

const routes = express.Router();
routes.use(processImage);

routes.get('/', (req, res) => {
  res.redirect('./api');
});

routes.get('/api', processImage, async (req, res) => {
  // Only start the process of resizing an image if user added 3 queries to the url
  if (Object.keys(req.query).length === 3 && req.query.constructor === Object) {
    const image = req.query.imageName;
    const height = req.query.height;
    const width = req.query.width;

    // Make sure user entered valid query names
    if (image && height && width) {
      const resPath = path.normalize(
        `${__dirname}/../../data/thumbnails/${width}-${height}-${image}`
      );
      await res.sendFile(resPath, {}, (err) => {
        // To handle response not finding on first attempt(Needs fixing: error object does not reconize error code)
        if (err) {
          res.redirect(req.originalUrl);
        }
      });
    }
  }
  // To ask user to enter image details if no query is created
  res.send(
    'Enter the details of image that you want to resize, and if you did make sure you entered query pramaters correctly'
  );
});

export default routes;
