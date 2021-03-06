import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { resolve } from 'path';
import mongodbConfig from './config';
import userRoutes from './routes/userRoutes';
import apiResponse from './helpers/apiResponse';

dotenv.config();

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = env === 'test' ? 4001 : process.env.PORT || 4000;

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('build/src/client'));

mongodbConfig(env);

app.get('/api', (request, response) =>
  apiResponse.success(response, 200, 'Welcome to Git Cheat Sheet API')
);

app.use('/api', userRoutes);

app.all('/api*', (request, response) =>
  apiResponse.error(response, 404, 'API route does not exist. Redirect to /api')
);

app.get('*', (request, response) => {
  response.sendFile(resolve(__dirname, '../client/index.html'));
});

app.listen(port, () =>
  console.log({
    message: `server started on port ${port}`
  })
);

export default app;
