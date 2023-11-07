import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  userId?: string; // ou qualquer outro tipo adequado para a propriedade user
}

interface PayloadProps {
  sub: string;
  isAdmin?: boolean;
}

export function userAuth(req: CustomRequest, res: Response, next: NextFunction) { 
  const token = extractTokenFromHeader(req);

  if(!token) {
    return res.status(401).json({ error: 'Unauthorized'});
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY as string) as PayloadProps;
    req['userId'] = payload.sub as string;
  } catch {
    // invalid token error
    return res.status(401).json({ error: 'Invalid Token'});
  }
  next();
}

function extractTokenFromHeader(req: Request) {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];

  return type === 'Bearer' ? token : undefined;
}