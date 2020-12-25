import {
  ErrorRequestHandler, Request, Response,
} from 'express';

export const exceptionHandler = (err: ErrorRequestHandler, req: Request, res: Response) => {
  const statusCode = res.locals.status;
  console.log('==============================================================')

  res.send({ error: err.toString(), status: statusCode });
};

export default exceptionHandler;
