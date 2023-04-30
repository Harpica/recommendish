import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import { CurrentUser, UserStatus } from '../../utils/types';

export class UserTableVM {
    private currentUser: CurrentUser;
    private api: Api = api;
    public users: Array<CurrentUser> = [];
    public currentUserId: string = '';
    public isSurePopupOpen: boolean = false;
    public closePopup: () => void;
    constructor(user: CurrentUser) {
        this.currentUser = user;
        this.closePopup = (() => {
            this.isSurePopupOpen = false;
        }).bind(this);
        this.getUserRecommendation();
        makeAutoObservable(this);
    }
    private getUserRecommendation() {
        if (this.currentUser.role === 'admin') {
            this.api.users
                .getUsers()
                .then(action((response) => (this.users = response.data.users)))
                .catch((err) => console.log(err));
        }
    }

    public handleDeleteButtonClick(id: string) {
        this.isSurePopupOpen = true;
        this.currentUserId = id;
    }

    public changeUserStatus(id: string, status: UserStatus) {
        this.api.users
            .changeUserStatus(id, status)
            .then(
                action((response) => {
                    const index = this.users.findIndex((user) => {
                        return user._id === response.data.user._id;
                    });
                    this.users[index] = response.data.user;
                    this.users = [...this.users];
                })
            )
            .catch((err) => console.log(err));
    }

    public handleDeleteUser() {}
}
