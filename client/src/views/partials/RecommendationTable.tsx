import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridRowParams,
    gridStringOrNumberComparator,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { DataGridClasses } from '../../styles/mui';
import { observer } from 'mobx-react-lite';
import { CurrentUser, Product, Recommendation, Tag } from '../../utils/types';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/constants';
import { useMemo } from 'react';
import { RecommendationsTableVM } from '../../viewModels/partials/RecommendationsTable.VM';

interface RecommendationTableProps {
    user: CurrentUser;
}

const RecommendationTable: React.FC<RecommendationTableProps> = observer(
    ({ user }) => {
        const navigate = useNavigate();
        const vm = useMemo(() => new RecommendationsTableVM(user), [user._id]);

        const columns: GridColDef[] = [
            { field: 'createdAt', headerName: 'Created At', width: 120 },
            { field: 'name', headerName: 'Title', flex: 1, width: 120 },
            {
                field: 'product',
                headerName: 'Product',
                flex: 1,
                width: 120,
                valueGetter: (params: GridRenderCellParams<Product>) =>
                    params.value.name,
            },
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
                valueGetter: (params: GridRenderCellParams<Array<Tag>>) =>
                    params.value.map((tag: Tag) => tag.name),
                renderCell: (params: GridRenderCellParams<Array<string>>) => (
                    <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-y-auto items-center'>
                        {params.value.map((tagName: string, i: number) => (
                            <li
                                key={tagName + i}
                                className='pr-2 pl-2 border-[1px] rounded-full border-current'
                            >
                                {tagName}
                            </li>
                        ))}
                    </ul>
                ),
                sortComparator: (v1, v2, param1, param2) =>
                    gridStringOrNumberComparator(
                        v1.length,
                        v2.length,
                        param1,
                        param2
                    ),
            },
            {
                field: 'actions',
                type: 'actions',
                getActions: (params: GridRowParams<Recommendation>) => [
                    <GridActionsCellItem
                        icon={<OpenInNewIcon />}
                        onClick={() => {
                            navigate(ROUTES(params.row._id).recommendationById);
                        }}
                        label='Open'
                    />,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        onClick={() => {
                            navigate(ROUTES(params.row._id).edit);
                        }}
                        label='Edit'
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        onClick={() => {
                            vm.handleDeleteRecommendation(params.row._id);
                        }}
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
                    rows={vm.recommendations}
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
    }
);

export default RecommendationTable;
