import { FC } from 'react';

type TButtonProps = {
  onClick?: () => void;
  className: string;
  loadingClassName?: string;
  label: string;
  isLoading?: boolean;
};

const Button: FC<TButtonProps> = ({
  isLoading,
  onClick,
  className,
  loadingClassName,
  label,
}) => (
  <button
    onClick={onClick}
    className={isLoading ? loadingClassName : className}
  >
    {isLoading ? 'Loading' : label}
  </button>
);

export default Button;
