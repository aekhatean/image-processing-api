import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.redirect('./api');
});

routes.get('/api', (req, res) => {
  res.send(req.url);
});

export default routes;
