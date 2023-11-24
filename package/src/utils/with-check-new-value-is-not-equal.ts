import { isNil } from 'ramda';

function isValueEqual(currentValue: string, newValue: string) {
  return currentValue === newValue;
}

type Event = any;
type onChangeEventHandler = (...event: Event[]) => void;

export function withCheckNewValueIsNotEqual(
  currentValue: string,
  isValueEqualFunction: (a: string, b: string) => boolean = isValueEqual,
) {
  return (onChange: onChangeEventHandler) => {
    return (e: Event) => {
      const newValue = e?.target?.hasOwnProperty('value') ? e.target.value : e;
      if (isNil(newValue) && isNil(currentValue)) return;
      if (isValueEqualFunction(newValue, currentValue)) return;
      onChange(e);
    };
  };
}
