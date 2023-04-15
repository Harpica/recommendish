export type UserStatus = 'active' | 'blocked';
export type UserRole = 'admin' | 'user' | 'unauthorized';

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
    theme: string;
    language: string;
}

export interface Recommendation {
    _id: number;
    createdAt?: number;
    owner: string;
    name: string;
    product: string;
    productRating: number;
    group: 'movie' | 'book' | 'game';
    tags: Array<Tag>;
    body: string;
    images: Array<string>;
    likes: Array<string>;
    comments: Array<Comment>;
}

export interface Tag {
    name: string;
    usedIn: Array<string>;
}

export interface Comment {
    owner: User;
    body: string;
}
