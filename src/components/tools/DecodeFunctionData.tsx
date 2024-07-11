import { useState } from 'react';
import JSON5 from 'json5';
import { Button } from '../ui/button';
import { Card, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { decodeFuncData } from '@/scripts/decodeFunctionData';

const DecodeFunctionData = () => {
  const [functionData, setFunctionData] = useState('');
  const [abi, setAbi] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<
    | {
        args: readonly unknown[] | undefined;
        functionName: string;
      }[]
    | null
  >(null);

  const onClick = async () => {
    setResult(null);
    if (!functionData.includes('0x')) {
      setError('Function data must start with 0x');
      return;
    }
    let abiParsed;
    try {
      abiParsed = abi && JSON5.parse(abi);
    } catch {
      setError('ABI must be a valid JSON array');
      return;
    }
    if (abi && !Array.isArray(JSON5.parse(abi))) {
      setError('ABI must be a valid JSON array');
      return;
    }
    setError('');
    const result = await decodeFuncData(functionData as `0x${string}`, abiParsed);
    setResult(result);
  };

  return (
    <Card className="flex flex-col p-4">
      <Label htmlFor="function-data">Function Input Data</Label>
      <Textarea
        className="min-h-[200px] mt-2"
        id="function-data"
        placeholder="0x"
        value={functionData}
        onChange={(e) => setFunctionData(e.target.value)}
      />
      <div className="mt-4">
        <Label htmlFor="abi">ABI</Label>
        <Textarea className="min-h-[100px] mt-2" id="abi" placeholder="[...]" value={abi} onChange={(e) => setAbi(e.target.value)} />
        <p className="text-sm text-muted-foreground">If you don&apos;t have an ABI, we will try to fetch it from 4bytes for you.</p>
      </div>
      <Button className="mt-2 self-end" onClick={onClick}>
        Decode
      </Button>
      <p className="text-sm text-destructive mt-2">{error}</p>
      {result && (
        <Card className="p-4 mt-2">
          <CardTitle>Results</CardTitle>
          {result.map(({ functionName, args }, index) => {
            return (
              <div className="mt-2" key={functionName}>
                <p className="text-base">
                  {index + 1}. {functionName}
                </p>
                {args?.map((arg, index) => {
                  return (
                    <li className="ml-4 mt-1 text-muted-foreground break-all text-base" key={index}>
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {Array.isArray(arg) || typeof arg === 'object'
                          ? JSON5.stringify(arg, function bigIntReplacer(key, value) {
                              if (typeof value === 'bigint') {
                                return `${value}`;
                              }

                              return value;
                            })
                          : String(arg)}
                      </code>
                    </li>
                  );
                })}
              </div>
            );
          })}
        </Card>
      )}
    </Card>
  );
};

export default DecodeFunctionData;
