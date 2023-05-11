import { observer } from 'mobx-react-lite';
import Popup, { PopupProps } from '../layouts/Popup';

interface ImagePopupProps extends PopupProps {
    imageUrl: string;
}

const ImagePopup: React.FC<ImagePopupProps> = observer(
    ({ isOpen, closePopup, imageUrl }) => {
        return (
            <Popup isOpen={isOpen} closePopup={closePopup}>
                <img
                    src={imageUrl}
                    alt='opened illustration'
                    className='aspect-auto max-w-[80vw]'
                />
            </Popup>
        );
    }
);

export default ImagePopup;
