import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { uploadImages } from '../controllers/images';

const images = Router();

images.use(auth);
images.post('/', uploadImages);

export default images;
