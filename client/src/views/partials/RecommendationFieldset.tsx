import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { memo, useMemo, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { observer } from 'mobx-react-lite';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { Control, UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { Controller } from 'react-hook-form';
import { Recommendation } from '../../utils/types';
import { RecommendationFieldsetVM } from '../../viewModels/partials/RecommendationFieldset.VM';

const fileTypes = ['JPG', 'PNG', 'GIF'];

interface RecommendationFieldsetProps {
    control: Control<FieldValues, any>;
    // errors: FieldErrors<FieldValues>;
    groupInputValue: string;
}

const NewRecommendationFielset: React.FC<RecommendationFieldsetProps> =
    observer(({ control, groupInputValue }) => {
        console.log('child rerender');
        const [value, setValue] = useState('**Hello world!!!**');
        const [file, setFile] = useState<unknown | null>(null);
        const handleChange = (file: unknown) => {
            console.log(file);
            setFile(file);
        };

        const vm = useMemo(
            () => new RecommendationFieldsetVM(groupInputValue),
            []
        );

        return vm.isLoading ? (
            <p>Loading...</p>
        ) : (
            <fieldset className='flex flex-col items-start gap-3'>
                <Controller
                    control={control}
                    name='title'
                    render={(field) => (
                        <div>
                            <TextField
                                {...field.field}
                                value={field.field.value}
                                id='outlined-basic'
                                label='Recommendation title'
                                variant='outlined'
                                className='w-[500px] max-w-[90vw]'
                            />
                            <p className='text-amber-600'>
                                {field.fieldState.error?.message}
                            </p>
                        </div>
                    )}
                />
                <FormControl>
                    <InputLabel id='product-select-label'>Product</InputLabel>
                    <Controller
                        control={control}
                        name='group'
                        render={(field) => {
                            return (
                                <>
                                    <Select
                                        {...field.field}
                                        labelId={'product-select-label'}
                                        id='product-select'
                                        value={field.field.value}
                                        label='Product'
                                    >
                                        <MenuItem value={'movie'}>
                                            Movie
                                        </MenuItem>
                                        <MenuItem value={'game'}>Game</MenuItem>
                                        <MenuItem value={'book'}>Book</MenuItem>
                                    </Select>
                                    <p className='text-amber-600'>
                                        {field.fieldState.error?.message}
                                    </p>
                                </>
                            );
                        }}
                    />
                </FormControl>
                <Controller
                    control={control}
                    name='product'
                    render={(field) => (
                        <div>
                            <Autocomplete
                                {...field.field}
                                freeSolo
                                id='product-name'
                                options={vm.getProductOptions(groupInputValue)}
                                value={field.field.value}
                                onChange={(event, item) => {
                                    field.field.onChange(item);
                                }}
                                getOptionLabel={vm.getOptionLabel}
                                isOptionEqualToValue={vm.isOptionEqualToValue}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Product title'
                                    />
                                )}
                                sx={{ width: '500px' }}
                            />
                            <p className='text-amber-600'>
                                {field.fieldState.error?.message}
                            </p>
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name='tags'
                    render={(field) => (
                        <div>
                            <Autocomplete
                                {...field.field}
                                value={field.field.value}
                                onChange={(event, item) => {
                                    field.field.onChange(item);
                                }}
                                multiple
                                freeSolo
                                disableCloseOnSelect={true}
                                id='tags'
                                options={vm.tags}
                                getOptionLabel={vm.getOptionLabel}
                                isOptionEqualToValue={vm.isOptionEqualToValue}
                                renderInput={(params) => (
                                    <TextField {...params} label='Tags' />
                                )}
                                sx={{ width: '500px' }}
                            />
                            <p className='text-amber-600'>
                                {field.fieldState.error?.message}
                            </p>
                        </div>
                    )}
                />
                <FormControl>
                    <InputLabel id='product-select-label'>
                        Product rating
                    </InputLabel>
                    <Controller
                        control={control}
                        name='rating'
                        render={(field) => {
                            console.log(field.field.value);
                            return (
                                <div>
                                    <Select
                                        {...field.field}
                                        labelId='product-select-label'
                                        id='product-rating'
                                        value={field.field.value}
                                        label='Product rating'
                                    >
                                        {Array.from(
                                            { length: 10 },
                                            (_, i) => i + 1
                                        ).map((element, i) => (
                                            <MenuItem
                                                key={`rating-${i}`}
                                                value={i + 1}
                                            >
                                                {element}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <p className='text-amber-600'>
                                        {field.fieldState.error?.message}
                                    </p>
                                </div>
                            );
                        }}
                    />
                </FormControl>
                <div className='container text-inherit '>
                    <FileUploader
                        multiple={true}
                        handleChange={handleChange}
                        name='file'
                        types={fileTypes}
                        label={'Upload or drop a file right here'}
                        classes={
                            'rounded p-2 border-amber-600 border-[1px] border-solid h-[56px] w-[500px] path-color span-color'
                        }
                    />
                </div>
                <div className='container rounded p-2 border-amber-600 border-[1px]'>
                    <Controller
                        control={control}
                        name='body'
                        render={(field) => (
                            <>
                                <MDEditor
                                    value={field.field.value}
                                    onChange={(value, e) => {
                                        if (value) {
                                            field.field.onChange(value);
                                        }
                                    }}
                                    preview='edit'
                                    previewOptions={{
                                        rehypePlugins: [[rehypeSanitize]],
                                    }}
                                    className=''
                                />
                                <MDEditor.Markdown
                                    source={field.field.value}
                                    style={{ whiteSpace: 'pre-wrap' }}
                                />
                            </>
                        )}
                    />
                </div>
            </fieldset>
        );
    });
export default NewRecommendationFielset;
