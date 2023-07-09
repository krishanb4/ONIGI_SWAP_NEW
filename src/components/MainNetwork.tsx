import Image from "next/image";
import { useEffect, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

function MainNetwork() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [buttonClassNameBSC, setbuttonClassNameBSC] = useState("");
  const [buttonClassNameCORE, setbuttonClassNameCORE] = useState("");
  useEffect(() => {
    if (chain?.id === 1) {
      setCurrentNetwork("Ethereum Chain");
      setbuttonClassNameBSC("font-bold");
      setbuttonClassNameCORE("text-gray-500");
    }

    // console.log(chain?.id);
  }, [chain]);

  return (
    <div className="transform translate-y-0 hidden md:flex">
      <div className="right-0 absolute pt-2 -top-[-1] sm:w-[320px]">
        <div className="p-2 flex flex-col w-full fixed bottom-0 left-0 right-0 sm:absolute sm:bottom-[unset] sm:left-[unset] rounded-2xl rounded-b-none sm:rounded-b-xl shadow-md bg-white dark:bg-slate-800">
          <div
            tabIndex={-1}
            data-headlessui-state="open"
            id="headlessui-popover-panel-:r1g:"
          >
            <div className="pt-2 max-h-[300px] scroll">
              <button
                onClick={() => switchNetwork?.(1)}
                className="w-full group hover:bg-gray-100 hover:dark:bg-slate-700 px-2.5 flex rounded-lg justify-between gap-2 items-center cursor-pointer transform-all h-[40px]"
              >
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/bsc.png"
                    alt="core logo"
                    width="20"
                    height="30"
                  />
                  <p
                    className={`${buttonClassNameBSC} font-medium  text-sm group-hover:text-gray-900 dark:text-slate-300 dark:group-hover:text-slate-50`}
                  >
                    Ethereum Chain
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNetwork;
