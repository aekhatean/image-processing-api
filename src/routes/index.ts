import express from 'express';
import processImage from '../middlewares/processImage.mw';

const routes = express.Router();
routes.use(processImage);

routes.get('/', (req, res) => {
  res.redirect('./api');
});

routes.get('/api', processImage, (req, res) => {
  res.send(req.query);
});

export default routes;
