import multer from 'multer';
import {Storage} from '@google-cloud/storage';
import {firebase_credentials} from '../config/credentials.js';
import {Response} from 'express';

export const storage_cache = () => multer({dest: 'uploads/'});

export const storage_upload = async (path: string, name: string) => {
  const storage = new Storage({credentials: firebase_credentials()});
  const options = {
    destination: `${process.env['STORAGE_FOLDER']}/${name}`,
  };
  await storage
    .bucket(`${process.env['STORAGE_BUCKET']}`)
    .upload(path, options);
};

//@ts-expect-error missing return
export const storage_download = async (res: Response, path?: string) => {
  const storage = new Storage({credentials: firebase_credentials()});
  const [files] = await storage
    .bucket(`${process.env['STORAGE_BUCKET']}`)
    .getFiles({
      prefix: `${process.env['STORAGE_FOLDER'] + (path || '')}`,
      autoPaginate: false,
    });

  if (files.length === 0) {
    console.log('No files found in the specified directory.');
    return null;
  }

  files.sort(
    (a, b) =>
      new Date(`${b.metadata.timeCreated}`).getTime() -
      new Date(`${a.metadata.timeCreated}`).getTime()
  );

  const mostRecentFile = files[0]?.name;
  console.log('Most recently uploaded file:', mostRecentFile);
  if (!mostRecentFile)
    return res.status(404).send('No files found in the specified directory.');

  const file = storage
    .bucket(`${process.env['STORAGE_BUCKET']}`)
    .file(mostRecentFile);

  file
    .createReadStream()
    .pipe(res)
    .on('error', err => {
      console.error('Error reading file stream:', err);
      res.status(500).send('Error fetching the file.');
    });
};
