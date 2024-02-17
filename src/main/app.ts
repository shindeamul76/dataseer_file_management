
import express, { Application, urlencoded, json } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Manage Your Files!' });
});

app.get('/_health', (req: Request, res: Response) => {
  return res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});



// Handle 404 errors
app.use('*', (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Endpoint not found',
    data: null,
  });
});


export default app;