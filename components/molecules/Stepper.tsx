import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlinePayment } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { combineClassnames } from '@/utils/functions';

const Stepper = ({ steps }: { steps: Array<number> }) => {
  const itemClass = 'flex w-full items-center justify-center py-1';
  const dotClass = 'flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 border-2 border-black';

  const active = 'bg-black text-white';
  const inactive = 'bg-white text-black';

  const activeContainer = 'bg-slate-300';
  const inactiveContainer = 'bg-white';

  return (
    <ol className="flex items-center w-full mb-4 sm:mb-5 border border-slate-200">
      <li className={combineClassnames(itemClass, steps.includes(0) ? activeContainer : inactiveContainer)}>
        <div className={combineClassnames(dotClass, steps.includes(0) ? active : inactive)}>
          <FaLocationDot size={20} />
        </div>
      </li>
      <li className={combineClassnames(itemClass, steps.includes(1) ? activeContainer : inactiveContainer)}>
        <div className={combineClassnames(dotClass, steps.includes(1) ? active : inactive)}>
          <MdOutlinePayment size={25} />
        </div>
      </li>
      <li className={combineClassnames(itemClass, steps.includes(2) ? activeContainer : inactiveContainer)}>
        <div className={combineClassnames(dotClass, steps.includes(2) ? active : inactive)}>
          <FaCheck size={20} />
        </div>
      </li>
    </ol>
  );
};

export default Stepper;
