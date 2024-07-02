'use client';
import { FormEvent, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTemplate } from '@/providers/DynamicTemplate';
import { CheckoutWithCard } from '@paperxyz/react-client-sdk';
import { useAddress, useSigner } from '@thirdweb-dev/react';
import { createThirdwebClient, defineChain, getContract, prepareTransaction, sendAndConfirmTransaction } from 'thirdweb';
import { sendTransaction } from "thirdweb";
import { generateMintSignature, mintWithSignature } from 'thirdweb/extensions/erc1155';
import { ethers5Adapter } from 'thirdweb/adapters/ethers5';
import { Account } from 'thirdweb/wallets';
export default function CheckoutModal({ payload }: { payload: any }) {
    const { showCheckout, setShowCheckout } = useTemplate();
    const address = useAddress();
    const signer = useSigner();
    const [account, setAccount] = useState<Account>()
    const client = createThirdwebClient({ clientId:process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!});
    const myChain = defineChain(Number(process.env.NEXT_PUBLIC_CONTRACT_CHAIN_ID!));
    let contador = 0;
    console.log(myChain)
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
    const contract = getContract({
        client,
        chain: myChain,
        address: contractAddress,
      });
    useEffect(() => {
        async function getAccount() {
            const account = await ethers5Adapter.signer.fromEthers({signer: signer!});
            setAccount(account)
        }
        if(!signer) return;
        getAccount();
    }, [signer]);
    useEffect(() => {
        async function confirm() {
            console.log(payload, contador)
            contador++
            const activeAccount = account;
            console.log(activeAccount)
            console.log("payload", payload.payload)
            console.log("signature", payload.signature)
            let parsedPayload = payload.payload;
            //This is because the backend returns the BigInt as a string
            //Ive tried both with the payload.payload and parsedPayload
            parsedPayload.validityStartTimestamp = BigInt(parsedPayload.validityStartTimestamp)
            parsedPayload.validityEndTimestamp = BigInt(parsedPayload.validityEndTimestamp)
            parsedPayload.pricePerToken = BigInt(parsedPayload.pricePerToken)
            parsedPayload.quantity = BigInt(parsedPayload.quantity)
            parsedPayload.tokenId = BigInt(parsedPayload.tokenId)
            parsedPayload.royaltyBps = BigInt(parsedPayload.royaltyBps)
            console.log("parsedPayload", parsedPayload)
            const transaction = await mintWithSignature({
                payload: parsedPayload,
                signature: payload.signature,
                contract: contract
            })
            payload = null;
            console.log("transaction ads", transaction)
            try {
                const transactionResult = await sendAndConfirmTransaction({
                    transaction,
                    account:activeAccount!,
                });
                console.log("transactionResult ", transactionResult)
            } catch (error: any) {
                console.log(error);
                console.log("#")
                console.log(error.message)
            }
        }
        if(!payload || !client || !account) return;
        confirm();
    }, [payload]);
    return (
        <>
        </>
    )
}