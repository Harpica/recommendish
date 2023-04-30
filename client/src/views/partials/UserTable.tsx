import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridRowParams,
    GridValueGetterParams,
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

interface UserTableProps {
    user: CurrentUser;
}

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
        field: 'likes',
        headerName: 'Likes',
    },
    {
        field: 'recommendations',
        headerName: 'Articles',
        width: 100,
        valueGetter: (params: GridRenderCellParams<Array<String>>) =>
            params.value.length,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 90,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 90,
    },
    {
        field: 'actions',
        type: 'actions',
        flex: 1,
        getActions: (params: GridRowParams) => [
            <GridActionsCellItem
                icon={<OpenInNewIcon />}
                onClick={() => {}}
                label='Open'
            />,
            <GridActionsCellItem
                icon={<BlockIcon />}
                onClick={() => {}}
                label='block'
            />,
            <GridActionsCellItem
                icon={<LockOpenIcon />}
                onClick={() => {}}
                label='unblock'
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                onClick={() => {}}
                label='Delete'
            />,
        ],
    },
];

const rows = [
    {
        id: 1,
        name: 'User Name',
        likes: 23,
        recommendations: 5,
        status: 'active',
    },
    {
        id: 2,
        name: 'User Name',
        likes: 23,
        recommendations: 5,
        status: 'active',
    },
    {
        id: 3,
        name: 'User Name',
        likes: 23,
        recommendations: 5,
        status: 'active',
    },
];

const UserTable: React.FC<UserTableProps> = observer(({ user }) => {
    const vm = useMemo(() => new UserTableVM(user), [user._id]);

    return (
        <div
            style={{
                height: 500,
                width: '100%',
                overflowX: 'auto',
            }}
        >
            <DataGrid
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
    );
});

export default UserTable;
