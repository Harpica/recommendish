import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
    GridRowParams,
} from '@mui/x-data-grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BlockIcon from '@mui/icons-material/Block';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import FontDownloadOffIcon from '@mui/icons-material/FontDownloadOff';
import { Tooltip } from '@mui/material';
import { DataGridClasses } from '../../styles/mui';
import { CurrentUser, Language, UserRole } from '../../utils/types';
import { observer } from 'mobx-react-lite';
import { UserTableVM } from '../../viewModels/partials/UserTable.VM';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import SurePopup from './SurePopup';
import { useTranslation } from 'react-i18next';
import { setLocalTextInDataGrid } from '../../utils/utils';

interface UserTableProps {
    userRole: UserRole;
    userLanguage: Language;
    setCurrentUser: (value: CurrentUser) => void;
    setAdminUser: () => void;
}

const UserTable: React.FC<UserTableProps> = observer(
    ({ userRole, userLanguage, setCurrentUser, setAdminUser }) => {
        const navigate = useNavigate();
        const { t } = useTranslation();

        const vm = useMemo(
            () =>
                new UserTableVM(
                    userRole,
                    setCurrentUser,
                    setAdminUser,
                    navigate
                ),
            [userRole, setCurrentUser, setAdminUser, navigate]
        );

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
                headerName:
                    t('partials.userTable.recommendations') ?? 'Articles',
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
                width: 35,
                getActions: (params: GridRowParams) => [
                    <Tooltip title={t('tooltip.actAsOther')} describeChild>
                        <GridActionsCellItem
                            icon={<OpenInNewIcon />}
                            onClick={() => {
                                vm.actAsAnotherUser(params.row._id);
                            }}
                            label='Act as other user'
                        />
                    </Tooltip>,
                ],
            },
        ];

        const toolbar = useCallback(() => {
            return (
                <div className='flex flex-row gap-2'>
                    <Tooltip title={t('tooltip.toAdmin')} describeChild>
                        <GridActionsCellItem
                            icon={<FontDownloadIcon />}
                            onClick={() => {
                                vm.changeUsersRole('admin');
                            }}
                            label='Promote to admin'
                            disabled={vm.selectedRows.length === 0}
                        />
                    </Tooltip>

                    <Tooltip title={t('tooltip.toUser')} describeChild>
                        <GridActionsCellItem
                            icon={<FontDownloadOffIcon />}
                            onClick={() => {
                                vm.changeUsersRole('user');
                            }}
                            label='Downgrade to user'
                            disabled={vm.selectedRows.length === 0}
                        />
                    </Tooltip>

                    <Tooltip title={t('tooltip.block')} describeChild>
                        <GridActionsCellItem
                            icon={<BlockIcon />}
                            onClick={() => {
                                vm.changeUsersStatus('blocked');
                            }}
                            label='Block'
                            disabled={vm.selectedRows.length === 0}
                        />
                    </Tooltip>

                    <Tooltip title={t('tooltip.unblock')} describeChild>
                        <GridActionsCellItem
                            icon={<LockOpenIcon />}
                            onClick={() => {
                                vm.changeUsersStatus('active');
                            }}
                            label='Unblock'
                            disabled={vm.selectedRows.length === 0}
                        />
                    </Tooltip>

                    <Tooltip title={t('tooltip.delete')} describeChild>
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            onClick={() => {
                                vm.handleDeleteButtonClick();
                            }}
                            label='Delete'
                            disabled={vm.selectedRows.length === 0}
                        />
                    </Tooltip>
                </div>
            );
        }, []);

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
                        checkboxSelection
                        onRowSelectionModelChange={(newSelection) => {
                            vm.setSelectedRows(newSelection);
                        }}
                        rowSelectionModel={vm.selectedRows}
                        slots={{
                            toolbar: toolbar,
                        }}
                        localeText={setLocalTextInDataGrid(userLanguage)}
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
                    handleAction={vm.handleDeleteUsers}
                />
            </>
        );
    }
);

export default UserTable;
