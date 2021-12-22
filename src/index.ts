import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/', routes);
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Your app has started on http://localhost:${port}`);
});

export default app;
