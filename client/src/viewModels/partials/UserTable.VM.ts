import { action, makeAutoObservable } from 'mobx';
import { api } from '../../utils/utils';
import { CurrentUser, UserRole, UserStatus } from '../../utils/types';
import { NavigateFunction } from 'react-router';
import { ROUTES } from '../../utils/constants';
import { GridRowId } from '@mui/x-data-grid';

export class UserTableVM {
    public users: Array<CurrentUser> = [];
    public currentUserId: string = '';
    public isSurePopupOpen: boolean = false;
    public selectedRows: Array<GridRowId> = [];
    public closePopup: () => void;

    private userRole: UserRole;
    private api = api;
    private navigate: NavigateFunction;
    private setCurrentUser: (value: CurrentUser) => void;
    private setAdminUser: () => void;

    constructor(
        userRole: UserRole,
        setCurrentUser: (value: CurrentUser) => void,
        setAdminUser: () => void,
        navigate: NavigateFunction
    ) {
        this.userRole = userRole;
        this.setCurrentUser = setCurrentUser;
        this.setAdminUser = setAdminUser;
        this.navigate = navigate;
        this.handleDeleteUsers = this.handleDeleteUsers.bind(this);
        this.closePopup = () => (this.isSurePopupOpen = false);
        this.getUsers();
        makeAutoObservable(this);
    }

    public setSelectedRows(rows: Array<GridRowId>) {
        this.selectedRows = rows;
    }

    private getUsers() {
        if (this.userRole === 'admin') {
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
        if (this.selectedRows.length === 0) {
            return;
        }

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

    public changeUsersRole(role: UserRole) {
        if (this.selectedRows.length === 0) {
            return;
        }

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

    public actAsAnotherUser(id: string) {
        this.setAdminUser();
        const user = this.users.find((user) => user._id === id);

        if (user) {
            this.setCurrentUser(user);
            this.navigate(ROUTES(id).profile);
        } else {
            console.log('User not found');
        }
    }

    public handleDeleteUsers() {
        if (this.selectedRows.length === 0) {
            return;
        }

        this.api.users
            .deleteUsers(this.selectedRows)
            .then(
                action(() => {
                    this.users = this.users.filter(
                        (user) => this.selectedRows.indexOf(user._id) === -1
                    );
                })
            )
            .catch((err) => console.log(err))
            .finally(() => this.closePopup());
    }
}
