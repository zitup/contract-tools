import { encodeFunctionData, parseAbi } from 'viem';

export const encodeFuncData = async (funcName: string, args: string, abi: string[]) => {
  if (!abi.length) {
    return '0x';
  }
  let jsonABI;
  try {
    jsonABI = parseAbi(abi);
  } catch {
    jsonABI = abi;
  }
  const data = encodeFunctionData({
    abi: jsonABI,
    functionName: funcName,
    args: args.split(','),
  });
  return data;
};
