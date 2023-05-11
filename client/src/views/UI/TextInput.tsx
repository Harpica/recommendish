import { Controller } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { Control } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { HTMLInputTypeAttribute } from 'react';

interface TextInputProps {
    control: Control<FieldValues>;
    name: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
}

const TextInput: React.FC<TextInputProps> = observer(
    ({ control, name, placeholder, type }) => {
        return (
            <Controller
                control={control}
                name={name}
                render={(field) => (
                    <div>
                        <input
                            {...field.field}
                            type={type || 'text'}
                            placeholder={placeholder || name}
                            className=' flex min-h-[45px] w-full flex-row rounded-full border-[1px] border-zinc-950 bg-white p-1 pl-5 pr-5 font-normal text-zinc-900 shadow-md outline-none'
                        />
                        <p className='text-amber-600'>
                            {field.fieldState.error?.message}
                        </p>
                    </div>
                )}
            />
        );
    }
);

export default TextInput;
