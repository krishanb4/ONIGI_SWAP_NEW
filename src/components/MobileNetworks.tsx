import Image from "next/image";
import { useEffect, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

function MobileNetworks() {
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <div
      className="relative z-[1080] md:hidden "
      id="headlessui-dialog-:r13:"
      role="dialog"
      aria-modal="true"
      data-headlessui-state="open"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur transform-gpu opacity-100"></div>
      <div className="relative top-[442px] inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-full text-center sm:items-center">
          <div
            className="w-full h-full max-w-md px-1 opacity-100 translate-y-0 sm:scale-100"
            id="headlessui-dialog-panel-:r14:"
            data-headlessui-state="open"
          >
            <div className="flex flex-col gap-2 scroll sm:overflow-hidden !pb-0  sm:!h-[640px] p-4 overflow-hidden text-left max-w-md w-full h-full bg-gray-100 dark:bg-slate-900 shadow-xl align-middle transition-all transform rounded-t-2xl rounded-b-none sm:rounded-2xl relative">
              <button
                id="headlessui-focus-sentinel-before-:r16:"
                type="button"
                aria-hidden="true"
              ></button>
              <div
                className="overflow-hidden"
                tabIndex={-1}
                data-headlessui-state="open"
                id="headlessui-popover-panel-:r15:"
              >
                {/* <div className="!focus-within:bg-gray-200 relative pr-10 rounded-xl flex gap-2.5 flex-grow items-center bg-gray-200 dark:bg-slate-800 px-3 py-2.5 h-[44px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    width="24"
                    height="24"
                    className="text-gray-500 dark:text-slate-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    ></path>
                  </svg>
                  <input
                    id="-address-input"
                    testdata-id="-address-input"
                    placeholder="Search"
                    className="truncate font-semibold w-full 
        bg-transparent !p-0 placeholder:font-medium 
        placeholder:text-gray-400 placeholder:dark:text-slate-500 
        text-gray-900 dark:text-slate-200 border-none focus:outline-none focus:ring-0"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    autoComplete="off"
                    value=""
                    tabIndex={0}
                  />
                </div> */}
                <div className="h-[calc(100%-44px)] scroll overflow-auto py-3">
                  <button
                    onClick={() => switchNetwork?.(1)}
                    className="w-full group hover:bg-white hover:dark:bg-slate-800 px-2.5 flex rounded-lg justify-between gap-2 items-center cursor-pointer transform-all h-[40px]"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/core.png"
                        alt="core logo"
                        width="20"
                        height="30"
                      />
                      <p className="font-medium text-gray-500 text-sm group-hover:text-gray-900 dark:text-slate-300 group-hover:dark:text-slate-50">
                        Core Chain
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => switchNetwork?.(1)}
                    className="w-full group hover:bg-white hover:dark:bg-slate-800 px-2.5 flex rounded-lg justify-between gap-2 items-center cursor-pointer transform-all h-[40px]"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/bsc.png"
                        alt="bsc logo"
                        width="20"
                        height="30"
                      />
                      <p className="font-medium text-gray-500 text-sm group-hover:text-gray-900 dark:text-slate-300 group-hover:dark:text-slate-50">
                        BSC Chain
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNetworks;
