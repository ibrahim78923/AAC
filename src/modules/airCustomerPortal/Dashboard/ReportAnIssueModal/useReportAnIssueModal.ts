// import { useRef } from 'react';
import {
  defaultValues,
  validationSchemaReportAnIssueModal,
} from './ReportAnIssueModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';

export const useReportAnIssueModal = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const methods = useForm({
    resolver: yupResolver(validationSchemaReportAnIssueModal),
    defaultValues,
  });
  const { handleSubmit } = methods;

  return {
    methods,
    validationSchemaReportAnIssueModal,
    defaultValues,
    enqueueSnackbar,
    handleSubmit,
    theme,
  };
};
