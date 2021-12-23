import express from 'express';
import path from 'path';
import { send } from 'process';
import processImage from '../middlewares/processImage.mw';

const routes = express.Router();
routes.use(processImage);

routes.get('/', (req, res) => {
  res.redirect('./api');
});

routes.get('/api', processImage, async (req, res) => {
  if (Object.keys(req.query).length !== 0 && req.query.constructor === Object) {
    const image = req.query.imageName;
    const height = req.query.height;
    const width = req.query.width;
    const resPath = path.normalize(
      `${__dirname}/../../data/thumbnails/${width}-${height}-${image}`
    );
    await res.sendFile(resPath);
  } else {
    res.send(
      'Enter the details of image that you want to resize, and if you did make sure you entered query pramaters correctly'
    );
  }
});

export default routes;
