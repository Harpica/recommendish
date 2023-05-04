import { Router } from 'express';
import {
    createRecommendation,
    deleteRecommendation,
    dislikeRecommendation,
    findRecommendations,
    getPopularRecommendations,
    getRecentRecommendations,
    getRecommendationById,
    likeRecommendation,
    updateRecommendation,
} from '../controllers/recommendations';
import { celebrate } from 'celebrate';
import { auth } from '../middlewares/auth';
import { validator } from '../utils/celebrate/validations';

const recommendations = Router();

recommendations.get('/recent', getRecentRecommendations);
recommendations.get('/popular', getPopularRecommendations);
recommendations.get(
    '/search',
    // celebrate(validator.recommendation.pagination),
    (req, res, next) => findRecommendations(req, res, next)
);
recommendations.get('/:id', getRecommendationById);
recommendations.use(auth);
recommendations.post(
    '/',
    celebrate(validator.recommendation.object),
    createRecommendation
);
recommendations.put(
    '/:id',
    celebrate(validator.recommendation.object),
    updateRecommendation
);
recommendations.delete('/:id', deleteRecommendation);
recommendations.patch(
    '/:id/like',
    celebrate(validator.recommendation.toggleLike),
    likeRecommendation
);
recommendations.patch(
    '/:id/dislike',
    celebrate(validator.recommendation.toggleLike),
    dislikeRecommendation
);

export default recommendations;
