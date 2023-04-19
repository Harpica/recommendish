import { Router } from 'express';
import { updateRating } from '../controllers/product';

const products = Router();

products.patch('/:id/rating', updateRating);

export default products;
