import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  userId?: string; // ou qualquer outro tipo adequado para a propriedade user
}

export function userAuth(req: CustomRequest, res: Response, next: NextFunction) { 
  const token = extractTokenFromHeader(req);

  if(!token) {
    return res.status(401).json({ error: 'Unauthorized'});
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY!);
    req['userId'] = payload.sub as string;
  } catch {
    throw new Error('invalid Token');
  }
  next();
}

function extractTokenFromHeader(req: Request) {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];

  return type === 'Bearer' ? token : undefined;
}