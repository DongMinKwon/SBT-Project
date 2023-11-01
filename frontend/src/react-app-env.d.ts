/// <reference types="react-scripts" />
import 'ethers';

declare global {
  interface Window {
    ethereum?: ExternalProvider | JsonRpcFetchFunc;
  }
}
