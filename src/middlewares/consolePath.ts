import { Request, Response, NextFunction } from 'express';

export default async function consolePath(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log({
    path: req.path,
    body: req.body,
  });

  return next();
}
