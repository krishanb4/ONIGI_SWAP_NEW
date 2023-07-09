import Image from "next/image";
import Link from "next/link";
import MainNetwork from "@/components/MainNetwork";
import { useState, useEffect, useRef } from "react";
import MobileNetworks from "./MobileNetworks";
import { Web3Button } from "@web3modal/react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import Transactions from "./Transactions";

const Header: React.FC = () => {
  const [isModelopen, openModel] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [isNetworkListOpen, openNetworkList] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        openModel(false); // Update state to indicate mouse click on empty space
        openNetworkList(false);
      }
    };

    document.addEventListener("click", handleClickOutside); // Add event listener to document

    return () => {
      document.removeEventListener("click", handleClickOutside); // Remove event listener on component unmount
    };
  }, [isNetworkListOpen, isModelopen]);
  const { chain } = useNetwork();
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [currentNetworkImage, setCurrentNetworkImage] = useState("");
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  useEffect(() => {
    if (chain?.id === 1) {
      setCurrentNetwork("Ethereum Chain");
      setCurrentNetworkImage("bsc");
    } else {
      setCurrentNetworkImage("error");
      setCurrentNetwork("");
    }
    // console.log(error);
  }, [chain, error]);
  const [showModal, setShowModal] = useState(false);
  // console.log(showModal);
  const timestamp = 1683194498878;
  const date = new Date(timestamp).toLocaleString();

  //  console.log(date);

  return (
    <>
      <header
        ref={componentRef}
        className="lg:border-transparent text-black dark:text-white bg-transparent border-gray-300/70 dark:border-slate-200/5 border-b sticky flex items-center top-0 z-[1] transition-all h-[56px]"
      >
        <div className="mx-auto flex items-center max-w-full w-full h-[56px]">
          <div className="grid grid-cols-2 items-center w-full mx-auto z-[101] px-4">
            <div className="flex items-center sm:gap-1">
              <Link
                className="flex flex-row items-center sm:pl-2 sm:pr-6"
                href="/"
              >
                <div className="block md:hidden ">
                  <Image
                    src="/images/onigi-kitty.png"
                    alt="onigiri-1"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="hidden md:block  ">
                  <Image
                    src="/images/onigi-kitty.png"
                    alt="onigiri-2"
                    width={250}
                    height={500}
                  />
                </div>
              </Link>

              <div
                className="hidden md:flex justify-center gap-1 relative h-[38px]"
                ref={componentRef}
              ></div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="flex gap-2 transform scale-100 opacity-100">
                <div data-headlessui-state="">
                  <Web3Button />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
