import { LegacyRef } from 'react';
import Input, { Props as InputProps, ReactInputMask } from 'react-input-mask';

interface InputTextProps extends InputProps {
  register: LegacyRef<ReactInputMask>;
  mask: string;
  maskChar?: null;
  error?: string;
}

const InputText = ({
  register,
  error,
  mask,
  maskChar = null,
  ...rest
}: InputTextProps): JSX.Element => {
  return (
    <div className="flex flex-col mb-4">
      <Input
        mask={mask}
        ref={register}
        className={`w-full max-w-lg h-10 bg-transparent border-2 ${
          error ? 'border-red-400' : 'border-gray-600'
        }  rounded px-3 text-white`}
        {...{ ...rest, maskChar }}
      />
      {error && <small className="text-red-400">{error}</small>}
    </div>
  );
};

export default InputText;
