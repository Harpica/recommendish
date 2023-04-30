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
import SurePopup from './SurePopup';
import { getLocalDate } from '../../utils/utils';

interface RecommendationTableProps {
    user: CurrentUser;
}

const RecommendationTable: React.FC<RecommendationTableProps> = observer(
    ({ user }) => {
        const navigate = useNavigate();
        const vm = useMemo(() => new RecommendationsTableVM(user), [user._id]);

        const columns: GridColDef[] = [
            {
                field: 'createdAt',
                headerName: 'Created At',
                flex: 1,
                minWidth: 140,
                valueGetter: (params: GridRenderCellParams) =>
                    getLocalDate(params.value),
            },
            { field: 'name', headerName: 'Title', flex: 1, minWidth: 100 },
            {
                field: 'product',
                headerName: 'Product',
                flex: 1,
                minWidth: 120,
                valueGetter: (params: GridRenderCellParams<Product>) =>
                    params.value.name,
            },
            {
                field: 'group',
                headerName: 'Group',
                flex: 1,
                minWidth: 70,
            },
            {
                field: 'tags',
                headerName: 'Tags',
                flex: 1,
                minWidth: 200,
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
                field: 'likes',
                headerName: 'Likes',
                maxWidth: 40,
                valueGetter: (params: GridRenderCellParams<Array<String>>) =>
                    params.value.length,
            },
            {
                field: 'comments',
                headerName: 'Comments',
                maxWidth: 80,
                valueGetter: (params: GridRenderCellParams<Array<String>>) =>
                    params.value.length,
            },
            {
                field: 'actions',
                flex: 1,
                minWidth: 125,
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
                <SurePopup
                    isOpen={vm.isSurePopupOpen}
                    closePopup={vm.closePopup}
                    handleAction={vm.handleDeleteRecommendation}
                />
            </>
        );
    }
);

export default RecommendationTable;
