import { Controller } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { Control } from 'react-hook-form';
import { observer } from 'mobx-react-lite';

interface TextInputProps {
    control: Control<FieldValues>;
    name: string;
    placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = observer(
    ({ control, name, placeholder }) => {
        return (
            <Controller
                control={control}
                name={name}
                render={(field) => (
                    <div>
                        <input
                            {...field.field}
                            type='text'
                            placeholder={placeholder || name}
                            className=' bg-white font-normal rounded-full p-1 pr-5 pl-5 flex flex-row shadow-md border-zinc-950 border-[1px] text-zinc-900 outline-none min-h-[45px]'
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
