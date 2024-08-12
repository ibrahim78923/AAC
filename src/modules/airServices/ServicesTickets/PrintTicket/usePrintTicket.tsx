import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { printData } from './PrintTicket.data';
import { useRouter } from 'next/router';

export const usePrintTicket = (props: any) => {
  const { setIsPortalOpen, data } = props;
  const router = useRouter();

  const onClose = () => {
    setIsPortalOpen?.(false);
  };
  const onSubmit = () => {
    window.print();
    setTimeout(() => {
      enqueueSnackbar('Print Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });

      if (setIsPortalOpen) {
        setIsPortalOpen(false);
      }
    }, 3000);
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
