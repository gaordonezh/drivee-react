import { combineClassnames } from '@/utils/functions';
import React from 'react';
import Empty from './Empty';

interface ListProps {
  title?: string;
  subtitle?: string;
  data: Array<ListItemProps>;
  action?: React.ReactNode;
}

interface ListItemProps {
  title: string;
  value: string;
  bold?: boolean;
  iconNode?: React.ReactNode;
}

const List = ({ title, subtitle, data, action }: ListProps) => (
  <div className="w-full">
    {title || subtitle ? (
      <div className="px-4 sm:px-0 flex flex-row justify-between">
        <div>
          {title && <h3 className="text-base font-semibold leading-7 text-gray-900">{title}</h3>}
          {subtitle && <p className="max-w-2xl text-sm leading-6 text-gray-500">{subtitle}</p>}
        </div>
        {action}
      </div>
    ) : null}
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">{data.length ? data.map((item, index) => <Item key={index} {...item} />) : <Empty />}</dl>
    </div>
  </div>
);

export default List;

const Item = ({ title, value, bold, iconNode }: ListItemProps) => (
  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className={combineClassnames('text-sm leading-6 text-gray-900', bold ? 'font-bold' : 'font-medium')}>{title}</dt>
    <dd
      className={combineClassnames(
        'mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row justify-between items-center',
        bold ? 'font-bold' : ''
      )}
    >
      <p className="text-inherit" style={{ width: iconNode ? 'calc((100%) - 20px)' : '100%' }}>
        {value}
      </p>
      {iconNode ? <span className="w-[20px] h-[20px]">{iconNode}</span> : null}
    </dd>
  </div>
);
