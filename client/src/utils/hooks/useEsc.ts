import React from 'react';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

export default function useEscapeKey(handleClose: () => void, isOpen: boolean) {
    React.useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === KEY_NAME_ESC) {
                handleClose();
                document.removeEventListener(
                    KEY_EVENT_TYPE,
                    handleEscKey,
                    false
                );
            }
        };
        if (isOpen) {
            document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
            return;
        } else {
            document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        }
    }, [handleClose, isOpen]);
}
