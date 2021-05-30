import { SelectHTMLAttributes, LegacyRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  register: LegacyRef<HTMLSelectElement>;
  options: Option[];
  error?: string;
}

const Select = ({
  register,
  options,
  error,
  ...rest
}: SelectProps): JSX.Element => {
  return (
    <div className="flex flex-col mb-4">
      <select
        ref={register}
        className={`w-full max-w-lg h-10 bg-transparent border-2 ${
          error ? 'border-red-400' : 'border-gray-600'
        }  rounded px-3 text-white`}
        {...rest}
      >
        <option value="" disabled hidden>
          Selecione
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <small className="text-red-400">{error}</small>}
    </div>
  );
};

export default Select;
