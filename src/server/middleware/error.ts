import { Request, Response, NextFunction } from 'express';

export class APIError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]', err.stack);
  
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { message: err.message }
    });
  }

  // Fallback for unhandled errors
  res.status(500).json({
    success: false,
    error: { message: 'Internal Server Error' }
  });
};
