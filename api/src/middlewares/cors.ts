import { NextFunction, Request, Response } from "express";

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigin = process.env.ALLOWED_ORIGIN!;

export default function Cors(request: Request, response: Response, next: NextFunction) {
  response.setHeader('Access-Control-Allow-Origin', isProduction ? allowedOrigin : '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');

  next();
}