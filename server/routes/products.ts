import { Router } from 'express';
import { getAllProducts, updateRating } from '../controllers/product';
import { auth } from '../middlewares/auth';

const products = Router();

products.get('/', getAllProducts);
products.use(auth());
products.patch('/:id/rating', updateRating);

export default products;
