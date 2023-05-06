import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import { CurrentUser, UserRole, UserStatus } from '../../utils/types';
import { NavigateFunction } from 'react-router';
import { ROUTES } from '../../utils/constants';
import { GridRowId } from '@mui/x-data-grid';

export class UserTableVM {
    private currentUser: CurrentUser;
    private setCurrentUser: (value: CurrentUser) => void;
    private setAdminUser: (value: CurrentUser) => void;
    private api: Api = api;
    public users: Array<CurrentUser> = [];
    public currentUserId: string = '';
    public isSurePopupOpen: boolean = false;
    public closePopup: () => void;
    private navigate: NavigateFunction;
    public selectedRows: Array<GridRowId> = [];
    constructor(
        user: CurrentUser,
        setCurrentUser: (value: CurrentUser) => void,
        setAdminUser: (value: CurrentUser) => void,
        navigate: NavigateFunction
    ) {
        this.currentUser = user;
        this.setCurrentUser = setCurrentUser;
        this.setAdminUser = setAdminUser;
        this.navigate = navigate;
        this.closePopup = (() => {
            this.isSurePopupOpen = false;
        }).bind(this);
        this.getUserRecommendation();
        makeAutoObservable(this);
    }

    public setSelectedRows(rows: Array<GridRowId>) {
        this.selectedRows = rows;
    }

    private getUserRecommendation() {
        if (this.currentUser.role === 'admin') {
            this.api.users
                .getUsers()
                .then(action((response) => (this.users = response.data.users)))
                .catch((err) => console.log(err));
        }
    }

    public handleDeleteButtonClick() {
        this.isSurePopupOpen = true;
    }

    public changeUsersStatus(status: UserStatus) {
        if (this.selectedRows.length !== 0) {
            this.api.users
                .changeUsersStatus(this.selectedRows, status)
                .then(
                    action(() => {
                        this.users = this.users.map((user) => {
                            if (this.selectedRows.indexOf(user._id) !== -1) {
                                user.status = status;
                            }
                            return user;
                        });
                    })
                )
                .catch((err) => console.log(err));
        }
    }
    public changeUsersRole(role: UserRole) {
        if (this.selectedRows.length !== 0) {
            this.api.users
                .changeUsersRole(this.selectedRows, role)
                .then(
                    action(() => {
                        this.users = this.users.map((user) => {
                            if (this.selectedRows.indexOf(user._id) !== -1) {
                                user.role = role;
                            }
                            return user;
                        });
                    })
                )
                .catch((err) => console.log(err));
        }
    }

    public actAsAnotherUser(id: string) {
        this.setAdminUser(this.currentUser);
        this.setCurrentUser(
            this.users.find((user) => user._id === id) || this.currentUser
        );
        this.navigate(ROUTES(id).profile);
    }

    public handleDeleteUser() {}
}
