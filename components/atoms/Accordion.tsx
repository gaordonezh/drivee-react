import React, { ReactNode, useState } from 'react';
import { combineClassnames } from '@/utils/functions';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

interface AccordionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Accordion = ({ title, children, className }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={combineClassnames('relative', className)}>
      <button
        type="button"
        className={combineClassnames(
          'flex items-center justify-between w-full px-5 py-3 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3',
          open ? 'bg-gray-200 rounded-t-lg' : 'bg-white rounded-lg'
        )}
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        {open ? <FaAngleUp /> : <FaAngleDown />}
      </button>

      <div className={combineClassnames(open ? '' : 'hidden')}>
        <div className="p-5 border border-gray-200 rounded-b-lg">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
