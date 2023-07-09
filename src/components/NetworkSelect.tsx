import Image from "next/image";
import { useEffect, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
function NetworkSelect() {
  return (
    <div className="bg-transparent rounded-xl mb-4 dark:text-white">
      <div className="flex flex-col border-[2px] border-[#eb7502] bg-gradient-to-r from-blue/[0.15] to-pink/[0.15] hover:from-blue/20 hover:to-pink/20 saturate-[2] dark:saturate-[1] px-4 py-3 rounded-xl">
        <div className="flex gap-3 items-center">
          <svg
            strokeWidth="1"
            width="24"
            height="24"
            className="text-blue"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              d="M32,72H55.06445a64,64,0,0,1,52.079,26.80076l41.7132,58.39848A64,64,0,0,0,200.93555,184H232"
            ></path>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              points="208 48 232 72 208 96"
            ></polyline>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              points="208 160 232 184 208 208"
            ></polyline>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              d="M152.76794 93.858A64.00219 64.00219 0 0 1 200.93555 72H232M32 184H55.06445a64.00212 64.00212 0 0 0 48.16769-21.85814"
            ></path>
          </svg>
          <div className="flex flex-col">
            <h1 className="flex gap-1.5 items-center font-semibold text-gray-900 dark:text-slate-50">
              <div className="flex justify-center" data-headlessui-state="">
                <button
                  id="headlessui-menu-button-:r1c:"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-headlessui-state=""
                ></button>
              </div>
            </h1>
            <span className="font-medium text-sm text-white">
              Upgrade Onigiri NEKO to Onigiri KITTY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkSelect;
