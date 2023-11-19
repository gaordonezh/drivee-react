import { combineClassnames } from '@/utils/functions';

type FieldsStateType = { priceFrom: string; priceTo: string };

interface RangePriceProps extends FieldsStateType {
  setFields: (params: FieldsStateType) => void;
}

const classNames = 'border-2 border-gray-200 shadow-sm w-full p-2 outline-none';

const RangePrice = ({ priceFrom, priceTo, setFields }: RangePriceProps) => {
  const handleChange = (key: 'priceFrom' | 'priceTo', value: string) => {
    const numberValue = Number(value);
    if (isNaN(numberValue) || numberValue < 0) return;
    const fields = { priceFrom, priceTo, [key]: value };
    setFields(fields);
  };

  const validateEnd = () => {
    const min = Number(priceFrom);
    const max = Number(priceTo);
    if (max <= min) setFields({ priceFrom, priceTo: String(min + 1) });
  };

  return (
    <div className="w-full">
      <label className="font-semibold">Aplicar rango de precios</label>
      <div className="flex flex-row">
        <input
          className={combineClassnames(classNames, 'rounded-l-md')}
          type="number"
          placeholder="S/. Desde"
          min={0}
          onBlur={validateEnd}
          value={priceFrom}
          onChange={(event) => handleChange('priceFrom', event.target.value)}
        />
        <input
          className={combineClassnames(classNames, 'border-l-0 rounded-r-md')}
          type="number"
          placeholder="S/. Hasta"
          min={0}
          onBlur={validateEnd}
          value={priceTo}
          onChange={(event) => handleChange('priceTo', event.target.value)}
        />
      </div>
    </div>
  );
};

export default RangePrice;
