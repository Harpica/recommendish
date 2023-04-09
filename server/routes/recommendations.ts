import { Router } from 'express';
import {
    createRecommendation,
    deleteRecommendation,
    dislikeRecommendation,
    getPaginatedRecommendations,
    getPopularRecommendations,
    getRecentRecommendations,
    getRecommendationById,
    likeRecommendation,
    updateRecommendation,
} from '../controllers/recommendations';
import { auth } from '../middlewares/auth';

const recommendations = Router();

recommendations.get('/recent', getRecentRecommendations);
recommendations.get('/popular', getPopularRecommendations);
recommendations.get('/', getPaginatedRecommendations); // req query params
recommendations.get('/:id', getRecommendationById);
recommendations.use(auth);
recommendations.post('/', createRecommendation);
recommendations.put('/:id', updateRecommendation);
recommendations.delete('/:id', deleteRecommendation);
recommendations.patch('/:id/like', likeRecommendation);
recommendations.patch('/:id/dislike', dislikeRecommendation);

export default recommendations;
