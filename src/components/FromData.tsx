import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { tokens } from "@/config/constants/addresses";
import { ethers } from "ethers";
import { MyContext } from "./context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setBalance } from "@/redux/actions";
import * as types from "@/redux/actionConstants";
interface ReceiverComponentProps {
  onDataReceived: (tokenbalance: string) => void; // Define the callback function prop
}

const FromData: React.FC<ReceiverComponentProps> = ({ onDataReceived }) => {
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const [integerPart, setIntegerPart] = useState("0");
  const [fractionalPart, setFractionalPart] = useState("00");
  const [tokenbalance, setTokenBalance] = useState("");
  const [tokenAddress, setTokenAddress] = useState<`0x${string}` | undefined>(
    undefined
  );
  const [tokenAddressOther, setTokenAddressOther] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [chainID, setChainID] = useState(0);
  const { data, isError, isLoading } = useBalance({
    address: address,
    token: tokenAddress,
    watch: true,
    onError(error) {
      // console.log("Error", error);
    },
  });

  const tokendata = useBalance({
    address: address,
    token: tokenAddressOther,
    chainId: chainID,
    watch: true,
    onSuccess(data) {
      // console.log("Success", data);
    },
    onError(error) {
      // console.log("Error", error);
    },
  });

  console.log("tokenbalanceFrom", tokendata);

  interface AppState {
    tokenbalance: string;
  }
  const tokenbalanceFrom = useSelector((state: AppState) => state.tokenbalance);
  useEffect(() => {
    if (chain?.id == 1) {
      setChainID(1);
    }
  }, [chain?.id]);
  useEffect(() => {
    if (chain?.id == 1) {
      const erc20AddressOther = ethers.utils.getAddress(tokens.ONIGIRI.eth);
      setTokenAddressOther(erc20AddressOther);
    }
  }, [chain?.id]);
  useEffect(() => {
    if (chain?.id == 1) {
      const erc20Address = ethers.utils.getAddress(tokens.ONIGIRI.eth);

      setTokenAddress(erc20Address);
    }
  }, [chain?.id]);
  useEffect(() => {
    if (!isLoading) {
      const tokenB = data?.formatted || "";
      setTokenBalance(tokenB);
    }
  }, [
    data?.formatted,
    isLoading,
    tokenAddressOther,
    tokendata.data?.formatted,
  ]);
  useEffect(() => {
    if (chain?.id == 1) {
      dispatch({
        type: types.SET_BALANCE,
        payload: {
          corebalance: Number(tokendata.data?.formatted),
          bscbalance: Number(tokenbalance),
          enterAmount: "",
        },
      });
    }
  }, [chain?.id, dispatch, tokenbalance, tokendata.data?.formatted]);
  useEffect(() => {
    if (!isLoading) {
      // dispatch(setBalance(Number(tokenB)));

      if (chain?.id == 1) {
        const integerPart = Math.floor(
          Number(Object.values(tokenbalanceFrom)[1])
        ); // Extract the integer part
        const fractionalPart = (
          Number(Object.values(tokenbalanceFrom)[1]) - integerPart
        ).toFixed(6);

        setIntegerPart(integerPart.toString());
        const fPart = fractionalPart.toString();
        setFractionalPart(fPart.substring(2));
      } else if (chain?.id == 1116) {
        const integerPart = Math.floor(
          Number(Object.values(tokenbalanceFrom)[0])
        ); // Extract the integer part
        const fractionalPart = (
          Number(Object.values(tokenbalanceFrom)[0]) - integerPart
        ).toFixed(6);

        setIntegerPart(integerPart.toString());
        const fPart = fractionalPart.toString();
        setFractionalPart(fPart.substring(2));
      }
    }
  }, [
    chain?.id,
    tokenAddress,
    address,
    data,
    isLoading,
    dispatch,
    tokenbalance,
    tokenAddressOther,
    tokendata.data?.formatted,
    tokenbalanceFrom,
  ]);
  const context = useContext(MyContext);
  const decimals = 18;
  const handleDataInput = () => {
    // console.log(tokenbalance);
    const bigNumberValue = ethers.utils.parseUnits(tokenbalance, decimals);
    const decimalValue = ethers.utils.formatUnits(bigNumberValue, decimals);
    context.setData(decimalValue);
    onDataReceived(decimalValue);
    if (chain?.id == 1) {
      dispatch({
        type: types.SET_BALANCE,
        payload: {
          corebalance: Number(tokendata.data?.formatted),
          bscbalance: Number(tokenbalance),
          enterAmount: decimalValue,
        },
      });
    }
  };
  return (
    <div className="flex flex-row items-center justify-between h-[36px]">
      <button
        onClick={() => handleDataInput()}
        data-testid="undefined-balance-button"
        type="button"
        className="bg-[#eb7502] font-medium flex gap-1.5 items-center py-1 text-blue hover:text-blue-600 active:text-blue-700 dark:text-slate-400 hover:dark:text-slate-300 px-2 rounded-md"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
          width="18"
          height="18"
        >
          <path
            fill="currentColor"
            d="M15.6 4.6H1.85v-.55l12.1-.968v.968h1.65V2.4c0-1.21-.98-2.059-2.177-1.888L2.378 2.089C1.18 2.26.2 3.39.2 4.6v11a2.2 2.2 0 002.2 2.2h13.2a2.2 2.2 0 002.2-2.2V6.8a2.2 2.2 0 00-2.2-2.2zm-1.65 7.707a1.65 1.65 0 01-.63-3.176 1.65 1.65 0 11.63 3.176z"
          ></path>
          
        </svg>
        */}
        MAX
      </button>
      {/* <span className="text-lg">
        {integerPart}.{" "}
        <span className="text-sm font-semibold">{fractionalPart}</span>
      </span> */}
    </div>
  );
};

export default FromData;
