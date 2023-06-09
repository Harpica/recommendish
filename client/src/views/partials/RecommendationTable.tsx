import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
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
import SurePopup from './SurePopup';
import { RecommendationsTableVM } from '../../viewModels/partials/RecommendationsTable.VM';
import { CurrentUser, Product, Recommendation, Tag } from '../../utils/types';
import { ROUTES } from '../../utils/constants';
import { getLocalDate, setLocalTextInDataGrid } from '../../utils/utils';
import { DataGridClasses } from '../../styles/mui';
import { Tooltip } from '@mui/material';

interface RecommendationTableProps {
    user: CurrentUser;
}

const RecommendationTable: React.FC<RecommendationTableProps> = observer(
    ({ user }) => {
        const navigate = useNavigate();
        const vm = useMemo(
            () => new RecommendationsTableVM(user._id, user.role),
            [user._id, user.role]
        );
        const { t } = useTranslation();

        const columns: GridColDef[] = [
            {
                field: 'createdAt',
                headerName:
                    t('partials.recommendationTable.createdAt') ?? 'Created At',
                flex: 1,
                minWidth: 140,
                valueGetter: (params: GridRenderCellParams) =>
                    getLocalDate(params.value),
            },
            {
                field: 'name',
                headerName: t('partials.recommendationTable.name') ?? 'Title',
                flex: 1,
                minWidth: 100,
            },
            {
                field: 'product',
                headerName:
                    t('partials.recommendationTable.product') ?? 'Product',
                flex: 1,
                minWidth: 120,
                valueGetter: (params: GridRenderCellParams<Product>) =>
                    params.value.name,
            },
            {
                field: 'group',
                headerName: t('partials.recommendationTable.group') ?? 'Group',
                flex: 1,
                minWidth: 70,
            },
            {
                field: 'tags',
                headerName: t('partials.recommendationTable.tags') ?? 'Tags',
                flex: 1,
                minWidth: 200,
                valueGetter: (params: GridRenderCellParams<Array<Tag>>) =>
                    params.value.map((tag: Tag) => tag.name),
                renderCell: (params: GridRenderCellParams<Array<string>>) => (
                    <ul className='flex h-7 flex-row flex-wrap items-center gap-2 overflow-y-auto'>
                        {params.value.map((tagName: string, i: number) => (
                            <li
                                key={tagName + i}
                                className='rounded-full border-[1px] border-current pl-2 pr-2'
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
                headerName: t('partials.recommendationTable.likes') ?? 'Likes',
                maxWidth: 40,
                valueGetter: (params: GridRenderCellParams<Array<String>>) =>
                    params.value.length,
            },
            {
                field: 'comments',
                headerName:
                    t('partials.recommendationTable.comments') ?? 'Comments',
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
                    <Tooltip title={t('tooltip.open')} describeChild>
                        <GridActionsCellItem
                            icon={<OpenInNewIcon />}
                            onClick={() => {
                                navigate(
                                    ROUTES(params.row._id).recommendationById
                                );
                            }}
                            label='Open'
                        />
                    </Tooltip>,
                    <Tooltip title={t('tooltip.edit')} describeChild>
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            onClick={() => {
                                navigate(ROUTES(params.row._id).edit);
                            }}
                            label='Edit'
                        />
                    </Tooltip>,
                    <Tooltip title={t('tooltip.delete')} describeChild>
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            onClick={() => {
                                vm.handleDeleteButtonClick(params.row._id);
                            }}
                            label='Delete'
                        />
                    </Tooltip>,
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
                        rows={vm.recommendations}
                        columns={columns}
                        slots={{
                            noRowsOverlay: () => {
                                return (
                                    <div className='flex h-full w-full items-center justify-center'>
                                        <p>
                                            {t(
                                                'partials.recommendationTable.noRecommendations'
                                            )}
                                        </p>
                                    </div>
                                );
                            },
                        }}
                        getRowId={(row) => row._id}
                        hideFooter
                        disableRowSelectionOnClick
                        className='scrollbar stroke-inherit p-4 text-inherit'
                        sx={DataGridClasses}
                        autoHeight={false}
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
