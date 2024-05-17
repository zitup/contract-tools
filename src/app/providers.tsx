'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, connectorsForWallets, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  okxWallet,
  oneKeyWallet,
  rabbyWallet,
  trustWallet,
  uniswapWallet,
  zerionWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { mainnet, arbitrum, avalanche, bsc, optimism, polygon, manta, linea, base, blast, zkSync, metis, scroll } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from 'wagmi';
import { createClient, http } from 'viem';
// import { SWRConfig } from "swr";
// import { fetcher } from "../lib/fetcher";

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Suggested',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        coinbaseWallet,
        okxWallet,
        oneKeyWallet,
        rabbyWallet,
        trustWallet,
        uniswapWallet,
        zerionWallet,
      ],
    },
  ],
  { appName: 'Contract Tools', projectId: 'xx' }
);

const config = createConfig({
  connectors,
  chains: [mainnet, arbitrum, avalanche, bsc, optimism, polygon, manta, base, blast, zkSync, linea, metis, scroll],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// export const config = getDefaultConfig({
//   appName: 'Contract Tools',
//   projectId: '',
//   chains: [mainnet, arbitrum, avalanche, bsc, optimism, polygon, manta, base, blast, zkSync, linea, metis, scroll],
// });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US">
          {/* <SWRConfig
              value={{
                fetcher,
              }}
            > */}
          {children}
          {/* </SWRConfig> */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
