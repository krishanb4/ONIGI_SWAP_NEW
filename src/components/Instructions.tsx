import React from "react";

const Instructions = () => {
  return (
    <>
      <div className="dark:bg-[#545c5c] bg-[#b2c9dc] mt-[18px] pr-4 pt-4 pl-10 pb-4 rounded-[5px]">
        <ul className="list-disc text-sm">
          <li>Minimum Crosschain Amount is 40,000 4TOKEN</li>
          <li>LayerZero CORE to BSC bridge fee is 3 CORE + CORE gas fee</li>
          <li>LayerZero BSC to CORE bridge fee is 0.003 BNB + BNB gas fee</li>
          <li>Estimated Time of Crosschain Arrival is 4-10 min</li>
          <li>
            Estimated fees will be charged and excess will be returned back to
            your wallet
          </li>
        </ul>
      </div>
    </>
  );
};

export default Instructions;
