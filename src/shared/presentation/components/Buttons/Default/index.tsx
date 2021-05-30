import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonDefaultProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonDefault = ({
  children,
  className = '',
  ...rest
}: ButtonDefaultProps): JSX.Element => {
  console.log(className);
  return (
    <div className="flex flex-col mb-4">
      <button
        type="button"
        className={`w-full h-10 rounded cursor-pointer bg-purple-800 text-white transition-opacity hover:opacity-80 ${className}`}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonDefault;
