import WhatsAppMarketingComponent from './WhatsAppMarketingComponent';
import ConnectNumber from './ConnectNumber';
import TemplateForm from './WhatsAppMarketingComponent/Templates/TemplateForm';
import useWhatsAppMarketing from './useWhatsAppMarketing';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const WhatsAppMarketing = () => {
  const {
    isMainLayoutSwitch,
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
            <WhatsAppMarketingComponent />
          ) : isLoading ? (
            <SkeletonTable />
          ) : (
            <ConnectNumber setIsConnected={setIsConnected} />
          )}
        </>
      ) : (
        <TemplateForm
          handelSwitch={handelSwitch}
          templateType={templateType}
          setTemplateType={setTemplateType}
        />
      )}
    </>
  );
};
export default WhatsAppMarketing;
