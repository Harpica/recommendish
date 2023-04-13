import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
];

const theme = createTheme({
    components: {
        // Name of the component
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: {
                    minWidth: '230px',
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
                    color: 'inherit',
                    borderColor: 'inherit',
                    '.MuiAutocomplete-tag': {
                        color: 'inherit',
                        border: '1px solid rgb(217 119 6)',
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

const NewRecommendation = () => {
    return (
        <ThemeProvider theme={theme}>
            <main className='flex flex-col gap-8'>
                <section className='flex flex-col gap-3'>
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                            Create new recommendation
                        </h1>
                        <button
                            type='submit'
                            className='rounded-full p-2 pr-5 pl-5 border-inherit border-[1px] hover:bg-amber-500'
                            aria-label='send comment'
                        >
                            Send
                        </button>
                    </div>
                    <form autoComplete='off'>
                        <fieldset className='flex flex-col items-start gap-3'>
                            <TextField
                                id='outlined-basic'
                                label='Recommendation title'
                                variant='outlined'
                            />
                            <FormControl>
                                <InputLabel id='product-select-label'>
                                    Product
                                </InputLabel>
                                <Select
                                    labelId='product-select-label'
                                    id='product-select'
                                    // value={age}
                                    label='Product'
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={'Movie'}>Movie</MenuItem>
                                    <MenuItem value={'Game'}>Game</MenuItem>
                                    <MenuItem value={'Book'}>Book</MenuItem>
                                </Select>
                            </FormControl>
                            <Autocomplete
                                freeSolo
                                id='product-name'
                                options={['1', '1', '2']}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Product title'
                                    />
                                )}
                                sx={{ width: '500px' }}
                            />
                            <Autocomplete
                                multiple
                                limitTags={2}
                                id='tags'
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                ListboxProps={{
                                    sx: {
                                        backgroundColor: 'white',

                                        '&.MuiAutocomplete-listbox': {
                                            '& li': {
                                                '&:hover': {
                                                    backgroundColor:
                                                        'rgb(245 158 11)',
                                                },
                                                '&.Mui-selected:hover': {
                                                    backgroundColor:
                                                        'rgb(245 158 11)',
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor:
                                                        'rgb(217 119 6)',
                                                },
                                            },
                                            // '&.MuiAutocomplete-option': {
                                            //     backgroundColor:
                                            //         'rgb(245 158 11)',
                                            // },
                                        },
                                    },
                                }}
                                // defaultValue={[
                                //     top100Films[0],
                                //     top100Films[1],
                                //     top100Films[2],
                                // ]}
                                renderInput={(params) => (
                                    <TextField {...params} label='Tags' />
                                )}
                                sx={{ width: '500px' }}
                            />
                        </fieldset>
                    </form>
                </section>
            </main>
        </ThemeProvider>
    );
};

export default NewRecommendation;
