'use client';
import { ModeToggle } from '@/components/ModeToggle';
import DecodeFunctionData from '@/components/tools/DecodeFunctionData';
import OperateUnverifiedContract from '@/components/tools/OperateUnverifiedContract';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address } = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <header className="flex items-center self-end h-14 px-5">
        {!!address && <ConnectButton />}
        <ModeToggle />
      </header>
      <Tabs defaultValue="decodeFunctionData" className="w-[80%]">
        <TabsList>
          <TabsTrigger value="decodeFunctionData">Decode Function Data</TabsTrigger>
          <TabsTrigger value="operateUnverifiedContract">Operate Unverified Contract</TabsTrigger>
        </TabsList>
        <TabsContent value="decodeFunctionData">
          <DecodeFunctionData />
        </TabsContent>
        <TabsContent value="operateUnverifiedContract">
          <OperateUnverifiedContract />
        </TabsContent>
      </Tabs>
    </main>
  );
}
