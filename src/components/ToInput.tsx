import React, { useEffect, useState } from "react";
import ToData from "./ToData";
import Image from "next/image";
import { MyContext } from "./context";

function ToInput() {
  const context = React.useContext(MyContext);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(context.data);
    // console.log(inputValue);
  }, [inputValue, context.data]);
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
          className="text-gray-900 dark:text-slate-50 text-left border-none focus:outline-none focus:ring-0 p-0 bg-transparent w-full truncate font-medium without-ring !text-3xl py-1"
          testdata-id="undefined-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled
        />
        <button
          id="undefined-button"
          className="flex items-center gap-1 text-xl py-2 pl-2 pr-2 rounded-full font-medium bg-black/[0.06] hover:bg-black/[0.12] dark:bg-white/[0.06] hover:dark:bg-white/[0.12]"
        >
          <div className="w-[28px] h-[28px] mr-0.5">
            <span className="span-1">
              <span className="span-2">
                <img
                  alt=""
                  aria-hidden="true"
                  src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2728%27%20height=%2728%27/%3e"
                  className="img-1"
                />
              </span>
              <Image
                alt="Ether"
                src="/images/onigiri.jpeg"
                decoding="async"
                data-nimg="intrinsic"
                className="rounded-full img-2"
                width={100}
                height={100}
              />
            </span>
          </div>
          Onigiri KITTY
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            aria-hidden="true"
            className="ml-1"
            width="16"
            height="16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            ></path>
          </svg> */}
        </button>
      </div>
      <ToData />
    </>
  );
}

export default ToInput;
