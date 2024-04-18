import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Stack,
  Skeleton,
} from '@mui/material';

import PermissionsAccordion from './PermissionsAccordion';

import { FormProvider } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

import { ORG_ADMIN } from '@/constants';

import { addUsersArrayData } from '../RoleAndRights.data';

import useAddRole from './useAddRole';

import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const AddRole = () => {
  const {
    productPermissionsData,
    handleSubmit,
    productVal,
    loadingProduct,
    navigate,
    onSubmit,
    disabled,
    methods,
    theme,
    viewPerdetails,
    getModulePermissions,
    selectAllPermissions,
    loadingAddRole,
    loadingUpdateRole,
  } = useAddRole();

  const { watch } = methods;
  const { query } = navigate;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ArrowBack
          onClick={() => {
            navigate.push(ORG_ADMIN?.ROLES_AND_RIGHTS);
          }}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h4">
          {query?.type === 'add'
            ? 'Add New Role'
            : query?.type === 'edit'
              ? 'Edit Role'
              : 'Role Details'}
        </Typography>
      </Box>
      <Box sx={{ my: 3 }}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {addUsersArrayData()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component
                  {...item.componentProps}
                  size={'small'}
                  disabled={query?.type === 'view' ? true : false}
                >
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
          {productVal && (
            <Grid container>
              <Grid item xs={12} lg={10} mt={3}>
                <Stack direction="row">
                  <Typography variant="h4">Permissions</Typography>
                  <Typography style={{ color: theme?.palette?.error?.main }}>
                    *
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} lg={10} mt={2}>
                {loadingProduct ? (
                  <Skeleton height={80} />
                ) : productPermissionsData?.data?.length === 0 ? (
                  <Typography variant="h6" color={theme?.palette?.grey[500]}>
                    Please assign a plan to this product before proceeding.
                  </Typography>
                ) : (
                  <PermissionsAccordion
                    query={query}
                    permissionsData={
                      query?.type === 'view'
                        ? viewPerdetails?.data
                        : productPermissionsData
                    }
                    getModulePermissions={getModulePermissions}
                    selectAllPermissions={selectAllPermissions}
                    watch={watch}
                    disabled={disabled}
                  />
                )}
              </Grid>
            </Grid>
          )}
          <Divider sx={{ my: 3 }} />
          {(query?.type === 'add' || query?.type === 'edit') && (
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'end',
                my: 2,
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  navigate.push(ORG_ADMIN.ROLES_AND_RIGHTS);
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                loading={
                  query?.type === 'add' ? loadingAddRole : loadingUpdateRole
                }
              >
                {query?.type === 'add' ? 'Add' : 'Update'}
              </LoadingButton>
            </Box>
          )}
        </FormProvider>
      </Box>
    </>
  );
};

export default AddRole;
