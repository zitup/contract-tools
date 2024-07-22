import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import JSON5 from 'json5';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringify = (arg: any) => {
  return JSON5.stringify(arg, function bigIntReplacer(key, value) {
    if (typeof value === 'bigint') {
      return `${value}`;
    }

    return value;
  });
};
