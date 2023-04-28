import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import { CurrentUser, Recommendation } from '../../utils/types';

export class ProfileVM {
    private currentUser: CurrentUser;
    private api: Api = api;
    public recommendations: Array<Recommendation> = [];
    constructor(user: CurrentUser) {
        this.currentUser = user;
        this.getUserRecommendation();
        makeAutoObservable(this);
    }

    private getUserRecommendation() {
        if (this.currentUser.role !== 'unauthorized') {
            this.api.users
                .getUserRecommendations(this.currentUser._id)
                .then(
                    action(
                        (response) =>
                            (this.recommendations =
                                response.data.recommendations)
                    )
                )
                .catch((err) => console.log(err));
        }
    }
}
