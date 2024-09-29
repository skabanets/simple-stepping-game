import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className={` ${className}`} {...props}>
      {children}
    </button>
  );
};
