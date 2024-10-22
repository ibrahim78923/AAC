import * as React from 'react';

import { Box, Button, Typography, useTheme, Grid } from '@mui/material';

import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFRadioGroup,
} from '@/components/ReactHookForm';

import { enqueueSnackbar } from 'notistack';
import {
  defaultValuesEmailAccess,
  validationSchemaEmailAccess,
} from './ManageAccess.data';
import { styles } from './ManageAccess.style';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import CommonModal from '@/components/CommonModal';
import {
  useLazyGetAllMarketingTeamsQuery,
  useLazyGetAllMarketingUsersQuery,
  useUpdateEmailTemplatesMutation,
} from '@/services/airMarketer/emailMarketing';
import { getActiveProductSession } from '@/utils';
import { PAGINATION } from '@/config';
import { MANAGE_ACCESS_VISIBLE } from '@/constants';

import { LoadingButton } from '@mui/lab';

const ManageAccess = ({
  isOpenManageAccessModal,
  handleCloseManageAccessModal,
  selectedRecords,
  setSelectedRecords,
}: any) => {
  const theme = useTheme();

  const [accessValue, setAccessValue] = React.useState('');

  const methods: any = useForm({
    resolver: yupResolver(validationSchemaEmailAccess(accessValue)),
    defaultValues: defaultValuesEmailAccess,
  });

  const ActiveProduct = getActiveProductSession();

  const { handleSubmit, watch } = methods;

  const [updateEmailTemplate, { isLoading: loadingUpdateEmailTemplate }] =
    useUpdateEmailTemplatesMutation();

  const onSubmit = async (values: any) => {
    try {
      await updateEmailTemplate({
        id: selectedRecords?._id,
        body: {
          visibleTo: values?.access,
          teamIds:
            values?.access === 'TEAMS'
              ? values?.teams?.map((item: any) => item?._id)
              : [],
          userAccoutIds:
            values?.access === 'USERS'
              ? values?.users?.map((item: any) => item?.userData?._id)
              : [],
        },
      })?.unwrap();
      setSelectedRecords([]);
      handleCloseManageAccessModal();
      enqueueSnackbar('Manage Access Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const access = watch('access');

  React.useEffect(() => {
    if (access) setAccessValue(access);
  }, [access]);

  const apiQueryUsers = useLazyGetAllMarketingUsersQuery?.();
  const apiQueryTeams = useLazyGetAllMarketingTeamsQuery?.();

  return (
    <div>
      <CommonModal
        open={isOpenManageAccessModal}
        handleClose={handleCloseManageAccessModal}
        handleCancel={handleCloseManageAccessModal}
        handleSubmit={handleCloseManageAccessModal}
        title="Email Access"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h6"
            fontWeight={600}
            color={theme?.palette?.slateBlue?.main}
          >
            Shared with *
          </Typography>

          <Grid container>
            <Grid item xs={12}>
              <RHFRadioGroup
                name="access"
                row={false}
                options={[
                  {
                    value: MANAGE_ACCESS_VISIBLE?.EVERYONE,
                    label: 'Available to everyone',
                  },
                  {
                    value: MANAGE_ACCESS_VISIBLE?.TEAMS,
                    label: 'Select teams who can edit',
                  },
                  {
                    value: MANAGE_ACCESS_VISIBLE?.USERS,
                    label: 'Select users who can edit',
                  },
                ]}
              />
            </Grid>

            {access === MANAGE_ACCESS_VISIBLE?.USERS && (
              <Grid item xs={12}>
                <RHFAutocompleteAsync
                  label={'Users'}
                  name={`users`}
                  fullWidth
                  multiple
                  externalParams={{ meta: true, product: ActiveProduct?._id }}
                  apiQuery={apiQueryUsers}
                  size="small"
                  placeholder="Select user"
                  getOptionLabel={(option: any) => option?.username}
                />
              </Grid>
            )}

            {access === MANAGE_ACCESS_VISIBLE?.TEAMS && (
              <Grid item xs={12}>
                <RHFAutocompleteAsync
                  label={'Teams'}
                  name={`teams`}
                  fullWidth
                  multiple
                  externalParams={{
                    page: PAGINATION?.CURRENT_PAGE,
                    limit: PAGINATION?.PAGE_LIMIT,
                  }}
                  apiQuery={apiQueryTeams}
                  size="small"
                  placeholder="Select team"
                  getOptionLabel={(option: any) => option?.name}
                />
              </Grid>
            )}
          </Grid>

          <Box sx={styles?.buttonBox} mt={2}>
            <Button variant="outlined" onClick={handleCloseManageAccessModal}>
              Cancel
            </Button>
            <LoadingButton
              loading={loadingUpdateEmailTemplate}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </LoadingButton>
          </Box>
        </FormProvider>
      </CommonModal>
    </div>
  );
};
export default ManageAccess;
