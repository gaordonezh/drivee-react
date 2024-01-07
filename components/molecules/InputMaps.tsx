import React, { useId, useState, useEffect } from 'react';
import { combineClassnames } from '@/utils/functions';
import { TbMapSearch } from 'react-icons/tb';
import Modal from './Modal';
import Button from '../atoms/Button';
import SearchLocationWithMaps from './SearchLocationWithMaps';

export type InputMapsStateType = null | {
  location: { lat: number; lng: number };
  text: string;
  value: string;
};

interface InputMapsProps {
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  value?: InputMapsStateType;
  sizes: keyof typeof sizeClasses;
  setValue?: (value: InputMapsStateType) => void;
}

const sizeClasses = {
  medium: 'p-2',
  small: 'p-1',
};

const InputMaps = ({ label, className, sizes, value, setValue, required, disabled }: InputMapsProps) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [auxValue, setAuxValue] = useState<InputMapsStateType>(null);

  useEffect(() => {
    if (!value) return;
    setAuxValue(value);
  }, [value]);

  return (
    <React.Fragment>
      <div className="w-full">
        {label ? (
          <label htmlFor={id} className="font-semibold">
            {`${label} ${required ? '*' : ''}`}
          </label>
        ) : null}
        <div className="flex flex-row">
          <input
            id={id}
            onFocus={() => setOpen(true)}
            className={combineClassnames(
              'border-2 border-gray-200 rounded-md rounded-r-none shadow-sm w-full outline-none',
              sizeClasses[sizes],
              className
            )}
            readOnly
            placeholder="Ingresa una ubicación"
            disabled={disabled}
            required={required}
            value={value?.text ?? ''}
          />
          <button
            disabled={disabled}
            className={combineClassnames('border-2 border-gray-200 rounded-md rounded-l-none border-l-0 text-sm text-blue-400', sizeClasses[sizes])}
            onClick={() => setOpen(true)}
          >
            <TbMapSearch size={20} />
          </button>
        </div>
      </div>
      {open && (
        <Modal>
          <SearchLocationWithMaps auxValue={auxValue} setAuxValue={setAuxValue} />
          <div className="mt-5 flex flex-row gap-2">
            <Button
              fullWidth
              variant="white"
              size="large"
              className="!border-black"
              onClick={() => {
                setAuxValue(value ?? null);
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              fullWidth
              size="large"
              onClick={() => {
                setValue?.(auxValue);
                setOpen(false);
              }}
              disabled={!auxValue}
            >
              Aplicar
            </Button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

InputMaps.defaultProps = {
  sizes: 'medium',
};

export default InputMaps;
