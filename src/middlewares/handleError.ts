import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpError';

const handleError = (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {  
  const { status, message } = error;
  res.status(status || 500).json({ message });
};

export default handleError;
