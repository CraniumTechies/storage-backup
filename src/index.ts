/* eslint-disable no-process-exit */
import * as dotenv from 'dotenv';
import express from 'express';
import {AppUploadHandler} from './handlers/app.js';
import {storage_cache} from './utils/file.js';

dotenv.config();
function startup() {
  const app = express();
  const {APP_PORT} = process.env;

  app.get('/restore', AppUploadHandler.restore);
  app.post('/upload', storage_cache().single('file'), AppUploadHandler.upload);

  app.listen(APP_PORT, async () => {
    console.log('server started at http://localhost:' + APP_PORT);
  });

  process.on('exit', async () => {
    console.log('server closed');
  });
}

try {
  startup();
} catch (error) {
  console.log(error);
  startup();
}
