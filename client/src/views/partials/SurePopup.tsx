import { observer } from 'mobx-react-lite';
import Popup, { PopupProps } from '../layouts/Popup';
import { useTranslation } from 'react-i18next';

interface SurePopupProps extends PopupProps {
    handleAction: () => void;
}

const SurePopup: React.FC<SurePopupProps> = observer(
    ({ closePopup, isOpen, handleAction }) => {
        const { t } = useTranslation();
        return (
            <Popup closePopup={closePopup} isOpen={isOpen}>
                <h2 className='mb-5 self-center text-2xl font-bold'>
                    {t('partials.surePopup.header')}
                </h2>
                <div className='flex flex-row items-center justify-center gap-3'>
                    <button
                        type='button'
                        aria-label='confirm action'
                        className='rounded-full border-[1px] border-current p-2 pl-5 pr-5 shadow-md hover:bg-amber-400'
                        onClick={handleAction}
                    >
                        {t('partials.surePopup.yes')}
                    </button>
                    <button
                        type='button'
                        aria-label='disagree'
                        className='rounded-full border-[1px] border-current p-2 pl-5 pr-5 shadow-md hover:bg-amber-400'
                        onClick={closePopup}
                    >
                        {t('partials.surePopup.no')}
                    </button>
                </div>
            </Popup>
        );
    }
);

export default SurePopup;
