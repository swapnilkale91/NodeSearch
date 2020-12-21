import {
  ErrorRequestHandler, Request, Response,
} from 'express';

export const exceptionHandler = (err: ErrorRequestHandler, req: Request, res: Response) => {
  const statusCode = res.locals.status;

  res.send({ error: err.toString(), status: statusCode });
};

export default exceptionHandler;
