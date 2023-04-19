import { action, makeAutoObservable, makeObservable } from 'mobx';
import { CurrentUser, Recommendation } from '../utils/types';
import { DEFAULT_USER, DEFAULT_RECOMMENDATION } from '../utils/constants';

export class AppVM {
    public isAuth: boolean;
    public currentUser: CurrentUser;
    // public currentRecommendation: Recommendation = DEFAULT_RECOMMENDATION;
    constructor() {
        console.log('init');
        this.currentUser = DEFAULT_USER;
        this.isAuth = false;
        this.setIsAuth = this.setIsAuth.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        // this.setCurrentRecommendation =
        //     this.setCurrentRecommendation.bind(this);
        makeAutoObservable(this);
    }

    public setCurrentUser(user: CurrentUser) {
        this.currentUser = { ...user };
    }

    public setIsAuth(value: boolean) {
        this.isAuth = value;
    }

    // public setCurrentRecommendation(recommendation: Recommendation) {
    //     this.currentRecommendation = { ...recommendation };
    // }
}
