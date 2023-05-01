import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useMemo } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { observer } from 'mobx-react-lite';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { Control } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { Controller } from 'react-hook-form';
import { RecommendationFieldsetVM } from '../../viewModels/partials/RecommendationFieldset.VM';
import CancelIcon from '@mui/icons-material/Cancel';

const fileTypes = ['JPG', 'PNG', 'GIF'];

interface RecommendationFieldsetProps {
    errors: FieldErrors<{
        [x: string]: any;
    }>;
    control: Control<FieldValues, any>;
    groupInputValue: string;
    images: Array<{ url: string; publicId: string }>;
    handleFileUpload: (files: FileList) => void;
    handleImageDelete: (id: string) => void;
}

const NewRecommendationFielset: React.FC<RecommendationFieldsetProps> =
    observer(
        ({
            errors,
            control,
            groupInputValue,
            images,
            handleFileUpload,
            handleImageDelete,
        }) => {
            console.log('child rerender');
            console.log(errors);

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
                        rules={{
                            required: {
                                value: true,
                                message: 'This field is required',
                            },
                            minLength: {
                                value: 2,
                                message: 'Minimun length is ...',
                            },
                        }}
                        render={(field) => (
                            <div>
                                <TextField
                                    {...field.field}
                                    inputRef={field.field.ref}
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
                        <InputLabel id='product-select-label'>
                            Product
                        </InputLabel>
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
                                            <MenuItem value={'game'}>
                                                Game
                                            </MenuItem>
                                            <MenuItem value={'book'}>
                                                Book
                                            </MenuItem>
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
                                    autoSelect
                                    id='product-name'
                                    options={vm.getProductOptions(
                                        groupInputValue
                                    )}
                                    value={field.field.value}
                                    onChange={(event, item) => {
                                        if (typeof item === 'string') {
                                            item = {
                                                _id: '',
                                                name: item,
                                                group: groupInputValue,
                                            };
                                        }
                                        field.field.onChange(item);
                                    }}
                                    getOptionLabel={vm.getOptionLabel}
                                    isOptionEqualToValue={
                                        vm.isOptionEqualToValue
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            inputProps={{
                                                ...params.inputProps,
                                                onKeyDown: (e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        console.log(
                                                            'prevented'
                                                        );
                                                    }
                                                },
                                            }}
                                            label='Product title'
                                        />
                                    )}
                                    sx={{ width: '500px' }}
                                />
                                <p className='text-amber-600'>
                                    {field.fieldState.error?.message ??
                                        (field.fieldState.error as any)?.name
                                            .message}
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
                                        let recentItem = item[item.length - 1];
                                        if (typeof recentItem === 'string') {
                                            item[item.length - 1] = {
                                                name: recentItem,
                                            };
                                        }
                                        field.field.onChange(item);
                                    }}
                                    multiple
                                    freeSolo
                                    disableCloseOnSelect={true}
                                    id='tags'
                                    options={vm.tags}
                                    getOptionLabel={vm.getOptionLabel}
                                    isOptionEqualToValue={
                                        vm.isOptionEqualToValue
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Tags'
                                            placeholder='Favorites'
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
                            handleChange={handleFileUpload}
                            name='file'
                            types={fileTypes}
                            label={'Upload or drop a file right here'}
                            classes={
                                'rounded p-2 border-amber-600 border-[1px] border-solid h-[56px] w-[500px] path-color span-color hover:border-amber-500'
                            }
                        />
                    </div>
                    <div className='flex flex-row gap-3 flex-wrap'>
                        {images.map((image, i) => (
                            <div key={'image' + i} className='relative'>
                                <img
                                    src={image.url}
                                    alt='illustration not uploaded'
                                    className='h-28 w-28 object-cover rounded'
                                />
                                <button
                                    type='button'
                                    aria-label='delete image'
                                    className='absolute top-2 right-2 rounded-full bg-inherit hover:opacity-50 w-4 h-4 box-border flex justify-center items-center'
                                    onClick={() =>
                                        handleImageDelete(image.publicId)
                                    }
                                >
                                    <CancelIcon className='fill-amber-600' />
                                </button>
                            </div>
                        ))}
                    </div>
                    <Controller
                        control={control}
                        name='body'
                        render={(field) => (
                            <>
                                <div className='container rounded p-2 border-amber-600 border-[1px] hover:border-amber-500'>
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
                                    <p className='text-amber-600'>
                                        {field.fieldState.error?.message}
                                    </p>
                                </div>
                            </>
                        )}
                    />
                </fieldset>
            );
        }
    );
export default NewRecommendationFielset;
