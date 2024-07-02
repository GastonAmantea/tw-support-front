'use server';
import { PaymentMethod } from "@/types/globals";
import { LoginType } from "./enum";
import { getHeaders } from "./headers";

export interface ClaimDataDTO{
    promotionId: string,
    paymentMethod: PaymentMethod,
    nftId: number, 
    quantityDesired: number, 
    buyerAddress: string, 
    claimCode?: string, 
    email?: string, 
}

export interface ClaimConfirmationDTO{
    txHash: string
}

export interface SaveUserDetailsDTO{
  logintype: LoginType,
  email?: string, 
  walletaddress: string, 
  contractaddress: string, 
  tokenid: number ,
  name?: string,
  lastname?: string,
  country?: string,
  taxid?: string,
}

export async function claimCollectible(address:string) {
    const response = await fetch(`${process.env.API_URL}/claim`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify({
        tokenId:process.env.NEXT_PUBLIC_TOKEN_ID,
        quantityDesired: 1,
        buyerAddress: address,
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        chainId: Number(process.env.NEXT_PUBLIC_CONTRACT_CHAIN_ID!),
        price :Number(process.env.NEXT_PUBLIC_TOKEN_PRICE!)
      }),
      next: {revalidate: 0},
    });
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message, {cause: error})
    }
}
