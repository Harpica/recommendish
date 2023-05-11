import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useMemo } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { observer } from 'mobx-react-lite';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { Control } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { Controller } from 'react-hook-form';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import { RecommendationFieldsetVM } from '../../viewModels/partials/RecommendationFieldset.VM';
import { ProductFormOption, ProductGroup } from '../../utils/types';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const filter = createFilterOptions<ProductFormOption>();

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
            control,
            groupInputValue,
            images,
            handleFileUpload,
            handleImageDelete,
        }) => {
            const vm = useMemo(() => new RecommendationFieldsetVM(), []);
            const { t } = useTranslation();

            return vm.isLoading ? (
                <CircularProgress />
            ) : (
                <fieldset className='flex flex-col items-start gap-3'>
                    <Controller
                        control={control}
                        name='title'
                        render={(field) => (
                            <div>
                                <TextField
                                    {...field.field}
                                    inputRef={field.field.ref}
                                    value={field.field.value}
                                    id='outlined-basic'
                                    label={
                                        t(
                                            'partials.recommendationFieldset.title'
                                        ) ?? 'Recommendation title'
                                    }
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
                            {t('partials.recommendationFieldset.group') ??
                                'Product'}
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
                                            label={
                                                t(
                                                    'partials.recommendationFieldset.group'
                                                ) ?? 'Product'
                                            }
                                        >
                                            <MenuItem value={'movie'}>
                                                {t(
                                                    'partials.recommendationFieldset.movie'
                                                )}
                                            </MenuItem>
                                            <MenuItem value={'game'}>
                                                {t(
                                                    'partials.recommendationFieldset.game'
                                                )}
                                            </MenuItem>
                                            <MenuItem value={'book'}>
                                                {t(
                                                    'partials.recommendationFieldset.book'
                                                )}
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
                                    onChange={(_event, item) => {
                                        if (typeof item !== 'string') {
                                            field.field.onChange(item);
                                        }
                                    }}
                                    isOptionEqualToValue={
                                        vm.isOptionEqualToValue
                                    }
                                    filterOptions={(options, params) => {
                                        const filtered = filter(
                                            options,
                                            params
                                        );
                                        const { inputValue } = params;
                                        const isExisting = options.some(
                                            (option) =>
                                                inputValue === option.title
                                        );
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                _id: '',
                                                group: groupInputValue as ProductGroup,
                                                name: inputValue,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    getOptionLabel={vm.getOptionLabel}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            inputProps={{
                                                ...params.inputProps,
                                                onKeyDown: (e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                    }
                                                },
                                            }}
                                            label={
                                                t(
                                                    'partials.recommendationFieldset.product'
                                                ) ?? 'Product title'
                                            }
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
                                    onChange={(_event, item) => {
                                        let recentItem = item[item.length - 1];
                                        if (typeof recentItem === 'string') {
                                            item[item.length - 1] = {
                                                name: recentItem.toLowerCase(),
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
                                            label={
                                                t(
                                                    'partials.recommendationFieldset.tags'
                                                ) ?? 'Tags'
                                            }
                                            placeholder={
                                                t(
                                                    'partials.recommendationFieldset.addTag'
                                                ) ?? 'Add tag...'
                                            }
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
                            {t('partials.recommendationFieldset.rating')}
                        </InputLabel>
                        <Controller
                            control={control}
                            name='rating'
                            render={(field) => {
                                return (
                                    <div>
                                        <Select
                                            {...field.field}
                                            labelId='product-select-label'
                                            id='product-rating'
                                            value={field.field.value}
                                            label={
                                                t(
                                                    'partials.recommendationFieldset.rating'
                                                ) ?? 'Product rating'
                                            }
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
                            maxSize={10}
                            onSizeError={() => vm.onImageUploadSizeError()}
                            label={
                                t(
                                    'partials.recommendationFieldset.fileUploader.label'
                                ) ?? 'Upload or drop a file right here'
                            }
                            classes={
                                'rounded p-2 border-amber-600 border-[1px] border-solid h-[56px] max-w-[500px] path-color span-color hover:border-amber-500'
                            }
                        />
                        <p className='text-amber-600'>{vm.fileLoaderMessage}</p>
                    </div>
                    <div className='flex flex-row flex-wrap gap-3'>
                        {images.map((image, i) => (
                            <div key={'image' + i} className='relative'>
                                <img
                                    src={image.url}
                                    alt='illustration not uploaded'
                                    className='h-28 w-28 rounded object-cover'
                                />
                                <button
                                    type='button'
                                    aria-label='delete image'
                                    className='absolute right-2 top-2 box-border flex h-4 w-4 items-center justify-center rounded-full bg-inherit hover:opacity-50'
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
                                <div className='container rounded border-[1px] border-amber-600 p-2 hover:border-amber-500'>
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
