import { combineClassnames } from '@/utils/functions';
import React from 'react';
import Empty from './Empty';

interface ListProps {
  title?: string;
  subtitle?: string;
  data: Array<ListItemProps>;
  action?: React.ReactNode;
  showDivider?: boolean;
  small?: boolean;
}

export interface ListItemProps {
  title: React.ReactNode;
  value: React.ReactNode;
  bold?: boolean;
  iconNode?: React.ReactNode;
  align?: 'center' | 'right' | 'left';
  small?: boolean;
}

const List = ({ title, subtitle, data, action, showDivider = true, small }: ListProps) => (
  <div className="w-full">
    {title || subtitle ? (
      <div className="px-4 sm:px-0 flex flex-row justify-between">
        <div>
          {title && <h3 className="text-base font-semibold leading-7 text-gray-900">{title}</h3>}
          {subtitle && <p className={combineClassnames('max-w-2xl text-sm leading-6 text-gray-500', small ? 'leading-[15px]' : '')}>{subtitle}</p>}
        </div>
        {action}
      </div>
    ) : null}
    <div className={combineClassnames(showDivider ? `${small ? 'mt-2' : 'mt-6'} border-t border-gray-100` : '')}>
      <dl className={combineClassnames(showDivider ? 'divide-y divide-gray-100' : '')}>
        {data.length ? data.map((item, index) => <Item key={index} {...item} small={small} />) : <Empty />}
      </dl>
    </div>
  </div>
);

export default List;

const Item = ({ title, value, bold, iconNode, align, small }: ListItemProps) => (
  <div className={combineClassnames('sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0', small ? 'p-1' : 'px-4 py-3')}>
    <dt className={combineClassnames('text-sm leading-6 text-gray-900', bold ? 'font-bold' : 'font-medium', small?"leading-[15px]":"")}>{title}</dt>
    <dd
      className={combineClassnames(
        'mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row justify-between items-center',
        align === 'center' ? 'text-center' : '',
        align === 'right' ? 'text-right' : '',
        bold ? 'font-bold' : ''
      )}
    >
      <div className="text-inherit" style={{ width: iconNode ? 'calc((100%) - 20px)' : '100%' }}>
        {value}
      </div>
      {iconNode ? <span className="w-[20px] h-[20px]">{iconNode}</span> : null}
    </dd>
  </div>
);
