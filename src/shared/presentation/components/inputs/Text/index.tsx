import { InputHTMLAttributes, LegacyRef } from 'react';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  register: LegacyRef<HTMLInputElement>;
  error?: string;
}

const InputText = ({
  register,
  error,
  ...rest
}: InputTextProps): JSX.Element => {
  return (
    <div className="flex flex-col mb-4">
      <input
        type="text"
        ref={register}
        className={`w-full max-w-lg h-10 bg-transparent border-2 ${
          error ? 'border-red-400' : 'border-gray-600'
        }  rounded px-3 text-white`}
        {...rest}
      />
      {error && <small className="text-red-400">{error}</small>}
    </div>
  );
};

export default InputText;
