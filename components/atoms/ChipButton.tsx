import { combineClassnames } from '@/utils/functions';

interface ChipButtonProps {
  icon?: JSX.Element;
  label: string;
  onClick?: VoidFunction;
}

const ChipButton = ({ icon, label, onClick }: ChipButtonProps) => (
  <div
    className={combineClassnames(
      'px-5 py-2 bg-slate-100 rounded-full flex flex-row gap-3 justify-center',
      Boolean(onClick) ? 'hover:bg-slate-200 cursor-pointer active:shadow selection:no-underline' : ''
    )}
    onClick={onClick}
  >
    {icon}
    <p className="text-sm font-semibold">{label}</p>
  </div>
);

export default ChipButton;
