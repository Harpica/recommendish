import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridRowParams,
    GridValueGetterParams,
    ruRU,
} from '@mui/x-data-grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BlockIcon from '@mui/icons-material/Block';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGridClasses } from '../../styles/mui';
import { CurrentUser } from '../../utils/types';
import { observer } from 'mobx-react-lite';
import { UserTableVM } from '../../viewModels/partials/UserTable.VM';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/constants';
import SurePopup from './SurePopup';
import { useTranslation } from 'react-i18next';
import { setLocalTextInDataGrid } from '../../utils/utils';

interface UserTableProps {
    user: CurrentUser;
}

const UserTable: React.FC<UserTableProps> = observer(({ user }) => {
    const navigate = useNavigate();

    const vm = useMemo(() => new UserTableVM(user), [user._id]);
    const { t } = useTranslation();

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('partials.userTable.name') ?? 'Name',
            flex: 1,
            minWidth: 120,
        },
        {
            field: 'likes',
            headerName: t('partials.userTable.likes') ?? 'Likes',
        },
        {
            field: 'recommendations',
            headerName: t('partials.userTable.recommendations') ?? 'Articles',
            width: 100,
            valueGetter: (params: GridRenderCellParams<Array<String>>) =>
                params.value.length,
        },
        {
            field: 'status',
            headerName: t('partials.userTable.status') ?? 'Status',
            width: 90,
        },
        {
            field: 'role',
            headerName: t('partials.userTable.role') ?? 'Role',
            width: 90,
        },
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            minWidth: 165,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    icon={<OpenInNewIcon />}
                    onClick={() => {
                        navigate(ROUTES().profile);
                    }}
                    label='Open'
                />,
                <GridActionsCellItem
                    icon={<BlockIcon />}
                    onClick={() => {
                        vm.changeUserStatus(params.row._id, 'blocked');
                    }}
                    label='block'
                />,
                <GridActionsCellItem
                    icon={<LockOpenIcon />}
                    onClick={() => {
                        vm.changeUserStatus(params.row._id, 'active');
                    }}
                    label='unblock'
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    onClick={() => {
                        vm.handleDeleteButtonClick(params.row._id);
                    }}
                    label='Delete'
                />,
            ],
        },
    ];

    return (
        <>
            <div
                style={{
                    height: 500,
                    width: '100%',
                    overflowX: 'auto',
                }}
            >
                <DataGrid
                    localeText={setLocalTextInDataGrid(user.language)}
                    rows={vm.users}
                    columns={columns}
                    getRowId={(row) => row._id}
                    hideFooter
                    disableRowSelectionOnClick
                    className='scrollbar text-inherit p-4 stroke-inherit'
                    sx={DataGridClasses}
                    autoHeight
                />
            </div>
            <SurePopup
                isOpen={vm.isSurePopupOpen}
                closePopup={vm.closePopup}
                handleAction={vm.handleDeleteUser}
            />
        </>
    );
});

export default UserTable;
