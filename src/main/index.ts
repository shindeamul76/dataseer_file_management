
import "module-alias/register";
import dotenv from 'dotenv';
dotenv.config();
import app from '@main/app';
import { PORT } from '@main/config';
import http from "http";

const server = http.createServer(app);



const start = async (): Promise<void> => {
  try {

    server.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}...`));

  } catch (error: any) {
    throw new Error("Unable to connect to db")
  }
};

start()
  .catch(async (err) => {
    throw err;
  })
  .finally(async () => {
  });