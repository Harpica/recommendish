import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridRowParams,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { DataGridClasses } from '../../styles/mui';
import { observer } from 'mobx-react-lite';

const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Created At', width: 120 },
    { field: 'title', headerName: 'Title', flex: 1, width: 120 },
    { field: 'product', headerName: 'Product', flex: 1, width: 120 },
    {
        field: 'group',
        headerName: 'Group',
        width: 70,
    },
    {
        field: 'tags',
        headerName: 'Tags',
        flex: 1,
        width: 230,
        renderCell: (params: GridRenderCellParams<Array<string>>) => (
            <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-y-auto items-center'>
                {params.value.map((tag: string, i: number) => (
                    <li
                        key={tag + i}
                        className='pr-2 pl-2 border-[1px] rounded-full border-inherit'
                    >
                        {tag}
                    </li>
                ))}
            </ul>
        ),
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
                icon={<EditIcon />}
                onClick={() => {}}
                label='Edit'
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
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy'],
        id: 1,
    },
    {
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy'],
        id: 2,
    },
    {
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy', 'Comedy', 'Comedy', 'Comedy'],
        id: 3,
    },
    {
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy'],
        id: 4,
    },
    {
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy', 'Thriller'],
        id: 5,
    },
    {
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy'],
        id: 6,
    },
    {
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy'],
        id: 7,
    },
    {
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy'],
        id: 8,
    },
    {
        createdAt: 'Some date',
        title: 'Long and creative name of Recommendation',
        product: 'Product name',
        group: 'film',
        tags: ['Drama', 'Cats', 'Comedy'],
        id: 9,
    },
];

const RecommendationTable = observer(() => {
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
});

export default RecommendationTable;
