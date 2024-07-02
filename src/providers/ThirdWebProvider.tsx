"use client";

import { ThirdwebProvider, metamaskWallet , coinbaseWallet, walletConnect, localWallet,embeddedWallet  } from "@thirdweb-dev/react";

import { ReactNode, useState } from "react";
import ChainContext from "./NetworkProvider";
import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react"

export default function ThirdWebProvider({children}: {children: ReactNode}) {
  const [selectedChain, setSelectedChain] = useState(Number(process.env.NEXT_PUBLIC_CONTRACT_CHAIN_ID!));

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <ThirdwebProvider
        activeChain={selectedChain}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        supportedWallets={[
          metamaskWallet({ recommended: true }),
          coinbaseWallet(),
          walletConnect(),
          localWallet(),
          embeddedWallet(),
        ]}
      >
        <ThirdwebProviderV5>
          {children}
        </ThirdwebProviderV5>
      </ThirdwebProvider>
    </ChainContext.Provider>
  )
}