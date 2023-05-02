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
                <h2 className='font-bold text-2xl self-center mb-5'>
                    {t('partials.surePopup.header')}
                </h2>
                <div className='flex flex-row gap-3 justify-center items-center'>
                    <button
                        type='button'
                        aria-label='confirm action'
                        className='rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                        onClick={handleAction}
                    >
                        {t('partials.surePopup.yes')}
                    </button>
                    <button
                        type='button'
                        aria-label='disagree'
                        className='rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
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
