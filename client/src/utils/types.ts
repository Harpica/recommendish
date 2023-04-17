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
export interface CurrentUser extends User {
    theme: Theme;
    language: string;
}

export interface Recommendation {
    _id: string;
    createdAt?: number;
    owner: { name: string; likes: Array<String>; avatar: string };
    name: string;
    product: Product;
    productRating: number;
    group: 'movie' | 'book' | 'game';
    tags: Array<Tag>;
    body: string;
    images: Array<string>;
    likes: Array<string>;
    comments: Array<Comment>;
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
    owner: User;
    body: string;
}

export interface Product {
    _id: string;
    name: string;
    group: 'movie' | 'book' | 'game';
    current_rating: number;
    rating: Array<string>;
}
