import { Language, ProductGroup } from './types';
import { enUS, ruRU } from '@mui/x-data-grid';

export const randomNumber = (min: number = 0, max: number = 1) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getGroupColor = (group: ProductGroup | '') => {
    switch (group) {
        case 'movie':
            return 'amber-500';
        case 'game':
            return 'rose-500';
        case 'book':
            return 'fuchsia-600';
        default:
            return 'current';
    }
};

export const getLocalDate = (timeStamp: number | string) => {
    return new Date(timeStamp).toLocaleString();
};

export const setLocalTextInDataGrid = (language: Language) => {
    switch (language) {
        case 'ru':
            return ruRU.components.MuiDataGrid.defaultProps.localeText;
        case 'en':
            return enUS.components.MuiDataGrid.defaultProps.localeText;
        default:
            return enUS.components.MuiDataGrid.defaultProps.localeText;
    }
};
