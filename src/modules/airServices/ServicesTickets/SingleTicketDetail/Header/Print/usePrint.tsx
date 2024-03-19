import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { printData } from './print.data';
import { useRouter } from 'next/router';

export const usePrintDrawer = (props: any) => {
  const { isPrintDrawerOpen, setISPrintDrawerOpen, data } = props;
  const router = useRouter();

  const onClose = () => {
    setISPrintDrawerOpen?.(false);
  };
  const onSubmit = () => {
    window.print();
    setTimeout(() => {
      enqueueSnackbar('Print Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });

      if (setISPrintDrawerOpen) {
        setISPrintDrawerOpen(false);
      }
    }, 3000);
  };
  const printDataField = printData(data);
  return {
    onSubmit,
    isPrintDrawerOpen,
    setISPrintDrawerOpen,
    onClose,
    data,
    printDataField,
    router,
  };
};
