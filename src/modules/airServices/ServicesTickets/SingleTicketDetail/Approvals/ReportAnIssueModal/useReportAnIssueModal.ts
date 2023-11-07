import { useState } from 'react';
import {
  defaultValues,
  validationSchemaReportAnIssueModal,
} from './ReportAnIssueModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';

export function useReportAnIssueModal() {
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(true);
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
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    theme,
  };
}
