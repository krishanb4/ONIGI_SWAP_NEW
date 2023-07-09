import { useNetwork, useSwitchNetwork } from "wagmi";

function SwitchArrow() {
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  return (
    <div className="left-0 right-0 mt-[-9px] mb-[-9px] flex items-center justify-center">
      <button
       // onClick={() => switchNetwork?.(chain?.id == 56 ? 1116 : 56)}
        type="button"
        className=" group bg-gray-100 hover:bg-gray-200 hover:dark:bg-slate-700 dark:bg-slate-900 p-2 border-white transition-all rounded-full cursor-pointer"
      >
        <div className="transition-transform rotate-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4 text-blue fill-current dark:text-white"
          >
            <path
              className="fill-current dark:text-white"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
}
export default SwitchArrow;
