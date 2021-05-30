import Input, { Props as InputProps } from 'react-input-mask';
import { Controller, Control } from 'react-hook-form';

interface InputTextProps extends InputProps {
  control: Control<Record<string, any>> | undefined;
  mask: string;
  maskChar?: null;
  error?: string;
  name: string;
  placeholder: string;
}

const InputText = ({
  control,
  error,
  mask,
  name,
  placeholder,
  maskChar = null,
}: InputTextProps): JSX.Element => {
  return (
    <div className="flex flex-col mb-4">
      <Controller
        as={Input}
        name={name}
        placeholder={placeholder}
        mask={mask}
        control={control}
        defaultValue=""
        className={`w-full max-w-lg h-10 bg-transparent border-2 ${
          error ? 'border-red-400' : 'border-gray-600'
        }  rounded px-3 text-white`}
        {...{ maskChar }}
      />
      {error && <small className="text-red-400">{error}</small>}
    </div>
  );
};

export default InputText;
