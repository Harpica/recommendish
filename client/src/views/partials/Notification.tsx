import * as React from 'react';
import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface NotificationProps {
    isOpen: boolean;
    message: string;
    close: Function;
}

const Notification: React.FC<NotificationProps> = observer(
    ({ isOpen, message, close }) => {
        const action = (
            <React.Fragment>
                <IconButton
                    size='small'
                    aria-label='close'
                    color='inherit'
                    onClick={() => {
                        close();
                    }}
                >
                    <CloseIcon fontSize='small' />
                </IconButton>
            </React.Fragment>
        );

        return (
            <Snackbar
                open={isOpen}
                autoHideDuration={6000}
                onClose={() => {
                    close();
                }}
                message={message}
                action={action}
            />
        );
    }
);

export default Notification;
