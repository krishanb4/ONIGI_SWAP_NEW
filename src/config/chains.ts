import { Chain } from "@wagmi/core";

export const chainlist = {
  ethereum: {
    id: 1,
    name: "Ethereum Chain",
    network: "ethereum",
    nativeCurrency: {
      decimals: 18,
      name: "Wrapped ETH",
      symbol: "WETH",
    },
    rpcUrls: {
      public: { http: ["https://ethereum.publicnode.com	"] },
      default: { http: ["https://eth.llamarpc.com"] },
    },
    blockExplorers: {
      etherscan: { name: "Etherscan", url: "https://etherscan.io/" },
      default: { name: "Etherscan", url: "https://etherscan.io/" },
    },
    contracts: {
      // multicall3: {
      //   address: "0xca11bde05977b3631167028862be2a173976ca11",
      //   blockCreated: 11_907_934,
      // },
    },
  } as const,
  coreDAO: {
    id: 1116,
    name: "Core DAO",
    network: "coredao",
    nativeCurrency: {
      decimals: 18,
      name: "Core DAO",
      symbol: "CORE",
    },
    rpcUrls: {
      public: { http: ["https://rpc.coredao.org"] },
      default: { http: ["https://rpc.coredao.org"] },
    },
    blockExplorers: {
      etherscan: { name: "CoredaoScan", url: "https://scan.coredao.org" },
      default: { name: "CoredaoScan", url: "https://scan.coredao.org" },
    },
    contracts: {
      // multicall3: {
      //   address: "0xca11bde05977b3631167028862be2a173976ca11",
      //   blockCreated: 11_907_934,
      // },
    },
  } as const,
  bscChain: {
    id: 56,
    name: "BSC Chain",
    network: "bsc",
    nativeCurrency: {
      decimals: 18,
      name: "BSC Chain",
      symbol: "BSC",
    },
    rpcUrls: {
      public: { http: ["https://bsc-dataseed1.binance.org/"] },
      default: { http: ["https://rpc.coredao.org"] },
    },
    blockExplorers: {
      etherscan: { name: "BscScan", url: "https://bscscan.com" },
      default: { name: "BscScan", url: "https://bscscan.com" },
    },
    contracts: {
      // multicall3: {
      //   address: "0xca11bde05977b3631167028862be2a173976ca11",
      //   blockCreated: 11_907_934,
      // },
    },
  } as const,
} as { [key: string]: Chain };
