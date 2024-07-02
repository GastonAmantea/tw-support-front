'use client';
import NavBar from '@/components/navbar';
import { useContext, useEffect, useState } from 'react';
import { IColorAccents, useTemplate } from '@/providers/DynamicTemplate';
import { NFTPromotion, NFTMetadata, NftContract, NFTClaimConditions, WhitelistType } from '@/types/promotion';
import { useAddress, useNetworkMismatch, useSDK, useSwitchChain } from "@thirdweb-dev/react";
import { ClaimDataDTO, claimCollectible } from '@/api/claim';
import SuccessAlert from '@/components/success-alert';
import { useWhitelist } from '@/providers/WhitelistProvider';
import { IError, PaymentMethod } from '@/types/globals';
import ErrorAlert from '@/components/error-alert';
import ChainContext from '@/providers/NetworkProvider';
import CheckoutModal from '@/components/payment/checkout-card';
import { Button } from '@tremor/react';

export default function Example() {
  // page states
  const [promotion, setPromotion] = useState<NFTPromotion>()
  const [metadata, setMetadata] = useState<NFTMetadata>()
  const [contractData, setContractData] = useState<NftContract>()
  const [nftId, setNftId] = useState<number>()
  const [claimed, setClaimed] = useState<boolean>(false)
  const [claiming, setClaiming] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [userDetailsModal, setUserDetailsModal] = useState<boolean>(false)
  const [errors, setErrors] = useState<IError>()
  const [quantity, setQuantity] = useState<number>(1)
  const [kycLevel, setKycLevel] = useState<number>(1)
  const [activeClaimCondition, setActiveClaimCondition] = useState<NFTClaimConditions>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.FIAT)
  const [payload, setPayload] = useState<any>()

  // custom providers
  const { template, setTemplate, kyc, setShowCheckout } = useTemplate();
  const { setWhitelistType, whitelistType, whitelistData, setShowWhitelistModal } = useWhitelist();

  // thirdweb hooks
  const address = useAddress();
  const sdk = useSDK();
  const isMismatched = useNetworkMismatch();
  const switchChain = useSwitchChain();

  // chain handler
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  // success alerts
  const title = 'Succesfully Claimed';
  const message = `Your asset was succesfully claimed to your account ${address}`;
  const actionText = "View on OpenSea"
  const url = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${contractData?.address}/0`;

  // alert handlers 
  const closeAction = () => {
    setClaimed(false);
  }
  const closeError = () => {
    setShowError(false);
  }


  useEffect(() => {
    if (kyc){
      claim();
    } 
  }, [kyc])

  useEffect(() => {
    if (payload) {
      setShowCheckout(true);
    }
  }, [payload])

  const claim = async () => {
    setClaiming(true);
    try {
      if (claiming) return;
      if (isMismatched) { throw new Error("Please switch your network before continue."); }
      if (!address) { throw new Error("Please connect your wallet before continue."); }
      const claimResponse = await claimCollectible(address!);
      console.log("response ", claimResponse)
      if (claimResponse) {
          setPayload(claimResponse.payload);
          return;      
      }
    } catch (ex) {
      console.error(ex);
      let message = 'Unknown Error'
      if (ex instanceof Error) message = ex.message;
      const error: IError = {
        title: "There was an error during your request",
        description: message
      }
      setErrors(error);
      setShowError(true);
    } finally {
      setClaiming(false);
    }
  }

  return (
      <div style={{ 'backgroundColor': `${template.backgroundColor}` }}>
        <NavBar></NavBar>
        <CheckoutModal payload={payload}/>
        <Button onClick={claim}> Start Claim</Button>
        {claimed && <SuccessAlert title={title} message={message} url={url} actionText={actionText} closeAction={closeAction} />}
        {showError && errors && <ErrorAlert title={errors.title} description={errors.description} closeAction={closeError} />}
      </div>
  )
}
