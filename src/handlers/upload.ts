import {Request, Response} from 'express';
import {storage_download, storage_upload} from '../utils/file.js';

export class UploadHandler {
  async upload(req: Request, res: Response): Promise<unknown> {
    try {
      if (!req.file) {
        return res.status(400).json({message: 'No file uploaded'});
      }
      const url = req.url;
      const filePath = req.file.path;
      const path = url.split('path=')[1]?.split('&')[0];
      const fileName = (path ? path + '/' : '') + req.file.originalname;

      await storage_upload(filePath, fileName);
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
  async restore(req: Request, res: Response): Promise<unknown> {
    try {
      const url = req.url;
      const path = url.split('path=')[1]?.split('&')[0];
      return storage_download(res, path && '/' + path);
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
}
