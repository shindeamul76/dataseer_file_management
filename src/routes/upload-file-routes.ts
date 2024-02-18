
import { deleteFile } from '@controllers/file-uploads/delete-file-controller';
import { getFile } from '@controllers/file-uploads/get-file-controller';
import { listFiles } from '@controllers/file-uploads/list-file-controller';
import { uploadFile } from '@controllers/file-uploads/upload-file-controller';
import { isAuthenticated } from '@middlewares/auth/authenticate-user-middleware';
import { upload } from '@middlewares/multer/multer-middleware';
import express from 'express'


export const fileRouters = express.Router();


fileRouters.post('/upload', isAuthenticated, upload.single('file'), uploadFile);

fileRouters.get('/files/:id', isAuthenticated,  listFiles);

fileRouters.delete('/files/:id', isAuthenticated,  deleteFile);

fileRouters.get('/file/:id', isAuthenticated,  getFile)
