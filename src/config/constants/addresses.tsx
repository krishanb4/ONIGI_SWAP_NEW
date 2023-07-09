//for 4TOKEN
export const bscContractAddress = "0x8C0479c5173DdD98A22d283233f86189CCb7C027";
export const coreContractAddress = "0x795c4a5e03cC6F4Ed349cAf076Da6cB7F60D6921";
export const ONIGIRI = "0xf8582F19Fa406A68440112af785F143AD38e84f9";
//for USDT
//export const bscContractAddress = "0xf953f9FfA5c1f9F55fD8408C24D23850F1a35213";
//export const coreContractAddress = "0xa591D27d3efA2911102e0862C6C1b85CEFCF8ab4";

type Tokens = {
  ONIGIRI: {
    eth: string;
  };

  USDT: {
    bsc: string;
    core: string;
  };
  IGNORE: {
    bsc: string;
    core: string;
  };
};

export const tokens: Tokens = {
  ONIGIRI: {
    eth: "0xb4615aad766f6de3c55330099e907ff7f13f1582",
  },
  USDT: {
    bsc: "0x55d398326f99059fF775485246999027B3197955",
    core: "0x148a24e5c355455268B4d04823770280dD023267",
  },
  IGNORE: {
    bsc: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
    core: "0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E",
  },
};
