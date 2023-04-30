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
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/constants';

interface UserTableProps {
    user: CurrentUser;
}

const UserTable: React.FC<UserTableProps> = observer(({ user }) => {
    const navigate = useNavigate();

    const vm = useMemo(() => new UserTableVM(user), [user._id]);

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
                    onClick={() => {}}
                    label='Delete'
                />,
            ],
        },
    ];

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
