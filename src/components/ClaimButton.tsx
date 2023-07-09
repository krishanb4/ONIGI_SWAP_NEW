import React, { use, useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useSigner,
  useSwitchNetwork,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
  useContractRead,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  approve,
  ApprovalResult,
  checkApprovedBalance,
} from "../utils/callFunctions";
import TokenABI from "@/config/abi/bscUSDT.json";
import bridgeABI from "@/config/abi/bridgeABI.json";
import bscbridgeABI from "@/config/abi/bscbridgeABI.json";
import {
  tokens,
  bscContractAddress,
  coreContractAddress,
  ONIGIRI,
} from "@/config/constants/addresses";
import { ethers, BigNumber } from "ethers";
import { getAccount } from "@wagmi/core";
import { MyContext } from "./context";
import { useSelector } from "react-redux";
import { createClient } from "@layerzerolabs/scan-client";
import moment from "moment";
import addresslist from "@/config/constants/address.json";
import claimAirdropABI from "@/config/abi/claimAbi.json";

type ClaimArgs = {
  amount: BigNumber;
  nonce: BigNumber;
  receiver: string;
  signature: any;
};

function SwapButton() {
  const client = createClient("mainnet");
  const context = React.useContext(MyContext);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [transferring, setTransferring] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [userAddress, setUserAddress] = useState<`0x${string}` | string>("");
  const [tokenBalance, setTokenBalance] = useState("");
  const account = getAccount();
  const [dummyData, setDummyData] = useState("");

  const [approving, setApproving] = useState(false);

  const [eligible, isEligible] = useState(false);
  const [args, setArgs] = useState({} as ClaimArgs);
  const [swaping, setSwaping] = useState(false);

  const [tokenTransferStatus, setTokenTransferStatus] = useState(false);

  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const filtered = addresslist.filter(
      (element) => element.address == address
    );

    if (filtered.length > 0) {
      const element = filtered[0];
      isEligible(true);
      setArgs({
        amount: BigNumber.from(element.amount),
        nonce: BigNumber.from(element.nonce),
        receiver: element.address,
        signature: element.signature,
      });
    } else {
      isEligible(false);
      setArgs({} as ClaimArgs);
    }
  }, [address]);

  useEffect(() => {
    if (account && account.address) {
      const erc20Address = ethers.utils.getAddress(account.address);
      setUserAddress(erc20Address);
    }
  }, [account]);

  const [claimedUsers, setClaimedUsers] = useState(false);

  const tokenRead = {
    address: userAddress,
  };

  // look rasiya
  const contractReadData = useContractRead({
    address: "0xf8582F19Fa406A68440112af785F143AD38e84f9",
    abi: claimAirdropABI,
    functionName: "claimedUsers",
    args: Object.values(tokenRead),
    watch: true,
    chainId: 56,
  });

  useEffect(() => {
    if (contractReadData.data) {
      const transferStatus = Boolean(contractReadData.data); // Ensure boolean type
      setClaimedUsers(transferStatus);
    }
  }, [contractReadData]);

  const { config, error } = usePrepareContractWrite({
    address: "0xf8582F19Fa406A68440112af785F143AD38e84f9",
    abi: claimAirdropABI,
    functionName: "claimReward",
    args: Object.values(args),
    chainId: 56,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(error) {
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        toast.error("Failed to send tokens: " + error, {
          theme: "light",
        });
      } else {
        toast.error("Failed to send tokens: " + error, {
          theme: "dark",
        });
      }
      setSwaping(false);
    },
    onSuccess(data) {
      setSwaping(false);
      toast.success("Transaction successfully sent 👌");
    },
  });

  async function Swap() {
    write?.();
    setSwaping(true);
  }
  useEffect(() => {
    if (chain?.id === 56) {
      if (claimedUsers) {
        setButtonText("Already Claimed");
      } else {
        if (eligible) {
          setButtonText(
            `Claim ${Number(args.amount) / 10 ** 18} ONIGIRI KITTY`
          );
        } else {
          setButtonText("Not Eligible");
        }
      }
    } else {
      setButtonText("Switch to BSC");
    }
  }, [chain?.id, eligible, claimedUsers]);
  const HanddleFunctions = () => {
    if (chain?.id === 56) {
      if (isConnected) {
        if (claimedUsers) {
          return;
        } else if (eligible) {
          Swap();
        } else {
          return;
        }
      }
    } else {
      switchNetwork?.(56);
    }
  };
  return (
    <div className="pt-4">
      <div className="relative w-full" data-headlessui-state="">
        <button
          onClick={() => HanddleFunctions()}
          className={`btn w-full flex items-center justify-center gap-2 cursor-pointer transition-all bg-[#eb7502] ${
            swaping || !eligible || claimedUsers
              ? "opacity-40 overflow-hidden cursor-pointer"
              : "hover:bg-[#e58b53] active:bg-[#082908]"
          }  
        
            text-white px-6 h-[52px] rounded-xl text-base font-semibold`}
          aria-expanded="false"
          data-headlessui-state=""
          disabled={swaping}
          type="button"
          id="headlessui-popover-button-:r1e:"
        >
          {swaping ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="m-0 bg-transparent block antialiased"
              width="38px"
              height="38px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              style={{ shapeRendering: "auto" }}
            >
              <circle
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="#300313"
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0;51"
                  keyTimes="0;1"
                  keySplines="0 0.2 0.8 1"
                  calcMode="spline"
                  begin="0s"
                ></animate>
                <animate
                  attributeName="opacity"
                  repeatCount="indefinite"
                  dur="1s"
                  values="1;0"
                  keyTimes="0;1"
                  keySplines="0.2 0 0.8 1"
                  calcMode="spline"
                  begin="0s"
                ></animate>
              </circle>
              <circle
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="#46dff0"
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0;51"
                  keyTimes="0;1"
                  keySplines="0 0.2 0.8 1"
                  calcMode="spline"
                  begin="-0.5s"
                ></animate>
                <animate
                  attributeName="opacity"
                  repeatCount="indefinite"
                  dur="1s"
                  values="1;0"
                  keyTimes="0;1"
                  keySplines="0.2 0 0.8 1"
                  calcMode="spline"
                  begin="-0.5s"
                ></animate>
              </circle>
            </svg>
          ) : (
            ""
          )}
          <span className="hidden md:block">{buttonText}</span>
          <span className="block md:hidden">{buttonText}</span>
        </button>
      </div>
    </div>
  );
}

export default SwapButton;
