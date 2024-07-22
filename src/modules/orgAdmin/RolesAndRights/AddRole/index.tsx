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

import { ORG_ADMIN } from '@/constants';

import { addUsersArrayData } from '../RoleAndRights.data';

import useAddRole from './useAddRole';

import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useLazyGetDropdownProductsQuery } from '@/services/common-APIs';
import { DRAWER_TYPES } from '@/constants/strings';

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

  const productsData = useLazyGetDropdownProductsQuery();

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
          {query?.type === DRAWER_TYPES?.ADD
            ? 'Add New Role '
            : query?.type === DRAWER_TYPES?.EDIT
              ? 'Edit Role'
              : 'Role Details'}
        </Typography>
      </Box>
      <Box sx={{ my: 3 }}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {addUsersArrayData(productsData)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item.componentProps.name}>
                <item.component
                  {...item.componentProps}
                  size={'small'}
                  disabled={query?.type === DRAWER_TYPES?.VIEW ? true : false}
                />
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
                      query?.type === DRAWER_TYPES?.VIEW
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
          {(query?.type === DRAWER_TYPES?.ADD ||
            query?.type === DRAWER_TYPES?.EDIT) && (
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
                  query?.type === DRAWER_TYPES?.ADD
                    ? loadingAddRole
                    : loadingUpdateRole
                }
              >
                {query?.type === DRAWER_TYPES?.ADD ? 'Add' : 'Update'}
              </LoadingButton>
            </Box>
          )}
        </FormProvider>
      </Box>
    </>
  );
};

export default AddRole;
