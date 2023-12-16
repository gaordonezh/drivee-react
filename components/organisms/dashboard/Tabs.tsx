import React from 'react';
import { combineClassnames } from '@/utils/functions';

interface TabsProps {
  labels: Array<string>;
  active: string;
  onChange?: (tab: string) => void;
}

const Tabs = ({ labels, active, onChange }: TabsProps) => (
  <ul className="flex flex-row text-sm font-medium border-b border-gray-200 justify-center overflow-auto">
    {labels.map((item) => {
      const isActive = active === item;
      return (
        <li
          className={combineClassnames(
            'me-2 inline-block p-4 rounded-t-lg',
            isActive ? 'text-gray-200 bg-black cursor-not-allowed' : 'hover:text-gray-900 hover:bg-gray-300 bg-gray-200 cursor-pointer'
          )}
          key={item}
          onClick={() => (isActive ? undefined : onChange?.(item))}
        >
          {item}
        </li>
      );
    })}
  </ul>
);

Tabs.defaultProps = {
  labels: [],
  active: '',
};

export default Tabs;
