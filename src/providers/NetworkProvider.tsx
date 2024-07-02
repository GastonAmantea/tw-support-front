import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: 800001, // polygon mumbai as default
  setSelectedChain: (chain: number) => {},
});

export default ChainContext;