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
import { ArrowBack } from '@mui/icons-material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { addUsersArrayData } from '../RoleAndRights.data';
import { SUPER_ADMIN } from '@/constants';
import useRolesAndRights from './useRolesAndRights';
import { LoadingButton } from '@mui/lab';
import { DRAWER_TYPES } from '@/constants/strings';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

const AddRole = () => {
  const {
    productPermissionsLoading,
    productPermissionsData,
    selectAllPermissions,
    getModulePermissions,
    loadingRoleDetails,
    updateRoleLoading,
    viewPerdetails,
    addRoleLoading,
    handleSubmit,
    navigate,
    onSubmit,
    disabled,
    methods,
    theme,
    query,
    watch,
  } = useRolesAndRights();

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ArrowBack
          onClick={() => {
            navigate?.push(SUPER_ADMIN?.USERMANAGMENT);
          }}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h4">
          {query?.type === DRAWER_TYPES?.VIEW
            ? 'View Role'
            : query?.type === DRAWER_TYPES?.ADD
              ? 'Add New Role'
              : 'Edit Role'}
        </Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        {loadingRoleDetails ? (
          <SkeletonForm />
        ) : (
          <FormProvider methods={methods}>
            <Grid container spacing={2} sx={{ flexDirection: 'column' }}>
              {addUsersArrayData?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                    disabled={query?.type === DRAWER_TYPES?.VIEW ? true : false}
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
            <Grid container>
              <Grid item xs={12} lg={10} mt={2}>
                <Stack direction="row">
                  <Typography variant="h4">Permissions</Typography>
                  <Typography style={{ color: theme?.palette?.error?.main }}>
                    *
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} lg={10} mt={2}>
                {productPermissionsLoading ? (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={46}
                  />
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
            <Divider sx={{ my: 3 }} />
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
                  navigate?.push(SUPER_ADMIN?.USERMANAGMENT);
                }}
              >
                {query?.type === DRAWER_TYPES?.VIEW ? 'Back' : 'Cancel'}
              </Button>
              {query?.type !== DRAWER_TYPES?.VIEW && (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  loading={addRoleLoading || updateRoleLoading}
                >
                  {query?.type === DRAWER_TYPES?.EDIT ? 'Update' : 'Add'}
                </LoadingButton>
              )}
            </Box>
          </FormProvider>
        )}
      </Box>
    </Box>
  );
};

export default AddRole;
