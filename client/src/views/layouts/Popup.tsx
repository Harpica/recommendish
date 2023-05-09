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
                } fixed top-0 left-0 w-full h-full justify-center items-center bg-black bg-opacity-50 z-20`}
                tabIndex={10}
                autoFocus={true}
            >
                <div
                    className='bg-slate-50 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100  border-[2px] border-amber-300 flex flex-col justify-center items-center rounded shadow-md p-5'
                    ref={ref}
                >
                    {children}
                </div>
            </section>
        );
    }
);

export default Popup;
