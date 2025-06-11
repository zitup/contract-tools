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
import * as chains from 'viem/chains';
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

const excludedChains = [31_337, 2_046_399_126, 4777, 28122024];
export const Chains = Object.values(chains).filter((chain) => !chain.testnet && !excludedChains.includes(chain.id));

export const config = createConfig({
  connectors,
  chains: Chains as unknown as [chains.Chain, ...chains.Chain[]],
  client({ chain }) {
    if (chain.id === 56) {
      return createClient({ chain, transport: http('https://binance.llamarpc.com') });
    }
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
