import {Request, Response} from 'express';

export const api_validate = (req: Request, res: Response, next: Function) => {
  const {API_KEY} = process.env; // Replace with your API key
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith('Bearer ') ||
    authHeader.split(' ')[1] !== API_KEY
  ) {
    return res.status(403).json({message: 'Unauthorized'});
  }

  return next();
};
