import { combineClassnames } from '@/utils/functions';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  size: keyof typeof sizeClasses;
  variant: keyof typeof variantClasses;
  fullWidth: boolean;
};

const sizeClasses = {
  small: 'text-sm px-2 py-0',
  medium: 'text-base px-3 py-1',
  large: 'text-lg px-4 py-2',
};

const variantClasses = {
  dark: 'border-2 border-black bg-black text-white',
  white: 'border-2 border-white bg-white text-black',
  outlined: 'border-2 border-white bg-transparent text-white',
};

const Button = (props: ButtonProps) => {
  const { children, size, variant, fullWidth, className, ...rest } = props;

  const classes = combineClassnames(
    sizeClasses[size],
    variantClasses[variant],
    rest.disabled ? 'opacity-10 cursor-not-allowed pointer-events-none' : 'opacity-100',
    'rounded font-semibold leading-6 hover:opacity-80 flex flex-row justify-center items-center gap-3',
    fullWidth ? 'w-full' : '',
    className
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: 'medium',
  variant: 'dark',
  fullWidth: false,
};

export default Button;
