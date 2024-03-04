import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const usePrintDrawer = (props: any) => {
  const { isPrintDrawerOpen, setISPrintDrawerOpen } = props;

  const onClose = () => {
    setISPrintDrawerOpen?.(false);
  };
  const onSubmit = () => {
    enqueueSnackbar('Print Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setISPrintDrawerOpen?.(false);
  };
  return {
    onSubmit,
    isPrintDrawerOpen,
    setISPrintDrawerOpen,
    onClose,
  };
};
