export type UserStatus = 'active' | 'blocked';
export type UserRole = 'admin' | 'user' | 'unauthorized';
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ru';
export type ProductGroup = 'movie' | 'book' | 'game';

export interface User {
    githubId?: number;
    twitterId?: number;
    name: string;
    role: UserRole;
    status: UserStatus;
    likes: number;
    recommendations: Array<String>;
    _id: string;
    avatar?: string;
    login: string;
}

export interface UserPublic {
    name: string;
    likes: number;
    _id: string;
    avatar?: string;
}
export interface CurrentUser extends User {
    theme: Theme;
    language: Language;
}

export interface Recommendation {
    _id: string;
    createdAt?: number;
    updatedAt?: number;
    owner: UserPublic;
    name: string;
    product: Product;
    productRating: number | '';
    group: ProductGroup | '';
    tags: Array<Tag>;
    body: string;
    images: Array<{ url: string; publicId: string }>;
    likes: Array<string>;
    comments: Array<string> | Array<Comment>;
}

export interface RecommendationCreateOrEditData {
    owner: string;
    name: string;
    product: {
        _id: string;
        name: string;
        group: ProductGroup;
    };
    productRating: number | '';
    group: ProductGroup | '';
    tags: Array<Tag>;
    body: string;
    images: Array<{ url: string; publicId: string }>;
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
    props: {
        className: string;
    };
}

export interface Comment {
    _id: string;
    owner: User;
    recommendation: string;
    body: string;
    createdAt: number;
    updatedAt: number;
}

export interface Product {
    _id: string;
    name: string;
    group: ProductGroup | '';
    current_rating: number;
    rating: Array<{ user: string; rating: number }>;
}
export interface ProductFormOption {
    _id: string;
    name: string;
    group: ProductGroup | '';
    inputValue?: string;
    current_rating?: number;
    rating?: Array<{ user: string; rating: number }>;
}

export interface setRecommendationProp {
    setCurrentRecommendation: (recommendation: Recommendation) => void;
}

export interface CreateCommentData {
    owner: string;
    recommendation: string;
    body: string;
}
