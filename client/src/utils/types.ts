export type UserStatus = 'active' | 'blocked';
export type UserRole = 'admin' | 'user' | 'unauthorized';
export type Theme = 'light' | 'dark';
export type ProductGroup = 'movie' | 'book' | 'game';

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
    owner: UserPublic;
    name: string;
    product: Product;
    productRating: number | '';
    group: ProductGroup | '';
    tags: Array<Tag>;
    body: string;
    images: Array<string>;
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
    images: Array<string>;
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
    group: ProductGroup | '';
    current_rating: number;
    rating: Array<string>;
}

export interface setRecommendationProp {
    setCurrentRecommendation: (recommendation: Recommendation) => void;
}

export interface CreateCommentData {
    owner: string;
    recommendation: string;
    body: string;
}

// export type MessageHandler = { [key: string]: (data: any) => void };

// export type MessageRequest = InitRequest | CommentRequest;

// export interface InitRequest {
//     type: 'init';
//     data: {
//         id: string;
//     };
// }

// export interface CommentRequest {
//     type: 'comment';
//     data: { owner: string; recommendation: string; body: string };
// }

// export type MessageResponse = ErrorResponse | CommentResponse;

// export interface ErrorResponse {
//     type: 'error';
//     data: string;
// }

// export interface CommentResponse {
//     type: 'comment';
//     data: Comment;
// }
