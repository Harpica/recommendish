import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(217 119 6)',
        },
    },
    components: {
        // Name of the component
        MuiFormControl: {
            styleOverrides: {
                root: {
                    maxWidth: '90vw',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: {
                    minWidth: '230px',
                    maxWidth: '90vw',
                    color: 'inherit',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(217 119 6)',
                    },
                    '.MuiSvgIcon-root': {
                        fill: 'rgb(217 119 6)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'orange',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'orange',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    '&.Mui-focused': {
                        color: 'inherit',
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    '&.Mui-selected': {
                        backgroundColor: 'rgb(217 119 6)',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'rgb(245 158 11)',
                    },
                    '&:hover': {
                        backgroundColor: 'rgb(245 158 11)',
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    maxWidth: '90vw',
                    '.MuiAutocomplete-tag': {
                        color: 'inherit',
                        border: '1px solid rgb(217 119 6)',
                    },
                    '.MuiAutocomplete-tag span': {
                        color: 'inherit',
                        border: 'none',
                    },
                },
                listbox: {
                    backgroundColor: 'white',
                    '&.MuiAutocomplete-listbox': {
                        '& li': {
                            '&:hover': {
                                backgroundColor: 'rgb(245 158 11)',
                            },
                        },
                        "& .MuiAutocomplete-option[aria-selected='true']": {
                            backgroundColor: 'rgb(217 119 6)',
                            '&.Mui-focused': {
                                backgroundColor: 'rgb(245 158 11)',
                            },
                        },
                    },
                },
            },
        },
        MuiPopper: {
            defaultProps: {
                container: document.getElementById('root'),
            },
        },
    },
});

export const DataGridClasses = {
    // minWidth: '700px',
    minHeight: '500px',
    // '& .MuiDataGrid-virtualScroller': {
    //     overflow: 'hidden',
    // },
    '.MuiDataGrid-row:hover': {
        backgroundColor: 'rgb(245 158 11)',
    },
    '.MuiDataGrid-row.Mui-selected': {
        backgroundColor: 'rgb(217 119 6)',
    },
    '.MuiDataGrid-cell:focus': {
        outline: 'none',
        backgroundColor: 'rgb(217 119 6)',
    },
    '.MuiDataGrid-columnHeader:focus': {
        outline: 'none',
    },
    '.MuiDataGrid-row:hover.Mui-selected': {
        backgroundColor: 'rgb(245 158 11)',
    },
    '.MuiSvgIcon-root': {
        fill: 'rgb(217 119 6)',
    },
    '.MuiDataGrid-row:hover .MuiSvgIcon-root ': {
        fill: 'black',
    },
};
