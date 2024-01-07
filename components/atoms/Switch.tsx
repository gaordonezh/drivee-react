import { combineClassnames } from '@/utils/functions';

interface SwitchProps {
  active: boolean;
  onChange: (active: boolean) => void;
  label?: string;
}

const Switch = ({ active, onChange, label }: SwitchProps) => (
  <div className="flex flex-row items-center">
    <label className="relative cursor-pointer">
      <input type="checkbox" className="sr-only" onChange={() => onChange(!active)} />
      <div
        className={combineClassnames(
          "w-11 h-6 rounded-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
          active ? 'bg-blue-600 after:translate-x-full' : 'bg-gray-700'
        )}
      ></div>
    </label>
    {label && <p className="ms-2 text-sm font-medium text-gray-900">{label}</p>}
  </div>
);

export default Switch;
