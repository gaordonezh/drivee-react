import React, { useState, useEffect } from 'react';
import Input from './Input';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { combineClassnames } from '@/utils/functions';

type DataType = Array<Record<string, any>>;

interface SelectProps {
  data: DataType;
  keyToShow: string;
  keyToGey: string;
  value: string;
  label?: string;
  setValue: (value: string, record: Record<string, any>) => void;
  placeholder: string;
}

const iconProps = { className: 'absolute right-2 bottom-3', size: 20 };

const Select = ({ data, keyToShow, keyToGey, label, placeholder, value, setValue }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<DataType>([]);

  useEffect(() => {
    setFiltered([...data]);
  }, [data]);

  useEffect(() => {
    const finder = data.find((item) => item[keyToGey] === value);
    const newSearch = finder?.[keyToShow] || '';
    setSearch(newSearch);
  }, [value]);

  const handleSearch = (valueToSearch: string) => {
    const searched = data.filter((item) => item[keyToShow].toLowerCase().includes(valueToSearch.toLowerCase()));
    setFiltered([...searched]);
  };

  const handleChange = (value: string) => {
    setSearch(value);
    handleSearch(value);
  };

  const handleSelect = (item: Record<string, any>) => {
    if (!item) return;
    setSearch(item[keyToShow]);
    setFiltered([...data]);
    setValue(item[keyToGey], item);
  };

  const handleClose = (newState: boolean) => {
    if (!newState) return setTimeout(() => setOpen(newState), 250);
    setOpen(newState);
  };

  return (
    <div className="relative w-full">
      <Input
        label={label}
        autoComplete="off"
        value={search}
        placeholder={placeholder}
        onFocus={() => handleClose(true)}
        onBlur={() => handleClose(false)}
        onChange={(event) => handleChange(event.target.value)}
      />

      {open ? <IoIosArrowUp {...iconProps} /> : <IoIosArrowDown {...iconProps} />}

      {open && (
        <div className="absolute bg-white border-none max-h-[200px] overflow-y-auto shadow-md w-full z-10">
          {filtered.length ? (
            filtered.map((item) => (
              <Item key={item[keyToGey]} value={item[keyToShow]} onClick={() => handleSelect(item)} className="cursor-pointer hover:bg-slate-100" />
            ))
          ) : (
            <Item value="No hay información" className="text-gray-400 font-light" />
          )}
        </div>
      )}
    </div>
  );
};

Select.defaultProps = {
  data: [],
  keyToShow: 'name',
  keyToGey: '_id',
  placeholder: 'Seleccione',
};

export default Select;

const Item = ({ value, onClick, className }: { value: string; onClick?: () => void; className?: string }) => (
  <div className={combineClassnames('px-2 py-1 border-b', className)} onClick={onClick}>
    {value}
  </div>
);
