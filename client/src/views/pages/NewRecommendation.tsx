import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const ListboxProps = {
    sx: {
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
};

const NewRecommendation = () => {
    const [value, setValue] = useState('**Hello world!!!**');
    const [file, setFile] = useState<unknown | null>(null);
    const handleChange = (file: unknown) => {
        console.log(file);
        setFile(file);
    };
    return (
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
                            className='w-[500px] max-w-[90vw]'
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
                            ListboxProps={ListboxProps}
                            id='product-name'
                            options={['0', '1', '2']}
                            renderInput={(params) => (
                                <TextField {...params} label='Product title' />
                            )}
                            sx={{ width: '500px' }}
                        />
                        <Autocomplete
                            multiple
                            freeSolo
                            disableCloseOnSelect={true}
                            id='tags'
                            options={['Drama', 'Comedy', 'Cats']}
                            ListboxProps={ListboxProps}
                            renderInput={(params) => (
                                <TextField {...params} label='Tags' />
                            )}
                            sx={{ width: '500px' }}
                        />
                        <FormControl>
                            <InputLabel id='product-select-label'>
                                Product rating
                            </InputLabel>
                            <Select
                                labelId='product-select-label'
                                id='product-rating'
                                // value={age}
                                label='Product rating'
                                // onChange={handleChange}
                            >
                                {Array.from(
                                    { length: 10 },
                                    (_, i) => i + 1
                                ).map((element, i) => (
                                    <MenuItem key={`rating-${i}`} value={i}>
                                        {element}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className='container text-inherit '>
                            <FileUploader
                                multiple={true}
                                handleChange={handleChange}
                                name='file'
                                types={fileTypes}
                                label={'Upload or drop a file right here'}
                                classes={
                                    'rounded p-2 border-amber-500 border-[1px] border-solid h-[56px] w-[500px] path-color span-color'
                                }
                            />
                        </div>
                        <div className='container rounded p-2 border-amber-600 border-[1px]'>
                            <MDEditor
                                value={value}
                                onChange={(value, e) => {
                                    if (value) {
                                        setValue(value);
                                    }
                                }}
                                preview='edit'
                                previewOptions={{
                                    rehypePlugins: [[rehypeSanitize]],
                                }}
                                className=''
                            />
                            <MDEditor.Markdown
                                source={value}
                                style={{ whiteSpace: 'pre-wrap' }}
                            />
                        </div>
                    </fieldset>
                </form>
            </section>
        </main>
    );
};

export default NewRecommendation;
