import {
  defaultValues,
  validationSchemaReportAnIssueModal,
} from './ReportAnIssueModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useReportAnIssueModal = (props: any) => {
  const { setOpenReportAnIssueModal } = props;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const methods = useForm({
    resolver: yupResolver(validationSchemaReportAnIssueModal),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = () => {
    enqueueSnackbar('Report Issue Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setOpenReportAnIssueModal?.(false);
    reset();
  };
  const handleSubmitIssue = handleSubmit(onSubmit);
  return {
    methods,
    validationSchemaReportAnIssueModal,
    defaultValues,
    enqueueSnackbar,
    handleSubmit,
    handleSubmitIssue,
    theme,
  };
};
