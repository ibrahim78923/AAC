import React, { useState } from 'react';
import WhatsAppMarketingComponent from './WhatsAppMarketingComponent';
import ConnectNumber from './ConnectNumber';
import LayoutSwitch from './WhatsAppMarketingComponent/LayoutSwitch';
import TemplateForm from './WhatsAppMarketingComponent/Templates/TemplateForm';

const WhatsAppMarketing = () => {
  const isNumberConnected = false;
  const [isMainLayoutSwitch, setIsMainLayoutSwitch] = useState(true);
  const [isCreateTemplate, setIsCreateTemplate] = useState(false);
  const [templateType, setTemplateType] = useState('');

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
              templateType={templateType}
              setTemplateType={setTemplateType}
            />
          ) : (
            <ConnectNumber />
          )}
        </>
      ) : (
        <>
          {isCreateTemplate && (
            <LayoutSwitch>
              <TemplateForm
                handelSwitch={handelSwitch}
                templateType={templateType}
                setTemplateType={setTemplateType}
              />
            </LayoutSwitch>
          )}
        </>
      )}
    </>
  );
};
export default WhatsAppMarketing;
