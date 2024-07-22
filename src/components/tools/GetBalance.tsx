import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { GetBalanceParameters, GetBalanceReturnType, getBalance } from 'wagmi/actions';
import { Chains, config } from '@/app/providers';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { SelectScrollable } from '../SelectScrollable';
import { stringify } from '@/lib/utils';
import Error from '../Error';

const GetBalance = () => {
  const [chain, setChain] = useState<number>(1);
  const [address, setAddress] = useState('');
  const [blockNumber, setBlockNumber] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<GetBalanceReturnType | null>(null);

  const onClick = async () => {
    setResult(null);
    if (!address.includes('0x')) {
      setError('Address must start with 0x');
      return;
    }
    setError('');
    const params: GetBalanceParameters = {
      address: address as `0x${string}`,
      blockNumber: undefined,
      token: undefined,
      chainId: chain,
    };
    try {
      if (blockNumber) {
        params.blockNumber = BigInt(blockNumber);
      }
      if (token) {
        params.token = token as `0x${string}`;
      }
    } catch (error: any) {
      setError(error?.message);
      return;
    }
    const result = await getBalance(config, params).catch((error) => {
      setError(error.message);
      return null;
    });
    setResult(result);
  };

  return (
    <Card className="flex flex-col p-4">
      <SelectScrollable
        placeholder="Select chain"
        contents={Chains.map(({ id, name }) => ({ value: String(id), name }))}
        onValueChange={(value: string) => {
          setChain(Number(value));
        }}
      />

      <CardTitle className="mt-4">At any block</CardTitle>
      <Separator className="mt-2" />

      <Label htmlFor="address" className="mt-4">
        Address
      </Label>
      <Input
        className="mt-2"
        id="address"
        placeholder="Address to get balance for."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Label htmlFor="block" className="mt-4">
        Block Number
      </Label>
      <Input
        className="mt-2"
        id="block"
        placeholder="Optional. Using latest block if empty."
        value={blockNumber}
        onChange={(e) => setBlockNumber(e.target.value)}
      />
      <Label htmlFor="token" className="mt-4">
        Token
      </Label>
      <Input
        className="mt-2"
        id="token"
        placeholder="Optional. Using native token if empty."
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <Button className="mt-2 self-end" onClick={onClick}>
        Get Balance
      </Button>
      <Error message={error} />
      {result && (
        <Card className="p-4 mt-2">
          <CardTitle>Results</CardTitle>
          <div className="ml-4 mt-1 text-muted-foreground break-all whitespace-break-spaces text-base">
            <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{stringify(result)}</code>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default GetBalance;
