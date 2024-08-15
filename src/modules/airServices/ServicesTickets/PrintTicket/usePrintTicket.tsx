import { printData } from './PrintTicket.data';
import { useRouter } from 'next/router';
import { SingleTicketDetailPortalComponentPropsI } from '../SingleTicketDetail/SingleTicketDetails.interface';

export const usePrintTicket = (
  props: SingleTicketDetailPortalComponentPropsI,
) => {
  const { setIsPortalOpen, data } = props;
  const router = useRouter();

  const onSubmit = () => {
    window?.print();
    onClose();
  };

  const onClose = () => {
    setIsPortalOpen?.({});
  };
  const printDataField = printData(data);
  return {
    onSubmit,
    setIsPortalOpen,
    onClose,
    data,
    printDataField,
    router,
  };
};
