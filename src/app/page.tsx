'use client';
import { ModeToggle } from '@/components/ModeToggle';
import DecodeFunctionData from '@/components/tools/DecodeFunctionData';
import OperateUnverifiedContract from '@/components/tools/OperateUnverifiedContract';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <header className="flex items-center self-end h-14 px-5 gap-2">
        <ConnectButton />
        <ModeToggle />
      </header>
      <Tabs defaultValue="decodeFunctionData" className="w-[80%] flex-1">
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
      <footer className="text-center py-4">
        <a href="https://github.com/zitup/contract-tools">
          <Image src={theme === 'light' ? 'github-mark.svg' : 'github-mark-white.svg'} width={20} height={20} alt="github" />
        </a>
      </footer>
    </main>
  );
}
