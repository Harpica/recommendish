import { NavLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { ROUTES } from '../../utils/constants';
import IconNew from '../svgWrappers/IconNew';
import { useTranslation } from 'react-i18next';

const ButtonNewRecommendation = () => {
    const { t } = useTranslation();
    return (
        <Tooltip title={t('tooltip.new')} describeChild>
            <NavLink
                to={ROUTES().new}
                className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
            >
                <IconNew />
            </NavLink>
        </Tooltip>
    );
};

export default ButtonNewRecommendation;
