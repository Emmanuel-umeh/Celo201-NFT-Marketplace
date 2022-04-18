import { useContract } from "./useContract";
import MyNftMarketAbi from "../abi/NFTMarketplace.json";
import MyNFTContractAddress from "../abi/NFTMarketplace-address.json";

export const useMarketContract = () =>{
 return useContract( MyNftMarketAbi.abi, MyNFTContractAddress.NFTMarketplace);

}
