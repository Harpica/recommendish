import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { deleteImage, uploadImage } from '../controllers/images';

const images = Router();

images.use(auth());
images.post('/', uploadImage);
images.delete('/:id', deleteImage);

export default images;
