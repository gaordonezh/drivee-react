export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const filterOptions = (inputValue: string, option: any, keytoshow: string) => {
  const title = removeAccents(String(option?.optiondata?.[keytoshow] || option?.children).toLowerCase());
  return title.includes(inputValue.toLowerCase());
};

export const objectCleaner = (params: any, onlyNull = false) => {
  const clone = { ...params };
  Object.keys(clone).forEach((key) => {
    if (onlyNull && clone[key] === null) delete clone[key];
    else if (!clone[key]) delete clone[key];
  });
  return clone;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const combineClassnames = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const formatMoney = (value: number) => parseFloat(String(value)).toFixed(2);
