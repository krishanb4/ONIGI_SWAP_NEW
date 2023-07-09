import React, { useContext, useEffect, useState } from "react";
import FromData from "./FromData";
import Image from "next/image";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { tokens } from "@/config/constants/addresses";
import { ethers } from "ethers";
import { MyContext } from "./context";
import * as types from "@/redux/actionConstants";
import { useDispatch, useSelector } from "react-redux";

interface AppState {
  tokenbalance: string;
}

function FromInput() {
  const dispatch = useDispatch();
  const context = useContext(MyContext);
  const [inputValue, setInputValue] = useState("");
  const handleDataReceived = (data: string) => {
    setInputValue(data);
    // console.log(data);
    // Update state with received data
    context.setData(inputValue);
  };
  const tokenbalance = useSelector((state: AppState) => state.tokenbalance);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (value === "" || regex.test(value)) {
      setInputValue(value);

      dispatch({
        type: types.SET_BALANCE,
        payload: {
          corebalance: Object.values(tokenbalance)[0],
          bscbalance: Object.values(tokenbalance)[1],
          enterAmount: value,
        },
      });
    }
  };

  useEffect(() => {
    context.setData(inputValue);
  }, [inputValue, context]);
  return (
    <>
      <div className="relative flex items-center gap-4">
        <input
          inputMode="decimal"
          title="Token Amount"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoComplete="new-password"
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0"
          min="0"
          minLength={1}
          maxLength={79}
          className="text-white text-left border-none focus:outline-none focus:ring-0 p-0 bg-transparent w-full truncate font-medium without-ring !text-3xl py-1"
          testdata-id="undefined-input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <FromData onDataReceived={handleDataReceived} />
      </div>
    </>
  );
}

export default FromInput;
