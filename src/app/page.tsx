'use client';
import { ModeToggle } from '@/components/ModeToggle';
import DecodeFunctionData from '@/components/tool/DecodeFunctionData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <header className="flex items-center self-end h-14 px-5">
        <ModeToggle />
      </header>
      <Tabs defaultValue="decodeFunctionData" className="w-[80%]">
        <TabsList>
          <TabsTrigger value="decodeFunctionData">Decode Function Data</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="decodeFunctionData">
          <DecodeFunctionData />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
