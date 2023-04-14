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
import { DataGridClasses } from '../../styles/mui';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'likes', headerName: 'Likes' },
    {
        field: 'recommendations',
        headerName: 'Recommendations',
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 70,
    },
    {
        field: 'actions',
        type: 'actions',
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

const UserTable = () => {
    return (
        <div
            style={{
                height: 500,
                width: '100%',

                overflowX: 'auto',
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                disableRowSelectionOnClick
                className='scrollbar text-inherit p-4  stroke-inherit'
                sx={DataGridClasses}
            />
        </div>
    );
};

export default UserTable;
