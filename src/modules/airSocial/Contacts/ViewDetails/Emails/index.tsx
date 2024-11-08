import EmailComp from '@/modules/airSales/Deals/ViewDetails/Emails/EmailComp';

const Emails = ({ contactId }: any) => {
  return <EmailComp moduleType="CONTACT" moduleId={contactId} />;
};

export default Emails;
