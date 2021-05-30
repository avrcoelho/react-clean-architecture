import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonDefaultProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonDefault = ({
  children,
  className = '',
  ...rest
}: ButtonDefaultProps): JSX.Element => {
  return (
    <div className="flex flex-col mb-4">
      <button
        type="button"
        className={`w-full max-w-lg h-10 rounded cursor-pointer bg-purple-800 text-white transition-opacity hover:opacity-80 ${className}`}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonDefault;
