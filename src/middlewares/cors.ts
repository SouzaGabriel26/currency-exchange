import { NextFunction, Request, Response } from "express";

export default function Cors(request: Request, response: Response, next: NextFunction) {
  response.setHeader('Access-Control-Allow-Origin', 'https://currency-exchange-app-production.up.railway.app');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');

  next();
}