import { combineClassnames } from '@/utils/functions';

interface ChipProps {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  label: string;
  onClick?: VoidFunction;
  size: 'large' | 'small';
  className?: string;
}

const Chip = ({ iconLeft, iconRight, label, onClick, size, className }: ChipProps) => {
  const sizeClass = {
    large: 'px-5 py-2',
    small: 'px-3 py-1',
  };

  return (
    <div
      className={combineClassnames(
        'bg-slate-100 rounded-full flex flex-row gap-3 justify-center items-center',
        Boolean(onClick) ? 'hover:bg-slate-200 cursor-pointer active:shadow selection:no-underline' : '',
        sizeClass[size],
        className
      )}
      onClick={onClick}
    >
      {iconLeft}
      <p className="text-sm font-semibold whitespace-nowrap">{label}</p>
      {iconRight}
    </div>
  );
};

Chip.defaultProps = {
  size: 'large',
};

export default Chip;
