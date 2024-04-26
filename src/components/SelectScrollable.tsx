import * as React from 'react';

import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';

interface SelectScrollableProps extends SelectProps {
  placeholder: string;
  contents: {
    value: string;
    name: string;
  }[];
  onValueChange: (value: string) => void;
}

export function SelectScrollable({ placeholder, contents, onValueChange }: SelectScrollableProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {contents.map(({ value, name }) => (
          <SelectItem key={value} value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
