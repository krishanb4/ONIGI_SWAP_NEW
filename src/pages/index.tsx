import Head from "next/head";
import Header from "@/components/Header";
import Swap from "@/components/Swap";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { useEffect } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  // const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  useEffect(() => {
    if (chain?.id == 1) {
      return;
    } else {
      switchNetwork?.(1);
    }
  }, [chain?.id, switchNetwork]);

  return (
    <>
      <Head>
        <title>Onigiri Token Upgrade</title>
        <meta name="description" content="Onigiri token upgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/onigiri.jpeg" />
      </Head>
      <Header />
      <Swap />
    </>
  );
}
