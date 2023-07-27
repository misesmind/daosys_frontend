'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    connectorsForWallets,
} from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
    goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { Provider } from 'react-redux';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        zora,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ],
    [publicProvider()]
);

const demoAppInfo = {
    appName: 'DaoSYS test UI',
};

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            injectedWallet({ chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
});

import store from '@/store';
import { ThemeProvider } from '@mui/material';
import theme from './theme';



export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <Provider store={store}>
            <WagmiConfig config={wagmiConfig}>
                <ThemeProvider theme={theme}>
                    <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
                        {mounted && children}
                    </RainbowKitProvider>
                </ThemeProvider>
            </WagmiConfig>
        </Provider>
    );
}