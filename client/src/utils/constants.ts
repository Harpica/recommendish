import { CurrentUser, Recommendation } from './types';

export const root = document.querySelector('#root');

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'localhost';
export const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || '5004';
export const CLIENT_PORT = process.env.REACT_APP_CLIENT_PORT || '3000';

export const DEFAULT_USER: CurrentUser = {
    name: 'Guest',
    role: 'unauthorized',
    status: 'active',
    likes: [],
    recommendations: [],
    _id: '0',
    login: 'guest',
    theme: 'light',
    language: 'EN',
};

export const ROUTES = {
    main: '/',
    profile: '/profile',
    new: '/new',
    admin: '/admin',
    recommendationById: '/:id',
    search: '/search/:param',
};

// For development

export const RECOMMENDATION: Recommendation = {
    _id: '0',
    createdAt: Date.now(),
    owner: { name: 'userID', likes: ['userID', 'userID'], avatar: '' },
    name: 'User Name',
    product: {
        _id: '12345',
        name: 'Product Name',
        group: 'movie',
        current_rating: 4,
        rating: [],
    },
    productRating: 8,
    group: 'movie',
    tags: [
        { _id: '123', name: 'cats', usedIn: ['0'] },
        { _id: '124', name: 'drama', usedIn: ['0'] },
        { _id: '125', name: 'comedy', usedIn: ['0'] },
    ],
    body: 'Some description. Some description. Some description. Some description. Some description. Some description.',
    images: [],
    likes: ['userID', 'userID'],
    comments: [],
};
