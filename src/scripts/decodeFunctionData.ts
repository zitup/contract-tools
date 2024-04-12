import { Abi, decodeFunctionData, parseAbi } from 'viem';

type I4ByteDirectory = {
  bytes_signature: string;
  created_at: string;
  hex_signature: string;
  id: number;
  text_signature: string;
};

export const decodeFuncData = async (inputData: `0x${string}`, abi?: string[]) => {
  if (abi?.length) {
    let jsonABI;
    try {
      jsonABI = parseAbi(abi);
    } catch {
      jsonABI = abi;
    }
    const data = decodeFunctionData({
      abi: jsonABI,
      data: inputData,
    });
    return [data];
  } else {
    const functionSig = inputData.slice(0, 10);
    const { results }: { results: I4ByteDirectory[] } = await fetch(
      `https://www.4byte.directory/api/v1/signatures/?hex_signature=${functionSig}`
    ).then((res) => res.json());
    return results
      .map(({ text_signature }) => {
        console.log(parseAbi(['function ' + text_signature]));
        const abiItem = parseAbi(['function ' + text_signature]);
        try {
          const data = decodeFunctionData({
            abi: abiItem,
            data: inputData,
          });
          return { ...data, functionName: text_signature };
        } catch {}
      })
      .filter((result) => !!result) as ReturnType<typeof decodeFunctionData>[];
  }
};
