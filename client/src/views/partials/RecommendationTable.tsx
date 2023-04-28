import {
    DataGrid,
    GridActionsCellItem,
    GridCellParams,
    GridColDef,
    GridFilterInputMultipleSingleSelect,
    GridFilterItem,
    GridRenderCellParams,
    GridRowParams,
    GridValueGetterParams,
    gridStringOrNumberComparator,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { DataGridClasses } from '../../styles/mui';
import { observer } from 'mobx-react-lite';
import { Product, Recommendation, Tag } from '../../utils/types';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/constants';
import TextArea from '@uiw/react-md-editor/lib/components/TextArea';
import { Input, InputBase } from '@mui/material';

interface RecommendationTableProps {
    recommendations: Array<Recommendation>;
}

const RecommendationTable: React.FC<RecommendationTableProps> = observer(
    ({ recommendations }) => {
        const navigate = useNavigate();

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
                    rows={recommendations}
                    columns={columns}
                    getRowId={(row) => row._id}
                    hideFooter
                    disableRowSelectionOnClick
                    className='scrollbar text-inherit p-4 stroke-inherit'
                    sx={DataGridClasses}
                />
            </div>
        );
    }
);

export default RecommendationTable;
