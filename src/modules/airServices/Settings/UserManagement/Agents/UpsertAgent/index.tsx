import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { useUpsertAgent } from './useUpsertAgent';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { IAgentsProps } from '../Agents.interface';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const UpsertAgent = (props: IAgentsProps) => {
  const { isAgentModalOpen, selectedAgentList } = props;
  const {
    methods,
    handleSubmit,
    handleUpsertAgentSubmit,
    handleClose,
    upsertAgentFormFields,
    getDynamicFieldsStatus,
    form,
    apiCallInProgress,
  } = useUpsertAgent(props);

  return (
    <Dialog
      open={isAgentModalOpen as boolean}
      onClose={() => handleClose?.()}
      fullWidth
      maxWidth={'sm'}
    >
      {getDynamicFieldsStatus?.isLoading ||
      getDynamicFieldsStatus?.isFetching ? (
        <SkeletonForm />
      ) : getDynamicFieldsStatus?.isError ? (
        <ApiErrorState />
      ) : (
        <>
          <DialogTitle>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              flexWrap={'wrap'}
              mb={2}
            >
              <Typography variant="h4" color="primary.main">
                {!!selectedAgentList?.length ? 'Edit Agent' : 'Invite Agent'}
              </Typography>
              <IconButton
                onClick={() => handleClose?.()}
                sx={{ cursor: 'pointer' }}
              >
                <CloseModalIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <FormProvider methods={methods}>
              <Grid container spacing={1}>
                {upsertAgentFormFields?.map((form: any) => (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </Grid>
                ))}
                {form?.map((item: any) => (
                  <Grid item xs={12} key={item?.id}>
                    {componentMap[item?.component] &&
                      createElement(componentMap[item?.component], {
                        ...item?.componentProps,
                        name: item?.componentProps?.label,
                        size: 'small',
                      })}
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              onClick={() => handleClose?.()}
              variant="outlined"
              color="secondary"
              className="small"
              disabled={apiCallInProgress}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              className="small"
              onClick={handleSubmit(handleUpsertAgentSubmit)}
              disabled={apiCallInProgress}
              loading={apiCallInProgress}
            >
              {!!selectedAgentList?.length
                ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                : GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
            </LoadingButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
