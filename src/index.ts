/* eslint-disable no-process-exit */
import * as dotenv from 'dotenv';
import express from 'express';
import {AppUploadHandler} from './handlers/app.js';
import {api_validate} from './utils/key.js';
import {storage_cache} from './utils/file.js';

dotenv.config();
function startup() {
  const app = express();
  const {APP_PORT} = process.env;

  app.post(
    '/upload',
    api_validate,
    storage_cache().single('file'),
    AppUploadHandler.upload
  );

  app.get(
    '/restore',
    api_validate,
    AppUploadHandler.restore
  );

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
