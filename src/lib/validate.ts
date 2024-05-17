import { isAddress } from 'viem';
import JSON5 from 'json5';

export const validateInputFields = (
  address: string,
  abi: string
): {
  error?: string;
  abiParsed?: any;
} => {
  if (!isAddress(address)) {
    return { error: 'Invalid address' };
  }
  let abiParsed;
  try {
    abiParsed = abi && JSON5.parse(abi);
  } catch {
    return {
      error: 'ABI must be a valid JSON array',
    };
  }
  if (abi && !Array.isArray(JSON5.parse(abi))) {
    return { error: 'ABI must be a valid JSON array' };
  }
  return {
    abiParsed,
  };
};
