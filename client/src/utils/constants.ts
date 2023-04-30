import { CurrentUser, Recommendation } from './types';

export const root = document.querySelector('#root');

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'localhost';
export const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || '5004';
export const CLIENT_PORT = process.env.REACT_APP_CLIENT_PORT || '3000';

export const DEFAULT_USER: CurrentUser = {
    name: 'Guest',
    role: 'unauthorized',
    status: 'active',
    likes: 0,
    recommendations: [],
    _id: '0',
    login: 'guest',
    theme: 'light',
    language: 'EN',
};

export const ROUTES = (id: string = ':id') => {
    return {
        main: '/',
        profile: '/profile',
        new: '/new',
        edit: `/edit/${id}`,
        admin: '/admin',
        recommendationById: `/${id}`,
        search: '/search/:param',
    };
};

export const DEFAULT_RECOMMENDATION: Recommendation = {
    _id: '',
    createdAt: Date.now(),
    owner: {
        _id: '',
        name: '',
        likes: 0,
        avatar: '',
    },
    name: '',
    product: {
        _id: '',
        name: '',
        group: '',
        current_rating: 4,
        rating: [],
    },
    productRating: '',
    group: '',
    tags: [],
    body: 'Start writting...',
    images: [],
    likes: [],
    comments: [],
};
