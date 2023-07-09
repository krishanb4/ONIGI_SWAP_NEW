import React, { useEffect, useState } from "react";
import NetworkSelect from "@/components/NetworkSelect";
import From from "./From";
import To from "./To";
import SwitchArrow from "./SwitchArrow";
// import SwapButton from "./SwapButton";
import dynamic from "next/dynamic";
import Image from "next/image";
import LayerZero from "@/components/LayerZero";
import Instructions from "@/components/Instructions";
import bscbridgeABI from "@/config/abi/bscbridgeABI.json";

const SwapButton = dynamic(() => import("./SwapButton"), {
  ssr: false,
});

const ClaimButton = dynamic(() => import("./ClaimButton"), {
  ssr: false,
});
import { MyContext } from "./context";
import { useAccount, useContractRead } from "wagmi";
import { ethers } from "ethers";
import CountdownTimer from "./CountDownTimer";
import WaitButton from "./WaitButton";

function Swap() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userAddress, setUserAddress] = useState<`0x${string}` | string>("");
  const { address, isConnected } = useAccount();
  const [tokenTransferStatus, setTokenTransferStatus] = useState(false);

  useEffect(() => {
    if (address) {
      const erc20Address = ethers.utils.getAddress(address);
      setUserAddress(erc20Address);
    }
  }, [address]);

  useEffect(() => {
    // Use matchMedia to detect dark mode preference
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    // Listen for changes in dark mode preference
    const handleDarkModeChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };
    darkModeMediaQuery.addListener(handleDarkModeChange);

    if (localStorage.getItem("theme") === "dark") {
      setIsDarkMode(true);
    }
    if (localStorage.getItem("theme") === "light") {
      setIsDarkMode(false);
    }
    // Clean up event listener on unmount
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, [isDarkMode]);
  const [data, setData] = useState("");
  interface MyContextValue {
    data: string;
    setData: (data: string) => void;
  }
  const contextValue: MyContextValue = {
    data,
    setData,
  };

  const tokenRead = {
    address: userAddress,
  };

  const contractReadData = useContractRead({
    address: "0x488a9ddD656dB12DC3e802C2ebCcDd6e221cA427",
    abi: bscbridgeABI,
    functionName: "transferredUsers",
    args: Object.values(tokenRead),
    watch: true,
    chainId: 1,
  });

  useEffect(() => {
    if (contractReadData.data) {
      const transferStatus = Boolean(contractReadData.data); // Ensure boolean type
      setTokenTransferStatus(transferStatus);
    }
  }, [contractReadData]);

  return (
    <MyContext.Provider value={contextValue}>
      <div className="p-4 mx-auto mt-60 mb-[86px] text-black dark:text-white flex flex-col gap-4 w-full max-w-[520px]">
        <div className="flex flex-col gap-4">
          {tokenTransferStatus ? (
            <>
              <CountdownTimer />
              {/* <WaitButton /> */}
            </>
          ) : (
            // <ClaimButton />
            <div>
              <NetworkSelect />
              {/* <From /> */}
              {/* <SwitchArrow /> */}

              <SwapButton />
            </div>
          )}
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default Swap;
