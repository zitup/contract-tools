import { useState, useMemo } from 'react';
import * as chains from 'viem/chains';
import JSON5 from 'json5';
import { Card, CardTitle } from '../ui/card';
import { SelectScrollable } from '../SelectScrollable';
import { createPublicClient, http, isAddress } from 'viem';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { validateInputFields } from '@/lib/validate';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useClient, useWriteContract } from 'wagmi';
import { writeContract } from 'viem/actions';

const excludedChains = [31_337, 2_046_399_126, 4777];
const Chains = Object.values(chains).filter((chain) => !chain.testnet && !excludedChains.includes(chain.id));

const OperateUnverifiedContract = () => {
  const [chain, setChain] = useState<number>(1);
  const [address, setAddress] = useState('' as `0x${string}`);
  const [functionName, setFunctionName] = useState('');
  const [args, setArgs] = useState('');
  const [abi, setAbi] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const onValueChange = (value: string) => {
    setChain(Number(value));
  };

  const publicClient = useMemo(
    () =>
      createPublicClient({
        chain: Chains.find(({ id }) => id === chain),
        transport: http(),
      }),
    [chain]
  );

  const readFunction = async () => {
    setResult(null);
    if (isAddress(address) === false) {
      setError('Invalid address');
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
    const result = await publicClient
      .readContract({
        address,
        abi: abiParsed,
        functionName,
        args: args ? args.split(',') : [],
      })
      .catch((e) => {
        setError(e.message);
      });
    result && setResult(result);
  };

  const { openConnectModal } = useConnectModal();
  const { address: account } = useAccount();
  const client = useClient();
  // const { writeContract } = useWriteContract();
  const writeFunction = async () => {
    if (!account) {
      openConnectModal?.();
      return;
    }
    setResult(null);
    const { error, abiParsed } = validateInputFields(address, abi);
    if (error) {
      setError(error);
      return;
    }
    setError('');
    writeContract(client!, {
      address,
      abi: abiParsed,
      functionName,
      account,
      args: args ? args.split(',') : [],
    })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      })
      .then((hash) => {
        setResult(hash);
      });
  };

  return (
    <Card className="flex flex-col p-4">
      <SelectScrollable
        placeholder="Select chain"
        contents={Chains.map(({ id, name }) => ({ value: String(id), name }))}
        onValueChange={onValueChange}
      />

      <Label className="mt-5" htmlFor="contract-address">
        Contract Address
      </Label>
      <Input
        className=" mt-2"
        id="contract-address"
        placeholder="0x"
        value={address}
        onChange={(e) => setAddress(e.target.value as `0x${string}`)}
      />

      <Label className="mt-5" htmlFor="function-name">
        Function Name
      </Label>
      <Input className="mt-2" id="function-name" placeholder="..." value={functionName} onChange={(e) => setFunctionName(e.target.value)} />

      <Label className="mt-5" htmlFor="args">
        Args
      </Label>
      <Input
        className="mt-2"
        id="args"
        placeholder="Optional, separated by commas"
        value={args}
        onChange={(e) => setArgs(e.target.value)}
      />

      <Label className="mt-5" htmlFor="abi">
        ABI
      </Label>
      <Textarea className="min-h-[100px] mt-2" id="abi" placeholder="[...]" value={abi} onChange={(e) => setAbi(e.target.value)} />

      <div className="flex gap-2 mt-4">
        <Button className="w-[96px]" onClick={readFunction}>
          Read
        </Button>
        <Button className="w-[96px]" onClick={writeFunction}>
          Write
        </Button>
      </div>
      <p className="text-sm text-destructive mt-2 break-all whitespace-break-spaces">{error}</p>

      <Card className="p-4 mt-2">
        <CardTitle>Results</CardTitle>
        {result !== null && <div className="mt-2">{String(result)}</div>}
      </Card>
    </Card>
  );
};

export default OperateUnverifiedContract;
