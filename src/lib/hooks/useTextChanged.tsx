import { ChangeEvent, useState } from 'react';

export default function useTextChanged(defaultValue: string = '') {
  const [value, setValue] = useState<string>(defaultValue);

  const onChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, onChanged];
}
