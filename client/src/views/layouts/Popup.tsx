import { PropsWithChildren } from 'react';
import useOutsideClick from '../../utils/hooks/useOutsideClick';
import useEscapeKey from '../../utils/hooks/useEsc';
import { observer } from 'mobx-react-lite';

export interface PopupProps extends PropsWithChildren {
    closePopup: () => void;
    isOpen: boolean;
}

const Popup: React.FC<PopupProps> = observer(
    ({ closePopup, isOpen, children }) => {
        const ref = useOutsideClick(closePopup, isOpen);
        useEscapeKey(closePopup, isOpen);

        return (
            <section
                className={`${
                    isOpen ? 'flex' : 'hidden'
                } fixed left-0 top-0 z-20 h-full w-full items-center justify-center bg-black bg-opacity-50`}
                tabIndex={10}
                autoFocus={true}
            >
                <div
                    className='flex flex-col items-center justify-center  rounded border-[2px] border-amber-300 bg-slate-50 p-5 text-zinc-950 shadow-md dark:bg-zinc-800 dark:text-zinc-100'
                    ref={ref}
                >
                    {children}
                </div>
            </section>
        );
    }
);

export default Popup;
