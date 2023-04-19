export type UserStatus = 'active' | 'blocked';
export type UserRole = 'admin' | 'user' | 'unauthorized';
export type Theme = 'light' | 'dark';

export interface User {
    name: string;
    role: UserRole;
    status: UserStatus;
    likes: Array<String>;
    recommendations: Array<String>;
    _id: string;
    avatar?: string;
    login: string;
}

export interface UserPublic {
    name: string;
    likes: Array<String>;
    _id: string;
    avatar?: string;
}
export interface CurrentUser extends User {
    theme: Theme;
    language: string;
}

export interface Recommendation {
    _id: string;
    createdAt?: number;
    updatedAt?: number;
    owner: { _id: string; name: string; likes: Array<String>; avatar: string };
    name: string;
    product: Product;
    productRating: number;
    group: 'movie' | 'book' | 'game';
    tags: Array<Tag>;
    body: string;
    images: Array<string>;
    likes: Array<string>;
    comments: Array<string> | Array<Comment>;
}

export interface Tag {
    _id: string;
    name: string;
    usedIn: Array<string>;
    count?: number;
}

export interface TagInTagCloud {
    value: string;
    count: number;
    color?: string;
}

export interface Comment {
    _id: string;
    owner: User;
    recommendation: string;
    body: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface Product {
    _id: string;
    name: string;
    group: 'movie' | 'book' | 'game';
    current_rating: number;
    rating: Array<string>;
}

export interface setRecommendationProp {
    setCurrentRecommendation: (recommendation: Recommendation) => void;
}
