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

interface Transaction {
  to: string;
  from: string;
  tx: string;
}

interface AppState {
  tokenbalance: {
    enterAmount: string;
  };
}

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
  const tokenbalance = useSelector((state: AppState) => state.tokenbalance);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    if (chain?.id == 1) {
      const tokenBalanceFrom = Object.values(tokenbalance)[1];
      setTokenBalance(tokenBalanceFrom);
    }
  }, [chain?.id, tokenbalance]);
  useEffect(() => {
    if (account && account.address) {
      const erc20Address = ethers.utils.getAddress(account.address);
      setUserAddress(erc20Address);
    }
  }, [account]);
  type SwapArgs = {
    amount: BigNumber;
    gassData: {};
  };

  const [args, setArgs] = useState({} as SwapArgs);
  const [contractAddressSwap, setContractAddressSwap] =
    useState<`0x${string}`>();
  const [tokenAddressSwap, setTokenAddressSwap] = useState("");
  const toAddress = address;

  const [swaping, setSwaping] = useState(false);

  const [number_to_send, setNumber_to_send] = useState<BigNumber>();

  useEffect(() => {
    const callParams = {
      refundAddress: address,
      zroPaymentAddress: "0x0000000000000000000000000000000000000000",
    };

    const decimals = 9;
    if (dummyData) {
      const numberEntered = ethers.utils.parseUnits(dummyData, decimals);
      setNumber_to_send(numberEntered);
      // console.log(`entered ${numberEntered}`);

      if (tokenAddressSwap && toAddress) {
        if (chain?.id == 1) {
        }
      }
    }
  }, [tokenAddressSwap, address, toAddress, chain?.id, dummyData]);
  const [approveBalance, setapproveBalance] = useState(0);

  useEffect(() => {
    async function checkApproveBalance() {
      try {
        const approveBalance = await checkApprovedBalance(
          "0xb4615aad766f6de3c55330099e907ff7f13f1582",
          "0x488a9ddD656dB12DC3e802C2ebCcDd6e221cA427",
          userAddress,
          TokenABI,
          Number(chain?.id)
        );
        setapproveBalance(Number(approveBalance) / 10 ** 18);
      } catch (error) {
        console.log(error);
      }
    }
    checkApproveBalance();
  }, [chain?.id, userAddress]);

  async function checkApproveBalance() {
    try {
      const approveBalance = await checkApprovedBalance(
        "0xb4615aad766f6de3c55330099e907ff7f13f1582",
        "0x488a9ddD656dB12DC3e802C2ebCcDd6e221cA427",
        userAddress,
        TokenABI,
        Number(chain?.id)
      );
      setapproveBalance(Number(approveBalance) / 10 ** 18);
    } catch (error) {
      console.log(error);
    }
  }
  async function approveTokens() {
    const amount = ethers.utils.parseUnits(
      "115792089237316195423570985008687907853269984665640564039457",
      18
    );
    const signer_from = signer;
    try {
      setApproving(true);

      const approvalResult: ApprovalResult = await approve(
        "0xb4615aad766f6de3c55330099e907ff7f13f1582",
        "0x488a9ddD656dB12DC3e802C2ebCcDd6e221cA427",
        TokenABI,
        amount,
        signer_from
      );
      if (approvalResult.status == "mined") {
        setApproving(false);
      }
      await toast.promise(Promise.resolve(), {
        pending: "Approving tokens...",
        success: "Tokens approved successfully 👌",
        error: "Failed to approve tokens",
      });
      checkApproveBalance();
      setApproving(false);
    } catch (error) {
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        toast.error("Failed to approve tokens: " + error, {
          theme: "light",
        });
      } else {
        toast.error("Failed to approve tokens: " + error, {
          theme: "dark",
        });
      }
      console.error(`Failed to approve tokens: ${error}`);
      setApproving(false);
    }
  }

  const [tokenTransferStatus, setTokenTransferStatus] = useState(false);

  const HanddleFunctions = () => {
    if (chain?.id === 1) {
      if (isConnected) {
        if (tokenTransferStatus) {
          return;
        } else {
          if (approveBalance > 0) {
            if (transferring) {
              return;
            } else {
              Swap();
            }
          } else {
            if (approving) {
              return;
            } else {
              approveTokens();
            }
          }
        }
      } else {
        connect();
      }
    } else {
      switchNetwork?.(1);
    }
  };
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const balance = tokenbalance.enterAmount;
    const balan_to = balance;
    setDummyData(balan_to);
  }, [tokenbalance]);

  const tokenRead = {
    address: userAddress,
  };

  const [prepareContract, setPrepareContract] = useState("");
  const [contractABI, setContractABI] = useState<Array<any>>([]);
  const [eligible, isEligible] = useState(false);
  const [argsClaim, setArgsClaim] = useState({} as ClaimArgs);

  const contractReadData = useContractRead({
    address: "0x488a9ddD656dB12DC3e802C2ebCcDd6e221cA427",
    abi: contractABI,
    functionName: "transferredUsers",
    args: Object.values(tokenRead),
    watch: true,
  });

  useEffect(() => {
    console.log(contractReadData.data);
    if (contractReadData.data) {
      const transferStatus = Boolean(contractReadData.data); // Ensure boolean type
      setTokenTransferStatus(transferStatus);
    }
  }, [contractReadData]);

  const [transferAmount, setTransferAmount] = useState(0);

  useEffect(() => {
    const filtered = addresslist.filter(
      (element) => element.address == address
    );

    if (filtered.length > 0) {
      const element = filtered[0];
      isEligible(true);
      setTransferAmount(Number(element.amount));
      setArgsClaim({
        amount: BigNumber.from(element.amount),
        nonce: BigNumber.from(element.nonce),
        receiver: element.address,
        signature: element.signature,
      });
    } else {
      isEligible(false);
      setArgsClaim({} as ClaimArgs);
    }
  }, [address, addresslist]);

  console.log(eligible);

  useEffect(() => {
    if (chain?.id === 1) {
      if (!eligible) {
        setButtonText("You are not eligible");
      } else {
        if (tokenTransferStatus) {
          setButtonText("Already Transferred");
        } else {
          if (Number(approveBalance) > 0) {
            setButtonText(
              `Trasfer ${transferAmount / 10 ** 9} ONIGIRI NEKO Tokens`
            );
          } else {
            console.log(`approveBalance ${approveBalance}`);

            setButtonText("Approve Tokens");
          }
        }
      }
    } else {
      setButtonText("Switch Network");
    }
  }, [chain?.id, approveBalance, eligible, tokenTransferStatus]);

  useEffect(() => {
    function getContract() {
      if (chain?.id === 1) {
        setPrepareContract(tokens.IGNORE.bsc);
        setContractABI((prevState) => [...prevState, ...bscbridgeABI]);
      }
    }
    getContract();
  }, [chain?.id]);

  const tokenArgs = {
    amount: number_to_send,
  };

  const { config, error } = usePrepareContractWrite({
    address: "0x488a9ddD656dB12DC3e802C2ebCcDd6e221cA427",
    abi: contractABI,
    functionName: "updateOnigiri",
    args: Object.values(argsClaim),
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions !== null) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  if (isSuccess) {
    if (data?.hash) {
      const hash = data.hash.toString();
    }
  }
  useEffect(() => {
    if (chain?.id === 1) {
      setTokenAddressSwap(ONIGIRI);
      setContractAddressSwap(ONIGIRI);
    }
  }, [chain?.id]);

  async function Swap() {
    if (tokenAddressSwap && toAddress) {
      write?.();
      setSwaping(true);
    } else {
      // nothing
    }
  }
  return (
    <div className="pt-4">
      <div className="relative w-full" data-headlessui-state="">
        <button
          onClick={() => HanddleFunctions()}
          className={`btn w-full flex items-center justify-center gap-2 cursor-pointer transition-all bg-[#eb7502] ${
            swaping || approving || tokenTransferStatus
              ? "opacity-40 overflow-hidden cursor-pointer"
              : "hover:bg-[#e58b53] active:bg-[#082908]"
          }  
        
            text-white px-6 h-[52px] rounded-xl text-base font-semibold`}
          aria-expanded="false"
          data-headlessui-state=""
          disabled={swaping || approving}
          type="button"
          id="headlessui-popover-button-:r1e:"
        >
          {swaping || approving ? (
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
