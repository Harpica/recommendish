import { Router } from 'express';
import { getAllTags, getPopularTags } from '../controllers/tags';

const tags = Router();

tags.get('/', getAllTags);
tags.get('/popular', getPopularTags);

export default tags;
