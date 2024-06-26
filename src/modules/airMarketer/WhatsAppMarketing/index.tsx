import WhatsAppMarketingComponent from './WhatsAppMarketingComponent';
import ConnectNumber from './ConnectNumber';
import LayoutSwitch from './WhatsAppMarketingComponent/LayoutSwitch';
import TemplateForm from './WhatsAppMarketingComponent/Templates/TemplateForm';
import useWhatsAppMarketing from './useWhatsAppMarketing';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const WhatsAppMarketing = () => {
  const {
    setIsCreateTemplate,
    isMainLayoutSwitch,
    isCreateTemplate,
    setTemplateType,
    setIsConnected,
    templateType,
    handelSwitch,
    isConnected,
    isLoading,
  } = useWhatsAppMarketing();

  return (
    <>
      {isMainLayoutSwitch ? (
        <>
          {isConnected ? (
            <WhatsAppMarketingComponent
              handelSwitch={handelSwitch}
              setIsCreateTemplate={setIsCreateTemplate}
              templateType={templateType}
              setTemplateType={setTemplateType}
            />
          ) : isLoading ? (
            <SkeletonTable />
          ) : (
            <ConnectNumber setIsConnected={setIsConnected} />
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
