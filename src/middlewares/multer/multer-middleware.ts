
import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });


