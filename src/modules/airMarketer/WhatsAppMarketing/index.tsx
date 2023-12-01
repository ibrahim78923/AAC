import React, { useState } from 'react';
import WhatsAppMarketingComponent from './WhatsAppMarketingComponent';
import ConnectNumber from './ConnectNumber';
import LayoutSwitch from './WhatsAppMarketingComponent/LayoutSwitch';
import TemplateForm from './WhatsAppMarketingComponent/Templates/TemplateForm';

const WhatsAppMarketing = () => {
  const isNumberConnected = true;
  const [isMainLayoutSwitch, setIsMainLayoutSwitch] = useState(true);
  const [isCreateTemplate, setIsCreateTemplate] = useState(false);

  const handelSwitch = (children: any) => {
    setIsMainLayoutSwitch(children);
  };

  return (
    <>
      {isMainLayoutSwitch ? (
        <>
          {isNumberConnected ? (
            <WhatsAppMarketingComponent
              handelSwitch={handelSwitch}
              setIsCreateTemplate={setIsCreateTemplate}
            />
          ) : (
            <ConnectNumber />
          )}
        </>
      ) : (
        <>
          {isCreateTemplate && (
            <LayoutSwitch>
              <TemplateForm handelSwitch={handelSwitch} />
            </LayoutSwitch>
          )}
        </>
      )}
    </>
  );
};
export default WhatsAppMarketing;
