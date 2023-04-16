import React from 'react';

const MOUSE_UP = 'mouseup';

export default function useOutsideClick(
    handleClose: Function,
    isOpen: boolean
) {
    const ref = React.useRef<HTMLDivElement>(null!);
    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!ref.current.contains(event.target as Element)) {
                handleClose();
                document.removeEventListener(
                    MOUSE_UP,
                    handleOutsideClick,
                    false
                );
            }
        };
        if (isOpen) {
            document.addEventListener(MOUSE_UP, handleOutsideClick, false);
            return;
        }
    }, [handleClose, isOpen]);
    return ref;
}
