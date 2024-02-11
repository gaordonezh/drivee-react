import { combineClassnames } from '@/utils/functions';

interface ChipProps {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  label?: string;
  onClick?: VoidFunction;
  size: 'large' | 'small';
  className?: string;
  disabled?: boolean;
  whiteSpace: boolean;
  bold: boolean;
}

const Chip = ({ iconLeft, iconRight, label, onClick, size, className, disabled, whiteSpace, bold }: ChipProps) => {
  const sizeClass = {
    large: 'px-5 py-2',
    small: 'px-3 py-1',
  };

  return (
    <div
      className={combineClassnames(
        'bg-slate-100 rounded-full flex flex-row gap-3 justify-center items-center',
        Boolean(onClick) ? 'hover:bg-slate-200 cursor-pointer active:shadow selection:no-underline' : '',
        disabled ? 'pointer-events-none opacity-75' : '',
        sizeClass[size],
        className
      )}
      onClick={onClick}
    >
      {iconLeft}
      {label && <p className={combineClassnames('text-sm', whiteSpace ? 'whitespace-nowrap' : '', bold ? 'font-semibold' : '')}>{label}</p>}
      {iconRight}
    </div>
  );
};

Chip.defaultProps = {
  size: 'large',
  whiteSpace: true,
  bold: true,
};

export default Chip;
