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

function WaitButton() {
  return (
    <div className="pt-4">
      <div className="relative w-full" data-headlessui-state="">
        <button
          className={`btn w-full flex items-center justify-center gap-2 cursor-pointer transition-all bg-[#eb7502] $
        
            text-white px-6 h-[52px] rounded-xl text-base font-semibold`}
          aria-expanded="false"
          data-headlessui-state=""
          type="button"
          id="headlessui-popover-button-:r1e:"
        >
          <span className="hidden md:block">Wait for Claim Open</span>
          <span className="block md:hidden">Wait for Claim Open</span>
        </button>
      </div>
    </div>
  );
}

export default WaitButton;
