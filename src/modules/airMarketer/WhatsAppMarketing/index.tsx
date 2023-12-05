import React from 'react';
import WhatsAppMarketingComponent from './WhatsAppMarketingComponent';
import ConnectNumber from './ConnectNumber';

const WhatsAppMarketing = () => {
  const isNumberConnected = true;

  return (
    <>
      {isNumberConnected ? <WhatsAppMarketingComponent /> : <ConnectNumber />}
    </>
  );
};

export default WhatsAppMarketing;
